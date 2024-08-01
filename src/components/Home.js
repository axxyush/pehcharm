import React from "react";
import pehcharm from "../images/pehcharm-logo.png";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import step_one from "../images/step_one.png";
import step_two from "../images/step_two.png";
import step_three from "../images/step_three.png";
import step_four from "../images/step_four.png";
import step_five from "../images/step_five.png";
import step_six from "../images/step_six.png";
import step_seven from "../images/step_seven.png";
import step_eight from "../images/step_eight.png";

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
            {authUser ? (
              ""
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <div className="mx-4 instructions">
        <h2 className="display-5 fw-bold lh-1 mb-3">
          <u>Instructions</u>
        </h2>
        <img src={step_one} alt="step_one" />
        <img src={step_two} alt="step_one" />
        <img src={step_three} alt="step_one" />
        <img src={step_four} alt="step_one" />
        <img src={step_five} alt="step_one" />
        <img src={step_six} alt="step_one" />
        <img src={step_seven} alt="step_one" />
        <img src={step_eight} alt="step_one" />
      </div>
      <Login />
    </>
  );
}

export default Home;
