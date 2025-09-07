import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "About Me", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Skills", to: "/skills" },
    { name: "Certifications", to: "/certifications" },
    { name: "More", to: "/more" },
  ];

  const linkClasses =
    "px-4 py-2 rounded-xl transition-all duration-300 font-medium";

  return (
    <nav className="bg-gray-800 rounded-3xl px-8 py-4 fixed top-6 left-1/2 -translate-x-1/2 z-50 shadow-lg w-[90%] max-w-4xl">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <NavLink to="/" className="hover:underline">
            Dixxanta Shrestha
          </NavLink>
        </div>
        {/* Hamburger button */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="text-white w-6 h-6" />
            ) : (
              <HiMenu className="text-white w-6 h-6" />
            )}
          </button>
        </div>
        {/* Desktop menu */}
        <ul className="hidden sm:flex space-x-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "bg-gray-600 text-white scale-105"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <ul className="sm:hidden mt-4 flex flex-col space-y-3 bg-gray-700 p-4 rounded-xl animate-slideDown">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} block ${
                    isActive
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
