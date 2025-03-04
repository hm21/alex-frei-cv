import axios from 'axios';
import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { debug, error } from 'firebase-functions/logger';
import { HttpsError, Request } from 'firebase-functions/v2/https';
import { ddosCheck } from '../shared/utils/ddos-ip-check';

initializeApp();

export default async (req: Request, resp: express.Response) => {
  // Check for potential DDOS attack
  const ddosAttack = await ddosCheck(req, 'git-commits', 600);
  if (ddosAttack) return resp.status(403).json('Blacklist');

  debug('⏳ Read git commits count');

  const dt = new Date();
  const commitRtdbRef = getDatabase().ref('git/commits');

  // Retrieve the temporary commit count from the database
  const temporaryCount = (
    await commitRtdbRef.child(formatDate(dt)).get()
  ).val();

  if (temporaryCount) {
    // Return the cached commit count if available
    return resp.status(200).json(temporaryCount);
  } else {
    // Delete older temporary git commits to save storage
    await commitRtdbRef
      .remove()
      .then(() => {
        debug('✅ Successfully remove temporary git commit count');
      })
      .catch((err) => {
        error('❌ Failed to remove temporary git commit count', err);
      });

    let count = 0;
    let page = 1;
    let shouldFetchMore = true;
    const perPageLimit = 100;

    while (shouldFetchMore) {
      // Get current commit count from GitHub API
      const response = await axios
        .get('https://api.github.com/repos/hm21/alex-frei-cv/commits', {
          params: {
            per_page: perPageLimit,
            page,
          },
        })
        .catch((err) => {
          error('❌ Failed to read git commit count', err);
          throw new HttpsError('unknown', 'Failed to get git commits');
        });
      const pageCommitCount = response.data?.length ?? 0;
      count += pageCommitCount;

      if (pageCommitCount === perPageLimit) {
        page += 1;
      } else {
        shouldFetchMore = false;
      }
    }
    debug('✅ Successfully read git commit count');

    // Set current commit count in the database
    await commitRtdbRef
      .child(formatDate(dt))
      .set(count)
      .then(() => {
        debug('✅ Successfully store temporary git commit count');
      })
      .catch((err) => {
        error('❌ Failed to save temporary git commit count', err);
      });

    return resp.status(200).json(count);
  }
};
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonthFormatted();
  const day = date.getDateFormatted();
  const hours = date.getHoursFormatted();

  return `${year}-${month}-${day}-${hours}`;
}
