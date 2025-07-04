import {
  getDatabaseWithUrl,
  Reference,
  ServerValue,
} from 'firebase-admin/database';
import { logger } from 'firebase-functions';
import { HttpsError, Request } from 'firebase-functions/v2/https';
import { DATABASE_DEFAULT_URL } from '../../core/constants/database-endpoint.constants';
import { getCurrentHourKey } from './datetime-helpers';


const rtdb = getDatabaseWithUrl(DATABASE_DEFAULT_URL);
const rateLimitBaseRef = rtdb.ref('rate_limit');
const blacklistRef = rtdb.ref('blacklist');

/**
 * Enforces a per-IP hourly rate limit using Realtime Database.
 *
 * @param req - Incoming HTTPS request
 * @param counterName - A namespace/group for rate limit tracking (e.g. "login", "api")
 * @param limit - Maximum number of allowed requests per hour
 * @throws HttpsError if the rate limit is exceeded or IP is blacklisted
 */
export const checkRateLimit = async (
  req: Request,
  counterName: string,
  limit = 200,
): Promise<void> => {
  if (typeof limit !== 'number') {
    logger.warn(
      '⚠️ Rate limit value `limit` is not a number. Using default of 200.',
    );
    limit = 200;
  }

  const ip = extractIpAddress(req);
  if (!ip) return;

  if (await isBlacklisted(ip)) {
    logger.warn(`🔒 Blocked IP ${ip} attempted access.`);
    throw new HttpsError('resource-exhausted', 'Rate limit exceeded. ');
  }

  const ipRef = rateLimitBaseRef.child(counterName).child(ip);
  const counterRef = ipRef.child(getCurrentHourKey());
  const count = await fetchCounter(counterRef);

  if (count > limit) {
    await blacklistIp(ip);
    throw new HttpsError('resource-exhausted', 'Rate limit exceeded. ');
  }

  if (count <= 0) {
    await resetCounter(ipRef);
  } else {
    await incrementCounter(counterRef);
  }

  logger.debug(`📝 IP ${ip} has ${count}/${limit} requests this hour`);
};

/**
 * Fetches the current count from a given rate limit counter.
 *
 * @param counterRef - Reference to the per-IP/hour counter
 * @returns The current number of requests
 */
async function fetchCounter(counterRef: Reference): Promise<number> {
  try {
    const snap = await counterRef.get();
    const count: number = snap.val();

    return typeof count === 'number' ? count : 0;
  } catch (error) {
    logger.error('❌ Failed to fetch current ip count', error);
  }

  return 0;
}

/**
 * Increments the rate limit counter by 1.
 *
 * @param counterRef - Reference to the counter
 */
async function incrementCounter(counterRef: Reference) {
  try {
    await counterRef.set(ServerValue.increment(1));
  } catch (error) {
    logger.error('❌ Failed to increment rate limit counter', error);
  }
}

/**
 * Resets the counter for the current hour.
 * Overwrites all previous data under the IP path.
 *
 * @param ipRef - Reference to the IP rate limit group
 */
async function resetCounter(rateLimitCounterIpRef: Reference) {
  const ref = rateLimitCounterIpRef;

  try {
    await ref.set({ [getCurrentHourKey()]: 1 });
  } catch (error) {
    logger.error('❌ Failed to reset hourly rate limit counter', error);
  }
}

/**
 * Checks if the given IP is blacklisted.
 *
 * @param ipAddress - IP address in dotted format (dots replaced by dashes)
 * @returns Whether the IP is blacklisted
 */
async function isBlacklisted(ipAddress: string) {
  const ref = blacklistRef.child(ipAddress);

  try {
    const snap = await ref.get();
    return Boolean(snap.val());
  } catch (error) {
    logger.error('❌ Failed to read ip from blacklist', error);
    return false;
  }
}

/**
 * Adds an IP to the blacklist.
 *
 * @param ipAddress - IP address in dotted format (dots replaced by dashes)
 */
async function blacklistIp(ipAddress: string) {
  logger.warn(`🛡️ Rate limit exceeded | IP-Address: ${ipAddress}`);
  const ref = blacklistRef.child(ipAddress);

  try {
    await ref.set(true);
  } catch (error) {
    logger.error(`❌ Failed to add ip ${ipAddress} to blacklist`, error);
  }
}

/**
 * Extracts and sanitizes the IP address from the request.
 *
 * @param req - HTTPS request
 * @returns Sanitized IP address with dots replaced by dashes
 */
function extractIpAddress(req: Request): string | null {
  const rawIp = (
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.headers['fastly-client-ip'] ||
    req.ip ||
    ''
  ).toString();

  // Split on commas and clean up
  const ipList = rawIp.split(',').map(ip => ip.trim());

  // Prefer a public IPv4 if available
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const selectedIp =
    ipList.find(ip => ipv4Regex.test(ip)) || ipList[0]; // fallback to first if no IPv4

  // Sanitize for use in RTDB
  const sanitized = selectedIp.replace(/[.:]/g, '-');

  return sanitized || null;
}

