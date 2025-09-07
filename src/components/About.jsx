import React from "react";
import aboutData from "../data/about.json";

const About = () => {
  const renderSection = (title, children, className = "") => (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 ${className}`}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );

  const renderEducationCard = (edu, index) => (
    <div
      key={index}
      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {edu.degree}
        </h3>
        <span className="text-xs sm:text-sm text-white bg-blue-600 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
          {edu.status}
        </span>
      </div>
      <p className="text-base sm:text-lg text-gray-700 mb-2">
        {edu.institution}
      </p>
      <p className="text-sm sm:text-md text-gray-600 mb-2">{edu.university}</p>
      <p className="text-xs sm:text-sm text-gray-500 mb-3">{edu.duration}</p>
      {edu.CGPA && (
        <p className="text-xs sm:text-sm font-medium text-blue-600 mb-3">
          CGPA: {edu.CGPA}
        </p>
      )}
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
        {edu.description}
      </p>
    </div>
  );

  const renderExperienceCard = (exp, index) => (
    <div
      key={index}
      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {exp.position}
          </h3>
          <p className="text-base sm:text-lg text-blue-600 font-medium">
            {exp.company}
          </p>
          {exp.location && (
            <p className="text-xs sm:text-sm text-gray-500">{exp.location}</p>
          )}
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs sm:text-sm text-white bg-green-600 px-2 sm:px-3 py-1 rounded-full">
            {exp.type}
          </span>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {exp.duration}
          </p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm sm:text-base">
        {exp.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm sm:text-md font-semibold text-gray-700 mb-2">
          Key Responsibilities:
        </h4>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
          {exp.responsibilities.map((resp, respIndex) => (
            <li key={respIndex} className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              {resp}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm sm:text-md font-semibold text-gray-700 mb-2">
          Technologies:
        </h4>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {exp.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs border border-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm sm:text-md font-semibold text-gray-700 mb-2">
          Key Achievements:
        </h4>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
          {exp.achievements.map((achievement, achIndex) => (
            <li key={achIndex} className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderLeadershipCard = (leadership, index) => (
    <div
      key={index}
      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {leadership.position}
          </h3>
          <p className="text-base sm:text-lg text-purple-600 font-medium">
            {leadership.organization}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs sm:text-sm text-white bg-purple-600 px-2 sm:px-3 py-1 rounded-full">
            {leadership.type}
          </span>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {leadership.duration}
          </p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm sm:text-base">
        {leadership.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm sm:text-md font-semibold text-gray-700 mb-2">
          Responsibilities:
        </h4>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
          {leadership.responsibilities.map((resp, respIndex) => (
            <li key={respIndex} className="flex items-start">
              <span className="text-purple-500 mr-2 mt-1">•</span>
              {resp}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm sm:text-md font-semibold text-gray-700 mb-2">
          Achievements:
        </h4>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
          {leadership.achievements.map((achievement, achIndex) => (
            <li key={achIndex} className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 mt-16 sm:mt-20 md:mt-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            About Me
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            {aboutData.personalInfo.summary}
          </p>
        </div>

        {/* Personal Information */}
        {renderSection(
          "Personal Information",
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Contact Details
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {aboutData.personalInfo.name}
                </p>
                <p>
                  <span className="font-medium">Title:</span>{" "}
                  {aboutData.personalInfo.title}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {aboutData.personalInfo.location}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Professional Focus
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Passionate about creating innovative solutions through
                technology, with expertise in full-stack development and project
                leadership.
              </p>
            </div>
          </div>,
          "mb-8"
        )}

        {/* Education */}
        {renderSection(
          "Education",
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {aboutData.education.map((edu, index) =>
              renderEducationCard(edu, index)
            )}
          </div>,
          "mb-8"
        )}

        {/* Professional Experience */}
        {renderSection(
          "Professional Experience",
          <div className="space-y-6">
            {aboutData.professionalExperience.map((exp, index) =>
              renderExperienceCard(exp, index)
            )}
          </div>,
          "mb-8"
        )}

        {/* Leadership & Volunteer Experience */}
        {renderSection(
          "Leadership & Volunteer Experience",
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {aboutData.leadershipAndVolunteerExperience.map(
              (leadership, index) => renderLeadershipCard(leadership, index)
            )}
          </div>,
          "mb-8"
        )}

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
            I'm always interested in discussing new opportunities, collaborating
            on projects, or simply connecting with fellow professionals in the
            tech industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/projects"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors border border-blue-600 text-sm sm:text-base"
            >
              View My Projects
            </a>
            <a
              href="/skills"
              className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-600 text-sm sm:text-base"
            >
              Explore My Skills
            </a>
            <a
              href="/contact"
              className="bg-white text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-300 text-sm sm:text-base"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
