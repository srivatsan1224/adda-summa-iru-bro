// src/routes/ParttimeRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ParttimeHome from "../pages/Parttime/ParttimeHome";
import JobDetailsPage from "../pages/Parttime/JobDetailsPage";
import JobPostingPage from "../pages/Parttime/JobPostingPage"; // This will now serve for create and edit

const ParttimeRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<ParttimeHome />} />
      <Route path="job/:id" element={<JobDetailsPage />} />
      <Route path="new" element={<JobPostingPage />} /> {/* For creating new job */}
      {/* *** NEW ROUTE FOR EDITING *** */}
      <Route path="edit/:id" element={<JobPostingPage />} /> {/* For editing existing job */}
    </Routes>
  );
};

export default ParttimeRoutes;