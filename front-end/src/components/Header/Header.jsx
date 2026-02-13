import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Task Management", href: "/task-management" },
    { name: "Budget Management", href: "/budget-management" },
    { name: "Shopping List", href: "/shopping-list" },
    { name: "About", href: "/about" },
  ];
  return (
    <header className="header">
      <div className="header-container">
        {/* LEFT SIDE */}
        <div className="header-left">
          <h1 className="logo-web">Lucky Money</h1>

          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className="nav-item">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="header-right">
          <div className="notification">
            <span className="icon" aria-hidden="true">
              🔔
            </span>
            <span className="badge">9</span>
          </div>

          <span className="icon" aria-hidden="true">
            ⚙️
          </span>

          <div className="avatar">A</div>

          {/* Mobile menu button */}
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
            <span className="icon" aria-hidden="true">
              ☰
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="nav-mobile">
          {navItems.map((item) => (
            <Link key={item.name} to={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
