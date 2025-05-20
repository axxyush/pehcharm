import React from "react";
import { Link } from "react-router-dom";

export function Repo(props) {
  return (
    <>
      <div className="container-repo ">
        <div className="box slide-up">
          <span className="title my-4 text-wrap">{props.name}</span>
          <div>
            <strong className="my-2">Visibility: {props.visibility}</strong>
            <p className="my-2">Description: {props.description}</p>
            <span className="my-2">Pushed at: </span>{" "}
            <span>{props.pushed_at}</span>
          </div>
          <Link
            className="my-3"
            style={{ textDecoration: "none", color: "white" }}
            to={props.html_url}
          >
            View Repo
          </Link>
        </div>
      </div>
    </>
  );
}

export function Education(props) {
  return (
    <>
      <div className="container-repo">
        <div className="box slide-up p-3">
          <span className="texts text-wrap">
            <b>{props.name}</b>
          </span>
          <span className="texts">Degree: props.degree</span>
          <span className="texts">GPA: {props.gpa}</span>
          <span className="texts">
            <i>Graduation Year: {props.year}</i>
          </span>
          <hr className="line" />
          <p className="texts fw-light">
            <b>Description:</b> {props.description}
          </p>
        </div>
      </div>
    </>
  );
}

export function Experience(props) {
  return (
    <>
      <div className="container-exp d-flex flex-column">
        <div className="exp1 slide-up d-flex flex-row">
          <div
            className="position text-light"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.22)",
              borderRadius: "10px",
              width: "30%",
              marginRight: "20px",
              padding: "20px",
            }}
          >
            <h1 className="display-1 fw-bold text-white">*</h1>
            <span className=" my-4 text-wrap">
              <b className="texts">{props.jobtitle}</b>
            </span>{" "}
            <br />
            <span className="texts">{props.year}</span> <br />
            <span className="texts">{props.location}</span>
          </div>
          <div
            className="description text-light"
            style={{
              background: `linear-gradient(45deg, #405de6, rgb(155, 81, 219), #b33ab4, #c135b4, #e1306c, #fd1f1f)`,
              borderRadius: "10px",
              width: "65%",
              padding: "20px",
            }}
          >
            <p className="my-2 texts">{props.description}</p>
          </div>
        </div>

        <div
          className="exp2 text-center"
          style={{
            border: "2px solid white",
            borderRadius: "20px",
            marginTop: "20px",
            width: "95%",
            padding: "5px",
          }}
        >
          <p className="my-2 text-light">
            <b className="texts">{props.company}</b>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
}
export function Project(props) {
  return (
    <>
      <div className="container-exp d-flex flex-column">
        <div className="exp1 slide-up d-flex flex-row">
          <div
            className="description text-light"
            style={{
              background: `linear-gradient(45deg, #405de6, rgb(155, 81, 219), #b33ab4, #c135b4, #e1306c, #fd1f1f)`,
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <span className="texts text-wrap font-monospace">
              <b>{props.title}</b>
            </span>{" "}
            <br />
            <span className="texts ">
              <b>{props.skills}</b>
            </span>{" "}
            <br />
            <span className="texts">
              <i>{props.time}</i>
            </span>
            <br />
            <hr className="line" />
            <p className="my-2 texts fw-light">{props.description}</p>
            <a
              className="text-decoration-none texts text-dark"
              href={props.link}
            >
              <i className="fa-sharp-duotone fa-solid fa-link"></i> View Project
            </a>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export function Blogs(props) {
  return (
    <>
      <div className="container-repo">
        <div className="box slide-up">
          <h2 className="fw-bold text-wrap">
            {props.title}
            <span
              className={`badge mx-2 ${props.invisible} rounded-pill text-bg-success`}
            >
              Latest
            </span>
          </h2>
          <div>
            <p className="texts">by {props.username}</p>
            <p className="my-2 texts">Date Published: {props.date}</p>
            <hr className="line" />
            <p className="my-3 mb-4 fw-light texts">{props.content}</p>
            <button
              onClick={props.deleteBlog}
              type="submit"
              className={`btn ${props.delete} btn-danger`}
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
