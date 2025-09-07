import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-16 sm:mt-20 md:mt-24">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
            Hi, I'm <span className="text-blue-600">Dixanta Nath Shrestha</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            Full Stack Developer & IT Professional
          </p>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
            Passionate about creating innovative solutions through technology,
            with expertise in full-stack development, cloud computing, and
            project leadership.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <Link
            to="/about"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-center"
          >
            About Me
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 border-2 border-blue-600 text-center"
          >
            View Projects
          </Link>
          <Link
            to="/skills"
            className="w-full sm:w-auto bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300 text-center"
          >
            My Skills
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 px-4">
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
              8+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Projects Completed
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
              5+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Technologies Mastered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
