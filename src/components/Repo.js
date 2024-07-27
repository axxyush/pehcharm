import React from "react";
import { Link } from "react-router-dom";

function Repo(props) {
  return (
    <>
      <div className="container-repo">
        <div className="box">
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

export default Repo;
