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
  const [imageUrl, setImageUrl] = useState(null);
  const today = new Date().toJSON().slice(0, 10);
  const [loading, setLoading] = useState(false); // Add loading state

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const formData = {
      ...data,
      username: authUser.username,
      imageUrl: imageUrl || "",
    };

    const blogInfo = {
      username: formData.username,
      content: formData.content,
      date: formData.date,
      imageUrl: formData.imageUrl,
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Feature coming soon!!</h2>
        <div className="container-form">
          <div className="heading">Upload Blog {authUser.username}</div>
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

              <p>Image:</p>
              <input
                id="image"
                name="image"
                type="file"
                className="input"
                accept="image/*"
                //   {...register("image")}
                onChange={handleImageChange} // Handle file input change
              />
              {errors.image && (
                <span className="text-danger">Only images are allowed</span>
              )}
              {imageUrl && (
                <div>
                  <p>Preview:</p>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      height: "200px",
                      border: "2px solid black",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                </div>
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
                value="Create Blog"
                type="submit"
                className="login-button"
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default AddBlog;
