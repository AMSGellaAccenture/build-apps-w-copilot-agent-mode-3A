import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching from workouts endpoint:', endpoint);

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched workouts data:', data);

        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">💪 Workouts</h2>
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
              Error loading workouts: {error}
            </div>
          )}

          {!loading && !error && workouts.length === 0 && (
            <div className="empty-state">
              <p>No workouts found. Start planning your fitness routine!</p>
            </div>
          )}

          {!loading && !error && workouts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Workout Name</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Difficulty</th>
                    <th>Exercises</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>{workout.id || '-'}</td>
                      <td>
                        <strong>{workout.name || '-'}</strong>
                      </td>
                      <td>{workout.type || '-'}</td>
                      <td>{workout.duration || '-'} min</td>
                      <td>
                        <span className={`badge bg-${getDifficultyColor(workout.difficulty)}`}>
                          {workout.difficulty || '-'}
                        </span>
                      </td>
                      <td>{workout.exercises_count || 0}</td>
                      <td>
                        <button className="btn btn-sm btn-primary">Start</button>
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

function getDifficultyColor(difficulty) {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'danger';
    default:
      return 'secondary';
  }
}

export default Workouts;