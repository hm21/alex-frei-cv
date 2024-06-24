import {
  Database,
  getDatabaseWithUrl,
  Reference,
  ServerValue,
} from 'firebase-admin/database';
import { warn } from 'firebase-functions/logger';
import * as https from 'firebase-functions/v2/https';
import { DATABASE_DEFAULT_URL } from './database_urls';

export const ddosCheck = async (
  req: https.Request,
  counterName: string,
  limit = 200,
): Promise<boolean> => {
  if (typeof limit !== 'number') {
    warn('ddos value `limit` is not a number');
    limit = 200;
  }

  const ipAddress = extractIpAddress(req);
  if (!ipAddress) return false;
  const db = getDatabaseWithUrl(DATABASE_DEFAULT_URL);

  const dt = new Date();
  const ddosRef = db
    .ref('ddos')
    .child(counterName)
    .child(ipAddress)
    .child(`${dt.year}-${dt.month}-${dt.day}-${dt.hours}`);

  if (await isIpOnBlacklist(db, ipAddress)) {
    return true;
  }

  const ipCount = await (await ddosRef.get()).val();
  if (ipCount > limit) {
    // DDOS Attack => block user
    warn(`DDOS ATTACK BLOCKED | IP-Address: ${ipAddress}`);
    await db.ref('blacklist').child(ipAddress).set(true).catch(warn);
    return true;
  } else if (!ipCount) {
    // Create new DDOS counter if there is no DDOS count
    await createNewDdosCounter({ db, counterName, ipAddress, ddosRef });
  } else {
    // Increment DDOS counter
    await ddosRef.set(ServerValue.increment(1)).catch(warn);
  }

  return false;
};

const createNewDdosCounter = async (value: {
  db: Database;
  counterName: string;
  ipAddress: string;
  ddosRef: Reference;
}) => {
  // Remove all old counters
  await value.db
    .ref('ddos')
    .child(value.counterName)
    .child(value.ipAddress)
    .remove()
    .catch(warn);
  // Create new counter
  await value.ddosRef.set(1).catch(warn);
};

const extractIpAddress = (req: https.Request): string | null => {
  const ipAddress = (
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.headers['fastly-client-ip'] ||
    req.ip ||
    ''
  )
    .toString()
    .replace(/\./g, '-');

  return ipAddress || null;
};

const isIpOnBlacklist = async (db: Database, ipAddress: string) => {
  return await (await db.ref('blacklist').child(ipAddress).get()).val();
};
