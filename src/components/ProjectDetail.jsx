import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsData from "../data/projects.json";
import { findProjectByUrl } from "../utils/projectUtils";

const ProjectDetail = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingImages, setLoadingImages] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Find the project using the utility function
  const project = findProjectByUrl(projectsData, projectName);

  // Group images by type
  const groupImagesByType = (images) => {
    if (!images) return {};

    return images.reduce((groups, image) => {
      // Handle both old format (string) and new format (object)
      if (typeof image === "string") {
        const type = "Screenshots";
        if (!groups[type]) groups[type] = [];
        groups[type].push({ url: image, caption: "", type, alt: "" });
      } else {
        const type = image.type || "Screenshots";
        if (!groups[type]) groups[type] = [];
        groups[type].push(image);
      }
      return groups;
    }, {});
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // Handle image loading states
  const handleImageLoadComplete = (imageUrl) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageUrl);
      return newSet;
    });
    setLoadedImages((prev) => new Set([...prev, imageUrl]));
  };

  const handleImageError = (imageUrl) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageUrl);
      return newSet;
    });
    console.error("Image failed to load:", imageUrl);
  };

  // Initialize loading state for images
  React.useEffect(() => {
    if (project?.images) {
      const imageUrls = project.images.map((img) =>
        typeof img === "string" ? img : img.url
      );
      setLoadingImages(new Set(imageUrls));
    }
  }, [project]);

  const groupedImages = groupImagesByType(project?.images);

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The project you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back button */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {project.image && (
            <div className="h-80 md:h-96 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {project.title}
                </h1>
              </div>
            </div>
          )}

          {!project.image && (
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {project.title}
              </h1>
            </div>
          )}
        </div>

        {/* Tags and Links Section - After Image */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tech Stack */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, index) => (
                  <span
                    key={`tag-${index}`}
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            {project["live-preview"] && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Live Demo
                </h3>
                <a
                  href={project["live-preview"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <span className="font-medium">View Live Site</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {/* GitHub Links */}
            {project["github-links"] && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Source Code
                </h3>
                <div className="space-y-3">
                  {Array.isArray(project["github-links"]) ? (
                    project["github-links"].map((linkItem, index) => {
                      // Handle both old format (strings) and new format (objects)
                      if (typeof linkItem === "string") {
                        const label = linkItem.includes("frontend")
                          ? "Frontend Code"
                          : linkItem.includes("backend")
                          ? "Backend Code"
                          : `GitHub ${index + 1}`;
                        return (
                          <a
                            key={`github-${index}`}
                            href={linkItem}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                          >
                            <span className="font-medium">{label}</span>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        );
                      } else {
                        // Handle new object format
                        const [label, url] = Object.entries(linkItem)[0];
                        return (
                          <a
                            key={`github-obj-${index}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                          >
                            <span className="font-medium">{label}</span>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        );
                      }
                    })
                  ) : (
                    <a
                      href={project["github-links"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <span className="font-medium">Source Code</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Layout: Description (1 col, 2 rows) and Challenges/Lessons (1 col, 1 row on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Description and Personal Learnings (2 rows) */}
          <div className="space-y-8">
            {/* Description */}
            {project.description && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* Personal Learnings */}
            {project["personal-learnings"] && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  What I Learned
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {project["personal-learnings"]}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Challenges (1 row) */}
          <div>
            {project.challenges && project.challenges.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Challenges
                </h2>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={`challenge-${index}`}
                      className="text-gray-600 leading-relaxed flex items-start"
                    >
                      <span className="text-blue-600 mr-2">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Media Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Media Gallery
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Click on any image to view full size with details
              </p>

              {Object.entries(groupedImages).map(([type, images]) => (
                <div key={type} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                    {type}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {images.map((image, index) => (
                      <button
                        key={`${type}-${index}`}
                        className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer aspect-square border-0 p-0 bg-transparent"
                        onClick={() => openModal(image)}
                        type="button"
                        aria-label={
                          image.alt
                            ? `View ${image.alt}`
                            : `View ${project.title} ${type} ${index + 1}`
                        }
                      >
                        {/* Loading skeleton */}
                        {loadingImages.has(image.url) && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}

                        <img
                          src={image.url}
                          alt={
                            image.alt || `${project.title} ${type} ${index + 1}`
                          }
                          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                            loadedImages.has(image.url)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => handleImageLoadComplete(image.url)}
                          onError={() => handleImageError(image.url)}
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedImage.type || "Image"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                <div className="relative">
                  {loadingImages.has(selectedImage.url) && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center rounded-lg">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.alt || "Project image"}
                    className={`w-full max-h-96 object-contain rounded-lg transition-opacity duration-300 ${
                      loadedImages.has(selectedImage.url)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    loading="eager"
                    decoding="async"
                    onLoad={() => handleImageLoadComplete(selectedImage.url)}
                    onError={() => handleImageError(selectedImage.url)}
                  />
                </div>
                {selectedImage.caption && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedImage.caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Close button overlay for background */}
              <button
                className="absolute inset-0 w-full h-full bg-transparent -z-10"
                onClick={closeModal}
                aria-label="Close modal by clicking background"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
