import { useState } from "react";
import { FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  FaBriefcase,
  FaCalendar,
  FaChartBar,
  FaComments,
  FaHouse,
  FaLeftLong,
  FaNewspaper,
  FaRightLong,
  FaUsers,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen, handleToggle }) => {
  const { logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sidebarLinks = [
    { id: 1, title: "Home", path: "/home", icon: <FaHouse /> },
    { id: 2, title: "Jobs", path: "/form", icon: <FaBriefcase /> },
    { id: 3, title: "Postings", path: "/postings", icon: <FaNewspaper /> },
    { id: 4, title: "Employees", path: "/employees", icon: <FaUsers /> },
    { id: 5, title: "Interviews", path: "/interviews", icon: <FaComments /> },
    {
      id: 6,
      title: "Reports",
      icon: <FaChartBar />,
      children: [
        {
          id: 61,
          title: "Monthly Report",
          path: "/reports/monthly",
          icon: <FaCalendarAlt />,
        },
        {
          id: 62,
          title: "Annual Report",
          path: "/reports/annual",
          icon: <FaCalendar />,
        },
      ],
    },
    {
      id: 7,
      title: "Settings",
      icon: <FaCog />,
      children: [
        {
          id: 71,
          title: "Logout",
          icon: <FaSignOutAlt />,
          action: logout,
        },
      ],
    },
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? "collapsed" : "expanded"}`}>
      <div className="sidebar-toggle" onClick={handleToggle}>
        {isSidebarOpen ? <FaRightLong /> : <FaLeftLong />}
      </div>

      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.id}>
            {link.children ? (
              <div
                className={`menu-item ${isSidebarOpen ? "opened" : ""}`}
                onClick={() => toggleMenu(link.id)}
              >
                <span className="icon">{link.icon}</span>
                {!isSidebarOpen && <span>{link.title}</span>}
              </div>
            ) : (
              <SidebarLink
                key={link.id}
                {...link}
                isSidebarOpen={isSidebarOpen}
              />
            )}

            {link.children && !isSidebarOpen && expandedMenus[link.id] && (
              <ul className="submenu">
                {link.children.map((child) => (
                  <li key={child.id}>
                    {child.action ? (
                      <div className="menu-item" onClick={child.action}>
                        <span className="icon">{child.icon}</span>
                        <span>{child.title}</span>
                      </div>
                    ) : (
                      <SidebarLink
                        key={child.id}
                        {...child}
                        isSidebarOpen={isSidebarOpen}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

const SidebarLink = ({ isSidebarOpen, path, icon, title }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `menu-item ${isActive ? "active" : ""} ${isSidebarOpen ? "opened" : ""}`
      }
    >
      <span className="icon">{icon}</span>
      {!isSidebarOpen && <span>{title}</span>}
    </NavLink>
  );
};
