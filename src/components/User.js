import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function User() {
  const [authUser, setAuthUser] = useAuth();

  // Initialize form with default values, including education as an array
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: authUser.email || "",
      name: authUser.name || "",
      username: authUser.username || "",
      about: authUser.about || "",
      education: authUser.education || [
        { clgname: "", degree: "", year: "", gpa: "", activities: "" },
      ],
      linkedin: authUser.linkedin || "",
      instagram: authUser.instagram || "",
      github: authUser.github || "",
      jobtitle: authUser.jobtitle || "",
      company: authUser.company || "",
      location: authUser.location || "",
      jobdescription: authUser.jobdescription || "",
      otherexperiences: authUser.otherexperiences || "",
      skills: authUser.skills || "",
      honors: authUser.honors || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://pehcharm-backend.onrender.com/user/update",
        data
      );

      if (response.data) {
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        toast.success("User information updated successfully!");
        // Update the authUser context with the latest data
        setAuthUser(response.data.user);

        // Reset form with the updated data
        reset(response.data.user);
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
        {/* Portfolio Link */}
        <div className="card-link">
          <div className="img" />
          <div className="textBox">
            <div className="textContent">
              <p className="h1">This is the link to your portfolio</p>
            </div>
            <a
              href={`https://pehcharm.vercel.app/${authUser.username}`}
              className="a"
            >
              https://pehcharm.vercel.app/{authUser.username}
            </a>
          </div>
        </div>

        {/* Update Profile Section */}
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

        {/* Update Experience Section */}
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

        {/* Update Education Section */}
        <div className="container-form">
          <div className="heading">Update Education</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {fields.map((field, index) => (
              <div key={field.id} className="education-entry">
                <p>College Name:</p>
                <input
                  placeholder="College name"
                  id={`education[${index}].clgname`}
                  name={`education[${index}].clgname`}
                  type="text"
                  className="input"
                  {...register(`education[${index}].clgname`)}
                />
                <p>Degree:</p>
                <input
                  placeholder="Degree"
                  id={`education[${index}].degree`}
                  name={`education[${index}].degree`}
                  type="text"
                  className="input"
                  {...register(`education[${index}].degree`)}
                />
                <p>Gradutaion Year:</p>
                <input
                  placeholder="Year"
                  id={`education[${index}].year`}
                  name={`education[${index}].year`}
                  type="text"
                  className="input"
                  {...register(`education[${index}].year`)}
                />
                <p>GPA:</p>
                <input
                  placeholder="GPA"
                  id={`education[${index}].gpa`}
                  name={`education[${index}].gpa`}
                  type="text"
                  className="input"
                  {...register(`education[${index}].gpa`)}
                />
                <p>Activities:</p>
                <textarea
                  placeholder="Activities"
                  id={`education[${index}].activities`}
                  name={`education[${index}].activities`}
                  className="input"
                  {...register(`education[${index}].activities`)}
                  rows={5}
                />
                <button
                  className="btn btn-danger m-2"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              className="login-btn m-2"
              onClick={() =>
                append({ clgname: "", degree: "", gpa: "", activities: "" })
              }
            >
              Add Education
            </button>
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>

        {/* Update Socials Section */}
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

        {/* Update Other Information Section */}
        <div className="container-form">
          <div className="heading">Update Other Information</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <p>Briefly explain your skills:</p>
            <textarea
              placeholder="Skills"
              id="skills"
              name="skills"
              className="input"
              {...register("skills")}
              rows={5}
            />
            <p>Briefly explain your Honors & Awards:</p>
            <textarea
              placeholder="Honors & Awards"
              id="honors"
              name="honors"
              className="input"
              {...register("honors")}
              rows={5}
            />
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>
      </div>
    </>
  );
}

export default User;
