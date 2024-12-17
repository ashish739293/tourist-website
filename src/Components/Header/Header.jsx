import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/website-logo.png";
import { AuthContext } from "../../context/AuthContext";
import "./header.css";

const nav__links = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/tours", display: "Tours" },
  { path: "/blogs", display: "Blogs" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList?.add("sticky__header");
        } else {
          headerRef.current.classList?.remove("sticky__header");
        }
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Website Logo" />
              </Link>
            </div>

            {/* Menu start */}
            <div
              className={`navigation ${isMenuOpen ? "show__menu" : ""}`}
              ref={menuRef}
              onClick={toggleMenu}
            >
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    {/* Display admin button if the user is an admin */}
                    {
                      user.role === "admin" ? (
                        <Button
                          className="btn btn-warning text-center text-white p-2"
                          onClick={() => navigate("/admin/tours")}
                        >
                          <b>
                            {user.username.charAt(0).toUpperCase() +
                              user.username.slice(1)}
                          </b>
                        </Button>
                      ) : (
                        <b>
                          {user.username.charAt(0).toUpperCase() +
                            user.username.slice(1)}
                        </b>
                      )
                    }
                   
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile menu toggle */}
              <span className="mobile__menu" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <i className="ri-close-line"></i>
                ) : (
                  <i className="ri-menu-line"></i>
                )}
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
