import React from "react";

function Feedback(props) {
  return (
    <>
      <div
        className="d-flex text-light flex-column mb-5 p-5 container"
        style={{
          backgroundColor: "rgba(38, 16, 16, 0.33)",
          borderRadius: "40px",
          border: "3px solid #ff6ec7",
        }}
        id="feedback"
      >
        <h1 className="display-2 fw-bold text-white text-center m-2 gradient-text">
          AI Feedback
        </h1>

        <div className="modal-body">
          <pre style={{ whiteSpace: "pre-wrap" }}>{props.feedback}</pre>
        </div>
      </div>
    </>
  );
}

export default Feedback;
