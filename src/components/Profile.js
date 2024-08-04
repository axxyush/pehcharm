import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../images/pehcharm-logo.png";
import { Repo, Education, Experience } from "./Repo";
import Socials from "./Socials";
import Error from "./Error";

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get(`https://pehcharm-backend.onrender.com/user/${username}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
    if (userData && userData.github) {
      const github_username = userData.github.split("/").pop();

      axios
        .get(`https://api.github.com/users/${github_username}/repos`)
        .then((response) => {
          setRepos(response.data);
        })
        .catch((err) => {
          console.error("Error fetching GitHub repos:", err);
        });
    }
  }, [userData]);

  if (loading)
    return (
      <div className="home">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="home">
        <Error />
      </div>
    );

  return (
    <div>
      {userData ? (
        <>
          <div className="d-flex justify-content-center align-items-center flex-column ">
            {/* Heading **************************************8 */}
            <div className="container  mt-5 col-xxl-11 px-4 py-5">
              <div className="row flex-lg-row-reverse align-items-center py-3">
                <div className=" col-9 col-sm-7 col-lg-5">
                  {userData.linkedin ||
                  userData.instagram ||
                  userData.github ? (
                    <div className="slide-side d-block m-5">
                      <Socials
                        instagram={userData.instagram}
                        linkedin={userData.linkedin}
                        github={userData.github}
                      />
                    </div>
                  ) : (
                    <img
                      src={logo}
                      className="slide-side d-block banner-img mx-lg-auto img-fluid"
                      alt="Bootstrap Themes"
                      width={400}
                      height={400}
                      loading="lazy"
                    />
                  )}

                  {/* <div className="one-div"></div> */}
                </div>
                <div className="slide-up col-lg-7">
                  <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                    {userData.name}
                  </h1>
                  <p>
                    <i className="fa-solid fa-envelope mx-2"></i>
                    {userData.email}
                  </p>
                  <p className="fs-5">{userData.about}</p>
                </div>
              </div>
            </div>

            {/* Experience **************************************8 */}
            {userData.experience ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">My Experience</h2>
                  <div className="d-flex flex-wrap">
                    {userData.experience.map((job) => (
                      <div key={job._id} className="repos ">
                        <Experience
                          jobtitle={job.jobtitle}
                          company={job.company}
                          year={job.year}
                          location={job.location}
                          description={job.jobdescription}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* Education **************************************8 */}
            {userData.education ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">My Education</h2>
                  <div className="d-flex flex-wrap">
                    {userData.education.map((clg) => (
                      <div key={clg._id} className="repos ">
                        <Education
                          name={clg.clgname}
                          degree={clg.degree}
                          year={clg.year}
                          gpa={clg.gpa}
                          description={clg.activities}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* Skills **************************************8 */}
            {userData.skills ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">My Skills</h2>
                  <hr className="line" />
                  <ul className="tag">
                    {userData.skills.map((skill, index) => (
                      <li key={index} className="tag__name mx-2">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* Honors & Awards **************************************8 */}
            {userData.honors ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">Honors & Awards</h2>
                  <div className="card__border" />
                  <div className="card_title__container">
                    <hr className="line" />
                    <p className="card-description">{userData.honors}</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/*GitHub Repos*/}
            {userData.github && repos.length > 0 && (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">My GitHub Repos</h2>
                  <div className="d-flex flex-wrap">
                    {repos.map((repo) => (
                      <div key={repo.id} className="repos ">
                        <Repo
                          html_url={repo.html_url}
                          name={repo.name}
                          description={repo.description}
                          visibility={repo.private ? "private" : "public"}
                          pushed_at={repo.pushed_at.split("T")[0]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* 3D Model */}
            <div className="container m-3">
              <script
                type="module"
                src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js"
              ></script>
              <spline-viewer url="https://prod.spline.design/VDZ9QT0aB6BHadZV/scene.splinecode"></spline-viewer>
            </div>
          </div>
        </>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default Profile;
