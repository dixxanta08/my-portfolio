import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import skillsData from "../data/skills.json";

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Get unique categories for technical skills
  const technicalCategories = skillsData.technicalSkills.map(
    (category) => category.category
  );

  const handleSeeProjects = (skillName) => {
    // Navigate to projects page with skill name as a filter tag
    navigate(`/projects?tag=${encodeURIComponent(skillName)}`);
  };

  const renderSkillCard = (skill, index) => (
    <div
      key={index}
      className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Skill Icon/Image Placeholder */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
          {skill.skillName.charAt(0)}
        </div>

        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
            {skill.skillName}
          </h3>

          {/* Real World Application */}
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xs sm:text-sm font-semibold text-green-600 mb-1 sm:mb-2">
              Real-world Applications:
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {skill.realWorldApplication}
            </p>
          </div>

          {/* See Projects Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <button
              onClick={() => handleSeeProjects(skill.skillName)}
              className="w-full sm:w-auto bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              See Projects
            </button>

            {/* Projects Count (if any) */}
            {skill.projects && skill.projects.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {skill.projects.length} project
                {skill.projects.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategorySection = (categoryData, categoryIndex) => (
    <div key={categoryIndex} className="mb-8 sm:mb-12">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {categoryData.category}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-blue-500 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {categoryData.skills.map((skill, skillIndex) =>
          renderSkillCard(skill, skillIndex)
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 mt-16 sm:mt-20 md:mt-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            My Skills & Expertise
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            A comprehensive overview of my technical abilities and soft skills,
            developed through hands-on experience in software development, cloud
            computing, and collaborative projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              All Categories
            </button>
            {technicalCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Content */}
        <div className="space-y-8">
          {/* Technical Skills */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Technical Skills
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded mx-auto"></div>
            </div>
            {skillsData.technicalSkills
              .filter(
                (categoryData) =>
                  selectedCategory === null ||
                  categoryData.category === selectedCategory
              )
              .map((categoryData, categoryIndex) =>
                renderCategorySection(categoryData, categoryIndex)
              )}
          </div>

          {/* Soft Skills */}
          <div>
            <div className="text-center mb-8 mt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Soft Skills
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded mx-auto"></div>
            </div>
            {skillsData.softSkills.map((categoryData, categoryIndex) =>
              renderCategorySection(categoryData, categoryIndex)
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Skills Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {skillsData.technicalSkills.length}
              </div>
              <h3 className="font-semibold text-gray-800">
                Technical Categories
              </h3>
              <p className="text-gray-600 text-sm">
                Different areas of expertise
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {skillsData.technicalSkills.reduce(
                  (total, category) => total + category.skills.length,
                  0
                )}
              </div>
              <h3 className="font-semibold text-gray-800">Technical Skills</h3>
              <p className="text-gray-600 text-sm">Technologies mastered</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {skillsData.softSkills.reduce(
                  (total, category) => total + category.skills.length,
                  0
                )}
              </div>
              <h3 className="font-semibold text-gray-800">Soft Skills</h3>
              <p className="text-gray-600 text-sm">Personal competencies</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Collaborate?</h2>
            <p className="text-lg mb-6 opacity-90">
              I'm always excited to work on new projects and tackle challenging
              problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View My Projects
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
