import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import avatarImg from "@/assets/images/avatar.png";
import { useDispatch } from "react-redux";
import { resetSelectedBudgetId } from "@/features/budget/budgetSlice";
import logo from "../../assets/images/logo.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Task Management", href: "/task-management" },
    { name: "Budget Management", href: "/budget-management" },
    { name: "Shopping List", href: "/shopping-list" },
    // { name: "About", href: "/about" },
  ];

  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="header-container">
        {/* LEFT SIDE */}
        <div className="header-left">
          <NavLink
            to="/"
            className="ml-14 flex items-center gap-2 font-bold text-lg"
          >
            <img
              src={logo}
              alt="Lucky Money logo"
              className="w-6 h-6 object-cover"
            />
            <span>Lucky Money</span>
          </NavLink>

          <nav className="nav-desktop">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "active-link nav-item" : "nav-item"
                }
                onClick={() => dispatch(resetSelectedBudgetId())}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="header-right">
          {/* <div className="notification">
            <span className="icon" aria-hidden="true">
              🔔
            </span>
            <span className="badge">9</span>
          </div>

          <span className="icon" aria-hidden="true">
            ⚙️
          </span> */}

          <Link to="/profile" className="avatar" aria-label="Open profile">
            <img src={avatarImg} alt="" />
          </Link>

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
