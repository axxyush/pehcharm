import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Repo, Education, Experience, Project } from "./Repo";
import Socials from "./Socials";
import Error from "./Error";
import pehcharm from "../images/pehcharm-logo.png";
import WriteRec from "./WriteRec";

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();
  // const [recs, setRecs] = useState([]);

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

  // const respond = async (recId, show) => {
  //   try {
  //     await axios.patch(
  //       `https://pehcharm-backend.onrender.com/user/${userData.username}/recommendation/${recId}`,
  //       { show }
  //     );
  //     fetchRecs();
  //   } catch (err) {
  //     console.error("Error responding to rec:", err);
  //   }
  // };

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

  const handleBlog = () => {
    navigate(`/${username}/blogs`);
  };

  // const fetchRecs = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://pehcharm-backend.onrender.com/user/${userData.username}/recommendations`
  //     );
  //     setRecs(res.data);
  //   } catch (err) {
  //     console.error("Error fetching recs:", err);
  //   }
  // };

  return (
    <div>
      {userData ? (
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
                <h1 className="display-1 fw-bold text-white">Hey!!</h1>
                <h1 className="display-5 fw-bold text-white mb-5">
                  I am {userData.name}
                </h1>
                <div className="d-flex text-light flex-row align-items-center">
                  <i
                    style={{
                      backgroundColor: "black",
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="fa-solid fa-envelope mx-2"
                  ></i>
                  {userData.email}
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm m-3"
                    data-bs-toggle="modal"
                    data-bs-target="#recModal"
                  >
                    Recommend Me!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <WriteRec username={userData.username} />

          {/* About ******************************************** */}
          <div className="about col-xxl-8 p-4 ">
            <div className="row flex-lg-row-reverse align-items-center p-3 text-light justify-content-center">
              <div className="col-10 col-sm-4 col-lg-4">
                <div className="slide-side d-block m-5 d-flex flex-column justify-content-center">
                  <Socials
                    instagram={userData.instagram}
                    linkedin={userData.linkedin}
                    github={userData.github}
                  />
                  <button
                    onClick={handleBlog}
                    className="btn-lg m-3 px-4 me-md-2 login-btn mt-5"
                    style={{ width: "90%", height: "50px" }}
                  >
                    My Blogs
                  </button>
                </div>
              </div>
              <div
                className="col-lg-6 d-flex text-light flex-column align-items-center p-4 justify-content-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.22)",
                  borderRadius: "40px",
                }}
              >
                <h1 className="display-2 fw-bold text-white">About Me</h1>
                <p className="fs-6">{userData.about}</p>
                <div className="d-flex text-light flex-row align-items-center"></div>
              </div>
            </div>
          </div>

          {/* Experience **************************************8 */}
          {userData.experience.length > 0 ? (
            <div
              style={{
                height: "fit-content",
                paddingBottom: "40px",
                backgroundColor: "black",
                padding: "5%",
              }}
              className=""
            >
              <h1 className="display-2 fw-bold text-white m-4 text-center">
                My Experiences
              </h1>
              <div className="">
                <div className="d-flex flex-wrap">
                  {userData.experience.map((job) => (
                    <div key={job._id}>
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

          {/* Projects **************************************8 */}
          {userData.project.length > 0 ? (
            <div
              style={{
                height: "fit-content",
                marginBottom: "40px",
                backgroundColor: "black",
                padding: "5%",
              }}
              className=""
            >
              <h1 className="display-2 fw-bold text-white m-4 text-center">
                My Projects
              </h1>
              <div
                style={{
                  background: `linear-gradient(45deg,rgb(11, 16, 40), rgb(155, 81, 219, .22),rgb(38, 12, 38),rgb(34, 10, 32),rgb(40, 13, 22),rgb(54, 16, 16))`,
                  borderRadius: "10px",
                  padding: "30px",
                }}
              >
                <div className="d-flex flex-wrap">
                  {userData.project.map((project) => (
                    <div key={project._id}>
                      <Project
                        title={project.title}
                        skills={project.skills}
                        time={project.time}
                        description={project.description}
                        link={project.link}
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
          {userData.skills.length > 0 ? (
            <div
              style={{ height: "fit-content", marginBottom: "40px" }}
              className="container home p-5"
            >
              <div className="">
                <h1 className="display-2 fw-bold text-white  text-center">
                  My Skills
                </h1>
                <hr className="line" />
                <ul className="tag mt-4">
                  {userData.skills.map((skill, index) => (
                    <li key={index} className="tag__name mx-2 ">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Education **************************************8 */}
          {userData.education.length > 0 ? (
            <div
              style={{
                backgroundColor: "black",
                padding: "30px",
              }}
              className=""
            >
              <div className="card-experience">
                <h1 className="display-2 fw-bold text-white  text-center mt-4">
                  My Education
                </h1>
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

          {/* Honors & Awards **************************************8 */}
          {userData.honors ? (
            <div className="p-5" style={{ backgroundColor: "black" }}>
              <div
                className=""
                style={{
                  background: `linear-gradient(45deg, #405de6, rgb(155, 81, 219), #b33ab4, #c135b4, #e1306c, #fd1f1f)`,
                  borderRadius: "10px",
                  padding: "40px",
                  marginBottom: "50px",
                }}
              >
                <h1 className="display-2 fw-bold text-white  text-center mt-4">
                  Honors & Awards
                </h1>
                <hr className="line" />
                <p className="text-light">{userData.honors}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {/*GitHub Repos*/}
          {userData.github && repos.length > 0 && (
            <div
              style={{ height: "fit-content", marginBottom: "50px" }}
              className="container"
            >
              <div className="card-experience">
                <h1 className="display-2 fw-bold text-white  text-center mt-5 mb-4">
                  GitHub Repositories
                </h1>
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
          <div className="container">
            <script
              type="module"
              src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js"
            ></script>
            <spline-viewer url="https://prod.spline.design/VDZ9QT0aB6BHadZV/scene.splinecode"></spline-viewer>
          </div>
        </>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default Profile;
