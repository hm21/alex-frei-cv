import axios from 'axios';
import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { logger } from 'firebase-functions';
import { HttpsError, Request } from 'firebase-functions/v2/https';

initializeApp();

import { getCurrentHourKey } from '../../shared/utils/datetime-helpers';
import { checkRateLimit } from '../../shared/utils/rate-limiter';
import { GITHUB_REPO_COMMITS_URL } from './constants/github-endpoint.constants';

const rtdb = getDatabase();
const commitRtdbRef = rtdb.ref('git').child('commits');

export default async (req: Request, resp: express.Response) => {
  if (req.method !== 'GET') {
    resp.setHeader('Allow', 'GET');
    return resp.status(405).json({ error: 'Method Not Allowed' });
  }

  await checkRateLimit(req, 'git-commits', 600);
  logger.debug('⏳ Attempting to retrieve Git commit count...');

  const cachedCount = await fetchCachedCommitsCount();
  /// Important: Don't just check `!cachedCount` because that would also fail when the count is 0.
  console.log(cachedCount !== undefined && cachedCount !== null);
  if (cachedCount !== undefined && cachedCount !== null) {
    logger.debug(
      `📦 Cached commit count found. Returning cached value.`,
    );
    return resp.status(200).json(cachedCount);
  }

  logger.debug('💾 No cached value found. Fetching from GitHub...');
  await clearCachedCommitCount();

  const freshCount = await fetchCommitCountFromGitHub();
  await cacheCommitCount(freshCount);

  return resp.status(200).json(freshCount);
};
/**
 * Fetches commit count from cache if available.
 */
async function fetchCachedCommitsCount(): Promise<number | undefined> {
  try {
    const ref = commitRtdbRef.child(getCurrentHourKey());
    const snap = await ref.get();
    const temporaryCount: number = snap.val();
    return temporaryCount;
  } catch (error) {
    logger.error('❌ Failed to fetch temporary git commit count.', error);
  }

  return undefined;
}

/**
 * Clears the cached commit count to avoid stale data.
 */
async function clearCachedCommitCount(): Promise<void> {
  try {
    await commitRtdbRef.remove();
    logger.debug('✅ Successfully remove temporary git commit count.');
  } catch (error) {
    logger.error('❌ Failed to remove temporary git commit count.', error);
  }
}

/**
 * Fetches the total number of commits from the GitHub repo.
 */
async function fetchCommitCountFromGitHub(): Promise<number> {
  let count = 0;
  let page = 1;
  let shouldFetchMore = true;
  const perPageLimit = 100;

  while (shouldFetchMore) {
    try {
      const response = await axios.get(GITHUB_REPO_COMMITS_URL, {
        params: {
          per_page: perPageLimit,
          page,
        },
      });
      const pageCommitCount = response.data?.length ?? 0;
      count += pageCommitCount;

      if (pageCommitCount === perPageLimit) {
        page += 1;
      } else {
        shouldFetchMore = false;
      }
    } catch (error) {
      logger.error('❌ Failed to read git commit count.', error);
      throw new HttpsError('unknown', 'Failed to get git commits.');
    }
  }

  logger.debug('✅ Successfully read git commit count.');

  return count;
}

/**
 * Caches the fetched commit count under a time-based key.
 */
async function cacheCommitCount(count: number): Promise<void> {
  // Set current commit count in the database
  try {
    await commitRtdbRef.child(getCurrentHourKey()).set(count);
    logger.debug('✅ Successfully store temporary git commit count.');
  } catch (error) {
    logger.error('❌ Failed to save temporary git commit count.', error);
  }
}
