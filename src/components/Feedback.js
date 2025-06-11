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
        <h1 className="display-6 fw-bold text-white">Replaced Lines - </h1>
        <p>{props.lines}</p>

        <h1 className="display-6 fw-bold text-white">Rating</h1>
        <p>
          <strong>{props.rating}/10</strong>
        </p>

        <h1 className="display-6 fw-bold text-white">
          Missing Skills & Suggested Courses
        </h1>
        {Array.isArray(props.missing_skills) &&
          props.missing_skills.map((item, i) => (
            <div key={`skill-${i}`} className="mb-3">
              <p>
                <strong>Skill:</strong> {item.skill}
              </p>
              <p>
                <strong>Reason:</strong> {item.reason}
              </p>
              <p>
                <strong>Recommended Courses:</strong>
              </p>
              <ul>
                {item.courses.map((course, ci) => (
                  <li key={`course-${i}-${ci}`}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </>
  );
}

export default Feedback;
