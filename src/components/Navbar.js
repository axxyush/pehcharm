import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pehcharm from "../images/pehcharm-logo.png";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import Search from "./Search";
import axios from "axios";

function Navbar() {
  const [authUser] = useAuth();
  let location = useLocation();
  const [sticky, setSticky] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!authUser?.username) return;

    axios
      .get("https://pehcharm-backend.onrender.com/recommendations/getrec", {
        params: { toUser: authUser.username, status: "pending" },
      })
      .then((res) => {
        setNotificationCount(res.data.length);
      })
      .catch((err) => {
        console.error("Failed to load notification count:", err);
      });
  }, [authUser.username]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-dark fixed-top navbar-expand-lg ${
          sticky ? "bg-dark" : "bg-transparent"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            <img
              style={{ height: "40px", marginRight: "10px" }}
              src={pehcharm}
              alt="pehcharm-logo"
            />
            <b>Pehcharm</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }  `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li
                className={`nav-item ${
                  location.pathname === "/user" ? "active" : ""
                }  `}
              >
                <Link className="nav-link" to="/user">
                  Account
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === `/${authUser?.username}/addblog`
                    ? "active"
                    : ""
                }  `}
              >
                {authUser ? (
                  <Link
                    className="nav-link"
                    to={`/${authUser?.username}/addblog`}
                  >
                    Blog
                  </Link>
                ) : (
                  ""
                )}
              </li>

              <li
                className={`nav-item ${
                  location.pathname === `/${authUser?.username}/notifications`
                    ? "active"
                    : ""
                }  `}
              >
                {authUser ? (
                  <Link
                    className="nav-link position-relative"
                    to={`/${authUser?.username}/notifications`}
                  >
                    Notifications
                    {notificationCount === 0 ? (
                      ""
                    ) : (
                      <span class="position-absolute top-1 translate-middle badge rounded-pill bg-danger">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li
                className={`nav-item ${
                  location.pathname === `/${authUser?.username}` ? "active" : ""
                }  `}
              >
                {authUser ? (
                  <Link className="nav-link" to={`/${authUser?.username}`}>
                    Portfolio
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>

            <Search />
            {authUser ? (
              <Logout />
            ) : (
              <button
                type="button "
                className="btn btn-success m-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <Login />
    </>
  );
}

export default Navbar;
