import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function User() {
  const [authUser] = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: authUser.email || "",
      name: authUser.name || "",
      username: authUser.username || "",
      about: authUser.about || "",
      clgname: authUser.clgname || "",
      degree: authUser.degree || "",
      gpa: authUser.gpa || "",
      activities: authUser.activities || "",
      linkedin: authUser.linkedin || "",
      instagram: authUser.instagram || "",
      x: authUser.x || "",
      github: authUser.github || "",
      jobtitle: authUser.jobtitle || "",
      company: authUser.company || "",
      location: authUser.location || "",
      jobdescription: authUser.jobdescription || "",
      otherexperiences: authUser.otherexperiences || "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
        name: data.name,
        username: data.username,
        about: data.about,
        clgname: data.clgname,
        degree: data.degree,
        gpa: data.gpa,
        activities: data.activities,
        linkedin: data.linkedin,
        instagram: data.instagram,
        x: data.x,
        github: data.github,
        jobtitle: data.jobtitle,
        company: data.company,
        location: data.location,
        jobdescription: data.jobdescription,
        otherexperiences: data.otherexperiences,
      };

      const response = await axios.post(
        "http://localhost:4001/user/update",
        userInfo
      );

      if (response.data) {
        console.log(response.data);
        toast.success("User information updated successfully!");
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        setTimeout(() => {
          window.location.reload(); // Reload the page after update
        }, 1000);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Error: Invalid data provided");
      } else {
        toast.error("Error: Something went wrong. Please try again.");
      }
      console.error("Update Error: ", err);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="container-form">
          <div className="heading">Update Profile</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <p>Email:</p>
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              className="input"
              {...register("email")}
            />
            <p>Name:</p>
            <input
              placeholder="Name"
              id="name"
              name="name"
              type="text"
              className="input"
              {...register("name")}
            />
            <p>Username:</p>
            <input
              placeholder="Username"
              id="username"
              name="username"
              type="text"
              className="input"
              {...register("username")}
            />
            <p>About:</p>
            <textarea
              placeholder="About"
              id="about"
              name="about"
              className="input"
              {...register("about")}
              rows={5}
            />
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>
        {/* Update Experience Section ******************************/}
        <div className="container-form">
          <div className="heading">Update Experience</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <p>Current Job Title:</p>
            <input
              placeholder="Current Job Title"
              id="jobtitle"
              name="jobtitle"
              type="text"
              className="input"
              {...register("jobtitle")}
            />
            <p>Company Name:</p>
            <input
              placeholder="Company Name"
              id="company"
              name="company"
              type="text"
              className="input"
              {...register("company")}
            />
            <p>Location:</p>
            <input
              placeholder="Location"
              id="location"
              name="location"
              type="text"
              className="input"
              {...register("location")}
            />
            <p>Job Description:</p>
            <textarea
              placeholder="Job Description"
              id="jobdescription"
              name="jobdescription"
              className="input"
              {...register("jobdescription")}
              rows={5}
            />
            <p>Explain other relevant Experiences briefly:</p>
            <textarea
              placeholder="Other Experiences"
              id="otherexperiences"
              name="otherexperiences"
              className="input"
              {...register("otherexperiences")}
              rows={5}
            />
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>

        {/* Update Education Section ******************************/}
        <div className="container-form">
          <div className="heading">Update Education</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <p>College Name:</p>
            <input
              placeholder="College name"
              id="clgname"
              name="clgname"
              type="text"
              className="input"
              {...register("clgname")}
            />
            <p>Degree:</p>
            <input
              placeholder="Degree"
              id="degree"
              name="degree"
              type="text"
              className="input"
              {...register("degree")}
            />
            <p>GPA:</p>
            <input
              placeholder="GPA"
              id="gpa"
              name="gpa"
              type="text"
              className="input"
              {...register("gpa")}
            />
            <p>Activities:</p>
            <textarea
              placeholder="Activities"
              id="activities"
              name="activities"
              className="input"
              {...register("activities")}
              rows={5}
            />
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>

        {/* Socials***************************************************** */}

        <div className="container-form">
          <div className="heading">Update Socials</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <p>Link to LinkedIn:</p>
            <input
              placeholder="LinkedIn"
              id="linkedin"
              name="linkedin"
              type="text"
              className="input"
              {...register("linkedin")}
            />
            <p>Link to Instagram:</p>
            <input
              placeholder="Instagram"
              id="instagram"
              name="instagram"
              type="text"
              className="input"
              {...register("instagram")}
            />
            <p>Link to GitHub:</p>
            <input
              placeholder="GitHub"
              id="github"
              name="github"
              type="text"
              className="input"
              {...register("github")}
            />

            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>
      </div>
    </>
  );
}

export default User;
