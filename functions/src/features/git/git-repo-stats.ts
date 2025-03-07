import axios from 'axios';
import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { debug, error } from 'firebase-functions/logger';
import { HttpsError, Request } from 'firebase-functions/v2/https';
import { ddosCheck } from '../../shared/utils/ddos-ip-check';

initializeApp();

export default async (req: Request, resp: express.Response) => {
  // Check for potential DDOS attack
  const ddosAttack = await ddosCheck(req, 'git-repo-stats', 600);
  if (ddosAttack) return resp.status(403).json('Blacklist');

  const repoName = req.body['repoName'];

  debug(`⏳ Read git repo ${repoName} stats`);

  const dt = new Date();
  const rtdbRef = getDatabase().ref(`git/repo/stats/${repoName}`);

  // Retrieve the temporary stats from the database
  const temporaryStats = (await rtdbRef.child(formatDate(dt)).get()).val();

  if (temporaryStats) {
    debug(`✅ Use temporary stats for repo ${repoName}`);
    // Return the cached git repo stats if available
    return resp.status(200).json(temporaryStats);
  } else {
    // Delete older temporary git git repo stats to save storage
    await rtdbRef
      .remove()
      .then(() => {
        debug('✅ Successfully remove temporary git repo stats');
      })
      .catch((err) => {
        error('❌ Failed to remove temporary git repo stats', err);
      });

    // Get current stats from GitHub API
    const response = await axios
      .get(`https://api.github.com/repos/hm21/${repoName}`, {
        headers: { 'User-Agent': 'Node.js' },
      })
      .catch((err) => {
        error('❌ Failed to read git repo stats', err);
        throw new HttpsError('unknown', 'Failed to get git repo stats');
      });
    const { stargazers_count, forks_count, watchers_count, open_issues_count } =
      response.data;

    const stats = {
      stargazers_count,
      forks_count,
      watchers_count,
      open_issues_count,
    };

    debug(`⭐ Stars: ${stargazers_count}`);
    debug(`🍴 Forks: ${forks_count}`);
    debug(`👀 Watchers: ${watchers_count}`);
    debug(`🐛 Open Issues: ${open_issues_count}`);

    // Set current stats in the database
    await rtdbRef
      .child(formatDate(dt))
      .set(stats)
      .then(() => {
        debug('✅ Successfully store temporary git repo stats');
      })
      .catch((err) => {
        error('❌ Failed to save temporary git repo stats', err);
      });

    return resp.status(200).json(stats);
  }
};
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonthFormatted();
  const day = date.getDateFormatted();
  const hours = date.getHoursFormatted();

  return `${year}-${month}-${day}-${hours}`;
}
