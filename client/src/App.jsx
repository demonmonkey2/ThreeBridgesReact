import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { HomePage, LoginPage, AgeGroupsPage, CurriculumPage, MediaPage, TrainingGuidesPage, CoachesPage, LinsmanCoursePage, PlayersPage } from './pages'
import './App.css'

const TOKEN_KEY = 'coaches_token'

function isTokenValid(token) {
  if (!token) return false
  try {
    const [dataB64] = token.split('.')
    const base64 = dataB64.replace(/-/g, '+').replace(/_/g, '/')
    const expiry = parseInt(atob(base64), 10)
    return expiry > Date.now()
  } catch {
    return false
  }
}

function ProtectedRoute({ element }) {
  const token = localStorage.getItem(TOKEN_KEY)
  return isTokenValid(token) ? element : <Navigate to="/coaches" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/age-groups" element={<AgeGroupsPage />} />
        <Route path="/curriculum" element={<ProtectedRoute element={<CurriculumPage />} />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/training-guides" element={<TrainingGuidesPage />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/linesman-course" element={<LinsmanCoursePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
