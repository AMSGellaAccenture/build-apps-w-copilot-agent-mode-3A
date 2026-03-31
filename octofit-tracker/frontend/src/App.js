import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="Octofit Logo" />
              Octofit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/activities">📋 Activities</Link>
                <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                <Link className="nav-link" to="/teams">👥 Teams</Link>
                <Link className="nav-link" to="/users">👤 Users</Link>
                <Link className="nav-link" to="/workouts">💪 Workouts</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div>
                <div className="welcome-section">
                  <h1>Welcome to Octofit Tracker</h1>
                  <p>Track your fitness activities, compete with your team, and achieve your goals!</p>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-header">📋 Activities</div>
                      <div className="card-body">
                        <p>Log and track your daily fitness activities</p>
                        <Link to="/activities" className="btn btn-primary">View Activities</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-header">🏆 Leaderboard</div>
                      <div className="card-body">
                        <p>See how you rank against others</p>
                        <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-header">👥 Teams</div>
                      <div className="card-body">
                        <p>Create and manage your fitness teams</p>
                        <Link to="/teams" className="btn btn-primary">View Teams</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-header">👤 Users</div>
                      <div className="card-body">
                        <p>Connect and compete with other users</p>
                        <Link to="/users" className="btn btn-primary">View Users</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-header">💪 Workouts</div>
                      <div className="card-body">
                        <p>Plan and track your workout routines</p>
                        <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
