import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import EventSchedule from './components/EventSchedule'
import ConfirmationPage from './components/ConfirmationPage'
import Ticket from './components/Ticket'
import QRScanner from './components/QRScanner'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import AdminDashboard from './components/AdminDashboard'
import { AuthContext } from './context/AuthContext'

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  
  return (
    <div className="app-container">
      <header>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/events" className="nav-link">Events</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/register" className="nav-link">Register for Event</Link>
              {isAdmin && <Link to="/admin" className="nav-link">Admin Dashboard</Link>}
              {isAdmin && <Link to="/scanner" className="nav-link">Scanner</Link>}
              <span className="user-info">
                Welcome, {user?.name} ({isAdmin ? 'Admin' : 'User'})
              </span>
              <button onClick={logout} className="nav-link logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register-account" className="nav-link">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventSchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-account" element={<Register />} />
          
          {/* Protected routes */}
          <Route 
            path="/register" 
            element={
              <ProtectedRoute>
                <RegistrationForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/confirmation/:id" 
            element={
              <ProtectedRoute>
                <ConfirmationPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ticket/:id" 
            element={<Ticket />} 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/scanner" 
            element={
              <ProtectedRoute adminOnly={true}>
                <QRScanner />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      <footer>
        <p>© 2023 Event Registration Portal | Team Nuvon</p>
      </footer>
    </div>
  )
}

export default App
