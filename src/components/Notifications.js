import React from "react";

function Notifications() {
  return (
    <>
      <div
        style={{
          marginTop: "10vh",
          marginBottom: "4vh",
          height: "78vh",
        }}
        className="d-flex justify-content-center flex-column align-items-center"
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.22)",
            height: "78vh",
            width: "90%",
            borderRadius: "50px",
            overflow: "scroll",
          }}
          className="d-flex p-4 texts text-light flex-column"
        >
          <h1>(In progress - Placeholder Values)</h1>
          <p className="mt-2">
            <b>Aryan posted a Recommendation for you</b> - "Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Porro quos rem sit quasi
            eius repudiandae quas officia quam? Doloremque, beatae vitae facilis
            temporibus quam quia officia blanditiis vel non, fugit odit
            praesentium ullam dolorem nisi quibusdam error rem! Illum vel at,
            inventore omnis aperiam pariatur iure non totam asperiores
            excepturi?"{" "}
            <button
              type="button"
              className="btn btn-outline-success btn-sm texts"
            >
              Accept
            </button>{" "}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm texts"
            >
              Reject
            </button>
          </p>
          <hr />
          <p className="mt-2">
            <b>Aza posted a Recommendation for you</b> - "Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Porro quos rem sit quasi eius
            repudiandae quas officia quam? Doloremque, beatae vitae facilis
            temporibus quam quia officia blanditiis vel non, fugit odit
            praesentium ullam dolorem nisi quibusdam error rem! Illum vel at,
            inventore omnis aperiam pariatur iure non totam asperiores
            excepturi?"{" "}
            <button
              type="button"
              className="btn btn-outline-success btn-sm texts"
            >
              Accept
            </button>{" "}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm texts"
            >
              Reject
            </button>
          </p>
          <hr />
          <p className="mt-2">
            Chirag viewed your profile!{" "}
            <button type="button" className="btn btn-outline-info btn-sm texts">
              Chirag's Profile
            </button>{" "}
          </p>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Notifications;
