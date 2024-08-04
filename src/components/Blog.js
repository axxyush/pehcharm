import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Blog() {
  const { username } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch blog data from the backend
    axios
      .get(`https://pehcharm-backend.onrender.com/user/${username}/blogs`)
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
      <div className="home">
        {loading ? (
          <div className="home">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div>Find your blogs here</div>
            <div>{blogData}</div>
          </>
        )}
      </div>
    </>
  );
}

export default Blog;
