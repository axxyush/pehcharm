import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState(null);

  const onSubmit = (data) => {
    // Append image URL to the form data
    const formData = {
      ...data,
      imageUrl: imageUrl || "",
    };
    console.log(formData);
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
          <div className="heading">Upload Blog</div>
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
                <img src={imageUrl} alt="Preview" style={{ height: "200px" }} />
              </div>
            )}

            <p>Content:</p>
            <textarea
              placeholder="Content"
              id="content"
              name="content"
              className="input"
              {...register("content")}
              rows={5}
            />
            {errors.content && (
              <span className="text-danger">This field is required</span>
            )}
            <input value="Create Blog" type="submit" className="login-button" />
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
