import { getDatabaseWithUrl, ServerValue } from 'firebase-admin/database';
import { error, warn } from 'firebase-functions/logger';
import * as https from 'firebase-functions/v2/https';

const databaseUrl =
  'https://alex-frei-default-rtdb.europe-west1.firebasedatabase.app';

export const ddosCheck = async (
  req: https.Request,
  counterName: string,
  limit = 200,
): Promise<boolean> => {
  if (typeof limit !== 'number') {
    warn('ddos value `limit` is not a number');
    limit = 200;
  }

  const ipAddress = (
    req?.headers?.['x-forwarded-for'] ||
    req?.socket?.remoteAddress ||
    req?.headers?.['fastly-client-ip' || req?.ip || '']
  )
    ?.toString()
    .replace(/\./gi, '-');

  if (ipAddress) {
    const dt = new Date();
    const path = `ddos/${counterName}/${ipAddress}/${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}-${dt.getHours()}`;
    try {
      if (await ipIsOnBlacklist(ipAddress)) return true;

      const ipCount = await (
        await getDatabaseWithUrl(databaseUrl).ref(path).get()
      ).val();
      if (ipCount > limit) {
        await blockIp(ipAddress);
        return true;
      } else if (!ipCount) {
        await getDatabaseWithUrl(databaseUrl)
          .ref(`ddos/${counterName}/${ipAddress}`)
          .remove();
        await getDatabaseWithUrl(databaseUrl).ref(path).set(1);
      } else {
        await getDatabaseWithUrl(databaseUrl)
          .ref(path)
          .set(ServerValue.increment(1));
      }
    } catch (err) {
      error(err);
    }
  }
  return false;
};

const ipIsOnBlacklist = async (ipAddress: string) => {
  return await (
    await getDatabaseWithUrl(databaseUrl).ref(`blacklist/${ipAddress}`).get()
  ).val();
};
const blockIp = async (ipAddress: string) => {
  error(`DDOS ATTACK BLOCKED | IP-Address: ${ipAddress}`);
  await getDatabaseWithUrl(databaseUrl).ref(`blacklist/${ipAddress}`).set(true);
};
