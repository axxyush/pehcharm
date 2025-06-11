import React from "react";
import pehcharm from "../images/pehcharm-logo.png";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import ayushImg from "../images/ayushImg.png";
import aryanImg from "../images/aryanImg.png";

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
          <div className="col-10 col-sm-4 col-lg-5">
            <img
              src={pehcharm}
              className="banner-img d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width={700}
              height={500}
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-white">
              Welcome {userName}!
            </h1>
            <p className="lead text-white">
              Pehcharm helps you build a sleek, interactive portfolio that goes
              beyond just listing your achievements — it tells your story.
              Whether you're a developer, designer, analyst, or creator, you can
              create a professional portfolio that’s tailored to your goals and
              ready to impress.
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

      {/* features */}
      <div
        className="container px-4 py-5 text-white"
        id="icon-grid"
        style={{
          backgroundColor: "rgba(38, 16, 16, 0.33)",
          borderRadius: "40px",
          border: "3px solid #ff6ec7",
        }}
      >
        {" "}
        <h1 className="pb-2 text-center ">
          <b>Features</b>
        </h1>{" "}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
          {" "}
          <div className="col d-flex align-items-start">
            {" "}
            <svg
              className="bi text-body-secondary flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em"
              aria-hidden="true"
            >
              <use xlinkHref="#bootstrap" />
            </svg>{" "}
            <div>
              {" "}
              <h3 className="fw-bold mb-0 fs-4 gradient-text">
                Build Your Portfolio
              </h3>{" "}
              <p>
                Just sign up and fill in your details. Your portfolio is
                generated within seconds.
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col d-flex align-items-start">
            {" "}
            <svg
              className="bi text-body-secondary flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em"
              aria-hidden="true"
            >
              <use xlinkHref="#cpu-fill" />
            </svg>{" "}
            <div>
              {" "}
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis gradient-text">
                Get AI Feedback
              </h3>{" "}
              <p>
                Our AI gives you a score out of 10 along with suggestions to
                help you shine.
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col d-flex align-items-start">
            {" "}
            <svg
              className="bi text-body-secondary flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em"
              aria-hidden="true"
            >
              <use xlinkHref="#calendar3" />
            </svg>{" "}
            <div>
              {" "}
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis gradient-text">
                Discover & Connect
              </h3>{" "}
              <p>
                Look up other Pehcharm users, explore their portfolios, and send
                or request recommendations.
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col d-flex align-items-start">
            {" "}
            <svg
              className="bi text-body-secondary flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em"
              aria-hidden="true"
            >
              <use xlinkHref="#home" />
            </svg>{" "}
            <div>
              {" "}
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis gradient-text">
                Share Your Voice
              </h3>{" "}
              <p>
                Post blogs, reflect on your journey, or showcase what you're
                learning.
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col d-flex align-items-start">
            {" "}
            <svg
              className="bi text-body-secondary flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2" />
            </svg>{" "}
            <div>
              {" "}
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis gradient-text">
                Track Views
              </h3>{" "}
              <p>Get notified when someone views your profile.</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="col d-flex align-items-start">
            {" "}
            <svg
              className="bi text-body-secondary flex-shrink-0 me-3"
              width="1.75em"
              height="1.75em"
              aria-hidden="true"
            >
              <use xlinkHref="#toggles2" />
            </svg>{" "}
            <div>
              {" "}
              <h3 className="fw-bold mb-0 fs-4 text-body-emphasis gradient-text">
                Find your dream job
              </h3>{" "}
              <p>
                Explore and apply for jobs matched to your skills and interests
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <hr className="line" />
        <h1 className="pb-2 m-4 text-center ">
          <b>Why Pehcharm?</b>
        </h1>{" "}
        <div className="container px-5">
          <p className="mb-5">
            Pehcharm is more than just a portfolio builder — it's your personal
            brand, elevated. Designed for students and professionals from all
            backgrounds, it helps you create a sleek, interactive portfolio that
            showcases your skills, experiences, projects, and personality — no
            design or coding needed. What sets Pehcharm apart is its smart,
            user-first approach. With built-in AI feedback, GitHub integration,
            blog posting, job search, profile analytics, and peer
            recommendations, you get everything you need to build, improve, and
            share a portfolio that grows with you — and gets you noticed.
          </p>
        </div>
        <hr className="line" />
        <h1 className=" m-4 text-center text-light">
          <b>Authors</b>
        </h1>{" "}
        <div className="d-flex justify-content-center flex-wrap">
          <div
            className="card m-5"
            style={{
              width: "25%",
              background:
                "linear-gradient(45deg, #405de6, rgb(155, 81, 219), #b33ab4, #c135b4, #e1306c, #fd1f1f)",
            }}
          >
            <img
              src={ayushImg}
              className="card-img-top"
              alt="Ayush"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h5 className="card-title text-dark">Ayush Srivastava</h5>
              <p className="card-text text-light">
                Lead developer of Pehcharm, built and scaled the full-stack
                platform with AI integration and dynamic portfolio generation.
              </p>
              <a href="/axxyush" className="btn btn-outline-light">
                View Ayush's profile!
              </a>
            </div>
          </div>
          <div
            className="card m-5"
            style={{
              width: "25%",
              background:
                "linear-gradient(45deg, #405de6, rgb(155, 81, 219), #b33ab4, #c135b4, #e1306c, #fd1f1f)",
            }}
          >
            <img
              src={aryanImg}
              className="card-img-top"
              alt="Ayush"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h5 className="card-title text-dark">Aryan Mudgal</h5>
              <p className="card-text text-light">
                Co-developed Pehcharm v2.0, contributing job search, AI
                feedback, and real-time collaboration features while
                strengthening team-based development.
              </p>
              <a href="/aryanmudgal" className="btn btn-outline-light">
                View Aryan's profile!
              </a>
            </div>
          </div>
        </div>
      </div>

      <Login />
    </>
  );
}

export default Home;
