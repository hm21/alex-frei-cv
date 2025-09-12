import axios from 'axios';
import { Response } from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getDatabase, Reference } from 'firebase-admin/database';
import { logger } from 'firebase-functions';
import { HttpsError, Request } from 'firebase-functions/v2/https';

initializeApp();

import { getCurrentHourKey } from '../../shared/utils/datetime-helpers';
import { validateHttpMethod } from '../../shared/utils/http-method.utils';
import { checkRateLimit } from '../../shared/utils/rate-limiter';
import { GITHUB_BASE_REPO_URL } from './constants/github-endpoint.constants';
import { GithubRepoStats } from './types/git-repo-stats.types';

const rtdb = getDatabase();
const statsRef = rtdb.ref('git').child('repo').child('stats');

/**
 * Handles HTTP request to fetch GitHub repository stats with caching and rate limiting.
 *
 * @param req - The incoming HTTP request
 * @param resp - The HTTP response to send
 * @returns JSON response containing the repository stats
 */
export default async (req: Request, resp: Response) => {
  if (!validateHttpMethod(req, resp, ['GET'])) {
    return;
  }

  await checkRateLimit(req, 'git-repo-stats', 600);

  const repoName = req.query.repoName as string | undefined;
  if (!repoName) {
    return resp.status(400).json({ error: 'Missing repoName' });
  }

  logger.debug(`⏳ Looking up stats for GitHub repo: ${repoName}`);
  const repoRef = statsRef.child(repoName);

  const cachedStats = await getCachedRepoStats(repoRef);
  if (cachedStats) {
    logger.debug(`✅ Served from cache: ${repoName}`);
    return resp.status(200).json(cachedStats);
  }

  await clearRepoStatsCache(repoRef);

  const stats = await fetchRepoStatsFromGitHub(repoName);
  await cacheRepoStats(repoRef, stats);

  return resp.status(200).json(stats);
};

/**
 * Fetches cached repository stats for the current hour.
 *
 * @param ref - Reference to the Firebase RTDB path for the repo
 * @returns The cached stats if available, otherwise undefined
 */
async function getCachedRepoStats(
  ref: Reference,
): Promise<GithubRepoStats | undefined> {
  try {
    const snapshot = await ref.child(getCurrentHourKey()).get();
    return snapshot.val() || undefined;
  } catch (err) {
    logger.error('❌ Failed to get cached repo stats', err);
    return undefined;
  }
}

/**
 * Clears all previously cached stats for a given repository.
 *
 * @param ref - Reference to the Firebase RTDB path for the repo
 */
export async function clearRepoStatsCache(ref: Reference): Promise<void> {
  try {
    await ref.remove();
    logger.debug('🗑️ Cleared old repo stats cache');
  } catch (err) {
    logger.error('❌ Failed to clear repo stats cache', err);
  }
}

/**
 * Stores the repository stats in the cache under the current hour key.
 *
 * @param ref - Reference to the Firebase RTDB path for the repo
 * @param stats - The stats object to store
 */
export async function cacheRepoStats(
  ref: Reference,
  stats: GithubRepoStats,
): Promise<void> {
  try {
    await ref.child(getCurrentHourKey()).set(stats);
    logger.debug('💾 Cached current repo stats');
  } catch (err) {
    logger.error('❌ Failed to cache repo stats', err);
  }
}

/**
 * Fetches real-time repository stats from the GitHub API.
 *
 * @param repoName - The name of the GitHub repository
 * @returns The repository stats object
 * @throws HttpsError if the GitHub API request fails
 */
export async function fetchRepoStatsFromGitHub(
  repoName: string,
): Promise<GithubRepoStats> {
  try {
    const response = await axios.get(`${GITHUB_BASE_REPO_URL}/${repoName}`, {
      headers: { 'User-Agent': 'Node.js' },
    });

    const { stargazers_count, forks_count, watchers_count, open_issues_count } =
      response.data;

    logger.debug(
      [
        `📊 Stats for repo ${repoName}`,
        `⭐ Stars: ${stargazers_count}`,
        `🍴 Forks: ${forks_count}`,
        `👀 Watchers: ${watchers_count}`,
        `🐛 Open Issues: ${open_issues_count}`,
      ].join('\n'),
    );

    return { stargazers_count, forks_count, watchers_count, open_issues_count };
  } catch (err) {
    logger.error('❌ Failed to fetch repo stats from GitHub', err);
    throw new HttpsError('unknown', 'Failed to get GitHub repo stats');
  }
}
