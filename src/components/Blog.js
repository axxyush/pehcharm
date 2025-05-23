import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Blogs } from "./Repo";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Blog() {
  const { username } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser] = useAuth();
  useEffect(() => {
    // Fetch blog data from the backend
    axios
      .get(`http://localhost:4001/blogs/${username}/blogs`)
      .then((response) => {
        setBlogData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error");
        setLoading(false);
      });
  }, [username]);

  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4001/blogs/${id}`);
      setBlogData((prevBlogData) =>
        prevBlogData.filter((blog) => blog._id !== id)
      );
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Some error occurred");
    } finally {
      setLoading(false);
    }
  };

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
                  <h1 className="display-2 fw-bold text-white  text-center mt-4">
                    My Blogs
                  </h1>
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
                            delete={
                              authUser && authUser.username === username
                                ? ""
                                : "invisible"
                            }
                            deleteBlog={() => deleteBlog(blog._id)}
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
