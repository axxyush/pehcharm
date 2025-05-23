import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function AddBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authUser] = useAuth();
  const today = new Date().toJSON().slice(0, 10);
  const [loading, setLoading] = useState(false); // Add loading state

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const formData = {
      ...data,
      username: authUser.username,
    };

    const blogInfo = {
      username: formData.username,
      content: formData.content,
      date: formData.date,
      title: formData.title,
    };

    try {
      const res = await axios.post(
        "https://pehcharm-backend.onrender.com/blogs/addblog",
        blogInfo
      );
      if (res.data) {
        toast.success("Blog Posted Successfully!");
        localStorage.setItem("Blogs", JSON.stringify(res.data.blog));
        setTimeout(() => {
          window.location.reload(); // Reload the page after update
        }, 1000);
      }
    } catch (err) {
      toast.error("Some error occurred");
    } finally {
      setLoading(false); // Stop loading
    }

    console.log(blogInfo);
  };

  return (
    <>
      <div
        className="container mb-5 d-flex justify-content-center"
        style={{ marginTop: "15vh" }}
      >
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Upload Blog
            </h1>
            {loading ? (
              <div className="home">
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <p>Title:</p>
                <input
                  placeholder="Title"
                  id="title"
                  name="title"
                  type="input"
                  className="input"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-danger">This field is required</span>
                )}
                <p>Date:</p>
                <input
                  placeholder="Date"
                  id="date"
                  name="date"
                  type="date"
                  className="input"
                  defaultValue={today}
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <span className="text-danger">This field is required</span>
                )}

                <p>Content:</p>
                <textarea
                  placeholder="Content"
                  id="content"
                  name="content"
                  className="input"
                  {...register("content", { required: true })}
                  rows={5}
                />
                {errors.content && (
                  <span className="text-danger">This field is required</span>
                )}
                <input
                  value="Upload"
                  type="submit"
                  className="btn btn-success my-2"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
