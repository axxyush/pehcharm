import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Search() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authUser] = useAuth();

  const onSubmit = async (data) => {
    if (!authUser?.username) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/user/${data.username}`
      );
      console.log(response.data.username);

      if (response.data) {
        if (
          authUser?.username &&
          response.data.username !== authUser.username
        ) {
          try {
            await axios.post(
              `http://localhost:4001/user/${response.data.username}/viewers`,
              { viewer: authUser.username }
            );
          } catch (viewErr) {
            console.warn("Could not record viewer:", viewErr);
          }
        }
        navigate(`/${response.data.username}`);
        toast.success("User found and redirected successfully!");
      } else {
        toast.error("User not found. Enter correct username (Case sensitive)");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(
          "Error: User not found. Enter correct username (Case sensitive)"
        );
      } else {
        toast.error("Error: Something went wrong. Please try again.");
      }
      console.error("Search Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar-container mx-3">
      <div className="search-bar">
        <span className="search-icon">
          <svg
            height={20}
            width={20}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.53,20.47l-5-5a8,8,0,1,0-1.06,1.06l5,5a.75.75,0,0,0,1.06-1.06ZM4,10A6,6,0,1,1,10,16,6,6,0,0,1,4,10Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex">
          <input
            placeholder="Search by username"
            type="text"
            {...register("username", { required: true })}
            disabled={loading}
          />
          <button className="filter-button" type="submit" disabled={loading}>
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
