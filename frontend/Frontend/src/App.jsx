import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import EventSchedule from './components/EventSchedule'
import ConfirmationPage from './components/ConfirmationPage'
import Ticket from './components/Ticket'
import QRScanner from './components/QRScanner'
import HomePage from './components/HomePage'

function App() {
  return (
    <div className="app-container">
      <header>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/scanner" className="nav-link">Scanner</Link>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventSchedule />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/scanner" element={<QRScanner />} />
        </Routes>
      </main>
      
      <footer>
        <p>© 2023 Event Registration Portal | Team Nuvon</p>
      </footer>
    </div>
  )
}

export default App
