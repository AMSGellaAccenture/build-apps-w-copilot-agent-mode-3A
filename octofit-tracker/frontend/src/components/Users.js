import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
      console.log('Fetching from users endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched users data:', data);

        // Handle both paginated and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">👤 Users</h2>
        </div>
        <div className="card-body">
          {loading && (
            <div className="spinner-container">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger" role="alert">
              Error loading users: {error}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="empty-state">
              <p>No users found.</p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Score</th>
                    <th>Activities</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id || '-'}</td>
                      <td>
                        <strong>{user.username || user.name || '-'}</strong>
                      </td>
                      <td>{user.email || '-'}</td>
                      <td>
                        <span className="badge bg-success">{user.score || 0}</span>
                      </td>
                      <td>{user.activities_count || 0}</td>
                      <td>{user.date_joined || '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-primary">Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;