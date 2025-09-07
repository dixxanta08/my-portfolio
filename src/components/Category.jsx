import React from "react";
import projects from "../data/projects.json";
import CategoryBentoGrid from "./CategoryBentoGrid";

const Category = () => {
  // Filter projects into featured and other categories
  const featuredProjects = projects.filter(
    (project) => project.featured === true
  );
  const otherProjects = projects.filter(
    (project) => project.featured === false
  );

  const renderOtherProjectCard = (project, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-16 sm:mt-20 md:mt-24 w-full min-h-screen flex flex-col items-center justify-start px-4 sm:px-6">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
          My Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">
          A showcase of my development work, featuring full-stack applications,
          e-commerce platforms, and innovative solutions built with modern
          technologies.
        </p>
      </div>

      {/* Featured Projects - BentoGrid */}
      <div className="w-full mb-12 sm:mb-16">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Featured Projects
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>
        <div className="flex justify-center px-2 sm:px-4">
          <CategoryBentoGrid projects={featuredProjects} />
        </div>
      </div>

      {/* Other Projects - Card Grid */}
      {otherProjects.length > 0 && (
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Other Projects
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gray-600 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {otherProjects.map((project, index) =>
              renderOtherProjectCard(project, index)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
