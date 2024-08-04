import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Blogs } from "./Repo";

function Blog() {
  const { username } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch blog data from the backend
    axios
      .get(`https://pehcharm-backend.onrender.com/blogs/${username}/blogs`)
      .then((response) => {
        setBlogData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error");
        setLoading(false);
      });
  }, [username]);

  return (
    <>
      {loading ? (
        <div className="home">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div style={{ marginTop: "100px" }}>
            {/* Blogs **************************************8 */}

            {blogData.length > 0 ? (
              <div
                style={{ height: "fit-content", marginBottom: "40px" }}
                className="container"
              >
                <div className="card-experience">
                  <h2 className="text-white">My Blogs</h2>
                  <div className="d-flex flex-wrap flex-column">
                    {blogData
                      .slice()
                      .reverse()
                      .map((blog, index) => (
                        <div key={blog._id} className="repos ">
                          <Blogs
                            title={blog.title}
                            invisible={index === 0 ? "" : "invisible"}
                            date={blog.date}
                            username={blog.username}
                            content={blog.content}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{ height: "70vh" }}
                  className="container d-flex justify-content-center align-items-center"
                >
                  <div
                    style={{
                      height: "50%",
                      width: "60%",
                      borderRadius: "20px",
                    }}
                    className="d-flex slide-up p-5 justify-content-center align-items-center bg-danger-subtle lead"
                  >
                    I haven't written any blogs yet!
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Blog;
