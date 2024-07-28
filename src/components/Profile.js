import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../images/pehcharm-logo.png";
import Repo from "./Repo";

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
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div></div>
      {userData ? (
        <>
          {/* Modal */}
          <div
            className="modal fade"
            id="socialspage"
            tabIndex={-1}
            aria-labelledby="socialspageLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-center mt-3 p-5">
                  <ul className="example-2">
                    {userData.linkedin ? (
                      <li className="icon-content">
                        <a
                          href={userData.linkedin}
                          aria-label="LinkedIn"
                          data-social="linkedin"
                        >
                          <div className="filled" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-linkedin"
                            viewBox="0 0 16 16"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                        <div className="tooltip">LinkedIn</div>
                      </li>
                    ) : (
                      ""
                    )}
                    {userData.github ? (
                      <li className="icon-content">
                        <a
                          href={userData.github}
                          aria-label="GitHub"
                          data-social="github"
                        >
                          <div className="filled" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-github"
                            viewBox="0 0 16 16"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                        <div className="tooltip">GitHub</div>
                      </li>
                    ) : (
                      ""
                    )}
                    {userData.instagram ? (
                      <li className="icon-content">
                        <a
                          href={userData.instagram}
                          aria-label="Instagram"
                          data-social="instagram"
                        >
                          <div className="filled" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-instagram"
                            viewBox="0 0 16 16"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                        <div className="tooltip">Instagram</div>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column ">
            {/* Heading **************************************8 */}
            <div className="container mt-5 col-xxl-11 px-4 py-5">
              <div className="row flex-lg-row-reverse align-items-center py-3">
                <div className="col-9 col-sm-7 col-lg-5">
                  <img
                    src={logo}
                    className="d-block banner-img mx-lg-auto img-fluid"
                    alt="Bootstrap Themes"
                    width={400}
                    height={400}
                    loading="lazy"
                  />

                  {/* <div className="one-div"></div> */}
                </div>
                <div className=" col-lg-7">
                  <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                    {userData.name}
                  </h1>
                  <p className="fs-5">{userData.about}</p>
                  {/* Button trigger modal */}
                  {userData.linked || userData.instagram || userData.github ? (
                    <button
                      type="button"
                      className="btn mt-3 login-btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#socialspage"
                    >
                      Socials
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {/* Experience **************************************8 */}
            {userData.jobtitle ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">Current Position</h2>
                  <div className="card__border" />
                  <div className="card_title__container">
                    <span className="card_title">{userData.jobtitle}</span>
                    <p className="card_paragraph">
                      {userData.company} <br /> {userData.location}
                    </p>
                    <hr className="line" />
                    <p className="card-description">
                      {userData.jobdescription}
                    </p>
                    {userData.otherexperiences ? (
                      <>
                        <br />
                        <h4 className="text-white">
                          Other Relevant Experiences
                        </h4>
                        <hr className="line" />
                        <p className="card-description">
                          {userData.otherexperiences}
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* Education **************************************8 */}
            {userData.clgname ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">Education</h2>
                  <div className="card__border" />
                  <div className="card_title__container">
                    <span className="card_title">{userData.clgname}</span>
                    <p className="card_paragraph">
                      {userData.degree} <br /> GPA: {userData.gpa}
                    </p>
                    <hr className="line" />
                    <p className="card-description">{userData.activities}</p>
                  </div>
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
            {/* Skills **************************************8 */}
            {userData.skills ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">My Skills</h2>
                  <div className="card__border" />
                  <div className="card_title__container">
                    <hr className="line" />
                    <p className="card-description">{userData.skills}</p>
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
