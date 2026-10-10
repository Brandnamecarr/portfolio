import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import AssistantPage from "./pages/AssistantPage";
import "./App.css";

function App() {
  const location = useLocation();
  // The assistant is intentionally unlisted: no nav, reachable only by URL.
  const showNav = location.pathname !== "/assistant";

  return (
    <main className="app">
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
