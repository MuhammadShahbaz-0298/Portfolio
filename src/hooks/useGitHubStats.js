// useGitHubStats: live public stats from the free GitHub API (no key needed).
// Returns { status: 'loading' | 'ready' | 'hidden', stats: { repos, followers, stars } }.
// status 'hidden' = no username set or the request failed — the UI simply
// renders nothing (the page never shows wrong or made-up numbers).
import { useEffect, useState } from 'react';

const HIDDEN = { status: 'hidden', stats: null };

export function useGitHubStats(username) {
  const [result, setResult] = useState({ status: 'loading', stats: null });

  useEffect(() => {
    if (!username) {
      setResult(HIDDEN);
      return undefined;
    }

    const controller = new AbortController();

    const load = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
            signal: controller.signal,
          }),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const user = await userRes.json();
        const repos = await reposRes.json();
        const stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);

        setResult({
          status: 'ready',
          stats: { repos: user.public_repos, followers: user.followers, stars },
        });
      } catch {
        // Offline, rate-limited or privacy-restricted: hide the card entirely.
        if (!controller.signal.aborted) setResult(HIDDEN);
      }
    };

    load();
    return () => controller.abort();
  }, [username]);

  return result;
}
