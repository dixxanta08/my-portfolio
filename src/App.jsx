import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import Category from "./components/Category";
import Skills from "./components/Skills";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Category />} />
          <Route path="/projects/:projectName" element={<ProjectDetail />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
