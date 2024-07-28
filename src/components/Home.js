import React from "react";
import pehcharm from "../images/pehcharm-logo.png";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const [authUser] = useAuth();
  const userName = authUser ? authUser.name : "Stranger";

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    if (authUser) {
      toast.success("Already logged in");
    }
  };
  return (
    <>
      <div className="home container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={pehcharm}
              className="banner-img d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width={800}
              height={600}
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Welcome {userName}!
            </h1>
            <p className="lead">
              Pehcharm is an application where you can build you own portfolio
              website in extremely simple steps. Login, enter your profile
              details and that's it! It's that simple.
            </p>
            <div className="d-flex flex-row flex-wrap  gap-2 d-md-flex justify-content-md-start">
              <button
                className=" btn-lg m-3 px-4 me-md-2 login-btn"
                data-bs-toggle={authUser ? "" : "modal"}
                data-bs-target={authUser ? "" : "#exampleModal"}
                onClick={handleLogin}
              >
                Log in
              </button>
              <button
                onClick={handleSignUp}
                className="btn-lg m-3 px-4 me-md-2 login-btn"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <Login />
    </>
  );
}

export default Home;
