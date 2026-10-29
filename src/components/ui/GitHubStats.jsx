import Card from './Card';
import Reveal from './Reveal';
import { useGitHubStats } from '../../hooks/useGitHubStats';

export default function GitHubStats({ username, profileUrl }) {
  const { status, stats } = useGitHubStats(username);

  if (status !== 'ready') return null;

  const items = [
    { id: 'repos', label: 'Public repos', value: stats.repos },
    { id: 'stars', label: 'Total stars', value: stats.stars },
    { id: 'followers', label: 'Followers', value: stats.followers },
  ];

  return (
    <Reveal delay={120}>
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`GitHub profile: ${stats.repos} repos, ${stats.stars} stars, ${stats.followers} followers`}
      >
        <Card hover>
          <div className="flex items-center justify-between gap-4">
            <p className="label text-muted">Live from GitHub</p>
            <span className="text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              View profile →
            </span>
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id}>
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="gradient-text mt-0.5 text-2xl font-extrabold tracking-tight">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </a>
    </Reveal>
  );
}
