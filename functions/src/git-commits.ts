import axios from 'axios';
import * as express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { error } from 'firebase-functions/logger';
import { HttpsError, Request } from 'firebase-functions/v2/https';
import { ddosCheck } from './utils/ddos-ip-check';

initializeApp();

export default async (req: Request, resp: express.Response) => {
  // Check for potential DDOS attack
  const ddosAttack = await ddosCheck(req, 'git-commits', 600);
  if (ddosAttack) return resp.status(403).json('Blacklist');

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
    await commitRtdbRef.remove().catch(error);

    // Get current commit count from GitHub API
    return await axios
      .get('https://api.github.com/repos/hm21/alex-frei-cv/commits', {
        params: {
          // When reuse this code for large projects, is it smarter to wrap it in a while-loop
          // and work with multiple pages to get the full size => Remember the read limits from github
          per_page: 1_000,
        },
      })
      .then(async (response) => {
        const count = response.data.length ?? 0;

        // Set current commit count in the database
        await commitRtdbRef.child(formatDate(dt)).set(count).catch(error);

        return resp.status(200).json(count);
      })
      .catch(() => {
        throw new HttpsError('unknown', 'Failed to get git commits');
      });
  }
};
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonthFormatted();
  const day = date.getDateFormatted();
  const hours = date.getHoursFormatted();

  return `${year}-${month}-${day}-${hours}`;
}
