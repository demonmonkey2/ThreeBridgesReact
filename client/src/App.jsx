import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { HomePage, LoginPage, AdminPage, TeamsPage, ScoresPage, VideoPage, PitchBookingPage } from './pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/book-pitch" element={<PitchBookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
