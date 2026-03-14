import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { HomePage, LoginPage, AgeGroupsPage, CurriculumPage, MediaPage, TrainingGuidesPage, CoachesPage, LinsmanCoursePage, BadgePreviewPage } from './pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/age-groups" element={<AgeGroupsPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/training-guides" element={<TrainingGuidesPage />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/linesman-course" element={<LinsmanCoursePage />} />
        <Route path="/badge-preview" element={<BadgePreviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
