import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SecurityPage from './pages/SecurityPage';
import CreativePage from './pages/CreativePage';
import ContactPage from './pages/ContactPage';
import VideosPage from './pages/VideosPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="creative" element={<CreativePage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
