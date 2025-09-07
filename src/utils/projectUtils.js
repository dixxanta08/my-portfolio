// Utility function to convert project title to URL-friendly format
export const getProjectUrl = (title) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
};

// Utility function to convert URL back to find project
export const findProjectByUrl = (projects, urlSlug) => {
    return projects.find(project =>
        getProjectUrl(project.title) === urlSlug
    );
};
