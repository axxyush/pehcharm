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
      <div className="container-repo ">
        <div className="box slide-up">
          <span className="title my-4 text-wrap">{props.name}</span>
          <div>
            <strong className="my-2">GPA: {props.gpa}</strong>
            <span className="my-2">Graduation Year: </span>{" "}
            <span>{props.year}</span>
            <br />
            <span className="my-2">Degree: </span> <span>{props.degree}</span>
            <hr className="line" />
            <p className="my-2">
              <b>Description:</b> {props.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function Experience(props) {
  return (
    <>
      <div className="container-repo">
        <div className="box slide-up">
          <span className="title my-4 text-wrap">{props.jobtitle}</span>
          <div>
            <strong className="my-2"> {props.company}</strong>
            <span>{props.year}</span>
            <br />
            <span className="my-2">Location: </span>{" "}
            <span>{props.location}</span>
            <hr className="line" />
            <p className="my-2">
              <b>Description:</b> {props.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
