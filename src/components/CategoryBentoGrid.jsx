import React from "react";
import { useNavigate } from "react-router-dom";
import { getProjectUrl } from "../utils/projectUtils";

function ProjectCard({ project, gridColumn, gridRow, bgColor }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const projectUrl = getProjectUrl(project.title);
    navigate(`/projects/${projectUrl}`);
  };
  const tagColors = [
    "#3b82f6", // blue-500 - solid blue
    "#10b981", // emerald-500 - solid green
    "#f59e0b", // amber-500 - solid yellow/orange
    "#ef4444", // red-500 - solid red
    "#8b5cf6", // violet-500 - solid purple
    "#06b6d4", // cyan-500 - solid cyan
    "#f97316", // orange-500 - solid orange
    "#84cc16", // lime-500 - solid lime
  ];
  return (
    <button
      style={{
        gridColumn,
        gridRow,
        background: bgColor,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'M PLUS 2 Variable', sans-serif",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "20px 18px 0 18px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        border: "none",
        width: "100%",
        height: "100%",
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.10)";
      }}
    >
      {project?.image && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <img
            src={project.image}
            alt={project?.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 14,
              filter: "brightness(0.98)",
              transition: "filter 0.2s",
            }}
          />
          {/* Gradient overlay for title readability */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "60%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.60), transparent)",
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
              zIndex: 1,
            }}
          />
        </div>
      )}
      {/* Tags as badges */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 2,
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {project?.tags?.map((tag, i) => {
          const backgroundColor = tagColors[i % tagColors.length];
          return (
            <span
              key={tag + i}
              style={{
                background: backgroundColor,
                color: "#ffffff",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                marginRight: 4,
                marginBottom: 4,
                letterSpacing: 0.3,
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                whiteSpace: "nowrap",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>
      {/* Title at bottom with white overlay */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255,255,255,0.92)",
          padding: "18px 0 14px 0",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.25rem",
          zIndex: 2,
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
          letterSpacing: 0.01,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {project?.title || "Project"}
      </div>
    </button>
  );
}

const CategoryBentoGrid = ({ projects }) => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(2, 300px)",
          gap: "28px",
          width: "100%",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
          padding: "32px 16px",
          borderRadius: "18px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* First row: 2 cards */}
        <ProjectCard
          project={projects[0]}
          gridColumn="1 / span 3"
          gridRow="1 / span 1"
          bgColor="rgba(255, 182, 193, 0.18)"
        />
        <ProjectCard
          project={projects[1]}
          gridColumn="4 / span 3"
          gridRow="1 / span 1"
          bgColor="rgba(173, 255, 47, 0.18)"
        />
        {/* Second row: 3 cards */}
        <ProjectCard
          project={projects[2]}
          gridColumn="1 / span 2"
          gridRow="2 / span 1"
          bgColor="rgba(255, 255, 224, 0.18)"
        />
        <ProjectCard
          project={projects[3]}
          gridColumn="3 / span 2"
          gridRow="2 / span 1"
          bgColor="rgba(210, 180, 140, 0.18)"
        />
        <ProjectCard
          project={projects[4]}
          gridColumn="5 / span 2"
          gridRow="2 / span 1"
          bgColor="rgba(144, 238, 144, 0.18)"
        />
      </div>
    </div>
  );
};

export default CategoryBentoGrid;
