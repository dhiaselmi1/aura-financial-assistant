import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import MarketAnalysis from './pages/MarketAnalysis'
import Investments from './pages/Investments'
import Simulator from './pages/Simulator'
import Network from './pages/Network'
import Security from './pages/Security'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './components/layouts/DashboardLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="market" element={<MarketAnalysis />} />
          <Route path="investments" element={<Investments />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="network" element={<Network />} />
          <Route path="security" element={<Security />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
