function Results({ results, isSearching }) {
  if (isSearching) {
    return <p className="status-message">Searching across sites...</p>;
  }

  if (results === null) {
    return <p className="status-message">Enter a username to begin OSINT search</p>;
  }

  if (typeof results !== 'object' || Object.keys(results).length === 0) {
    return (
      <div className="status-message">
        <p>No accounts found for this username</p>
        <p className="hint">Try different username variations</p>
      </div>
    );
  }

  return (
    <div className="results-wrapper">
      <h2>Discovered Accounts:</h2>
      <div className="results-list">
        {Object.entries(results).map(([site, data]) => {
          const hasRichData =
            data.bio ||
            data.fullname ||
            data.follower_count !== undefined ||
            data.public_repos_count !== undefined ||
            data.created_at ||
            data.image;

          return (
            <div key={site} className="result-card">
              <div className="result-info">
                <div className="site-name">{site}</div>
                {data.fullname && <div className="site-meta">Name: {data.fullname}</div>}
                {data.bio && <div className="site-meta">Bio: {data.bio}</div>}
                {data.created_at && (
                  <div className="site-meta">
                    Joined: {new Date(data.created_at).toLocaleDateString()}
                  </div>
                )}
                {data.follower_count !== undefined && (
                  <div className="site-meta">Followers: {data.follower_count}</div>
                )}
                {data.following_count !== undefined && (
                  <div className="site-meta">Following: {data.following_count}</div>
                )}
                {data.public_repos_count !== undefined && (
                  <div className="site-meta">Repos: {data.public_repos_count}</div>
                )}
                {data.public_gists_count !== undefined && (
                  <div className="site-meta">Gists: {data.public_gists_count}</div>
                )}
                {data.tags?.length > 0 && (
                  <div className="site-meta">Tags: {data.tags.join(', ')}</div>
                )}
                {data.type && <div className="site-meta">Type: {data.type}</div>}
              </div>

              {data.image && (
                <div className="avatar-container">
                  <img src={data.image} alt={`${site} avatar`} className="avatar-img" />
                </div>
              )}

              {data.url && (
                <a
                  href={data.url}
                  className="profile-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
