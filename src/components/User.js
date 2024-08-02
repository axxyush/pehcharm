import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function User() {
  const [authUser, setAuthUser] = useAuth();

  // Initialize form with default values, including experience as an array
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: authUser.email || "",
      name: authUser.name || "",
      username: authUser.username || "",
      about: authUser.about || "",
      education: authUser.education || [
        { clgname: "", degree: "", year: "", gpa: "", activities: "" },
      ],
      experience: authUser.experience || [
        {
          jobtitle: "",
          company: "",
          year: "",
          location: "",
          jobdescription: "",
        },
      ],
      linkedin: authUser.linkedin || "",
      instagram: authUser.instagram || "",
      github: authUser.github || "",
      skills: authUser.skills || [""],
      honors: authUser.honors || "",
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: skillsFields,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control,
    name: "skills",
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
            {experienceFields.map((field, index) => (
              <div key={field.id} className="experience-entry">
                <p>Job Title:</p>
                <input
                  placeholder="Job Title"
                  id={`experience[${index}].jobtitle`}
                  name={`experience[${index}].jobtitle`}
                  type="text"
                  className="input"
                  {...register(`experience[${index}].jobtitle`)}
                />
                <p>Company Name:</p>
                <input
                  placeholder="Company Name"
                  id={`experience[${index}].company`}
                  name={`experience[${index}].company`}
                  type="text"
                  className="input"
                  {...register(`experience[${index}].company`)}
                />
                <p>Enter time period:</p>
                <input
                  placeholder="Time Period"
                  id={`experience[${index}].year`}
                  name={`experience[${index}].year`}
                  type="text"
                  className="input"
                  {...register(`experience[${index}].year`)}
                />
                <p>Location:</p>
                <input
                  placeholder="Location"
                  id={`experience[${index}].location`}
                  name={`experience[${index}].location`}
                  type="text"
                  className="input"
                  {...register(`experience[${index}].location`)}
                />
                <p>Job Description:</p>
                <textarea
                  placeholder="Job Description"
                  id={`experience[${index}].jobdescription`}
                  name={`experience[${index}].jobdescription`}
                  className="input"
                  {...register(`experience[${index}].jobdescription`)}
                  rows={5}
                />
                <button
                  className="btn btn-danger m-2"
                  type="button"
                  onClick={() => removeExperience(index)}
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              className="login-btn m-2"
              onClick={() =>
                appendExperience({
                  jobtitle: "",
                  company: "",
                  location: "",
                  jobdescription: "",
                })
              }
            >
              Add Experience
            </button>
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>

        {/* Update Education Section */}
        <div className="container-form">
          <div className="heading">Update Education</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {educationFields.map((field, index) => (
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
                <p>Graduation Year:</p>
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
                  onClick={() => removeEducation(index)}
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              className="login-btn m-2"
              onClick={() =>
                appendEducation({
                  clgname: "",
                  degree: "",
                  year: "",
                  gpa: "",
                  activities: "",
                })
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

        {/* Update Skills Section */}
        <div className="container-form">
          <div className="heading">Update Skills</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {skillsFields.map((field, index) => (
              <div key={field.id} className="skill-entry">
                <p>Skill:</p>
                <input
                  placeholder="Skill"
                  id={`skills[${index}]`}
                  name={`skills[${index}]`}
                  type="text"
                  className="input"
                  {...register(`skills[${index}]`)}
                />
                <button
                  className="btn btn-danger m-2"
                  type="button"
                  onClick={() => removeSkills(index)}
                >
                  Remove Skill
                </button>
              </div>
            ))}
            <button
              type="button"
              className="login-btn m-2"
              onClick={() => appendSkills("")}
            >
              Add Skill
            </button>
            <input value="Update" type="submit" className="login-button" />
          </form>
        </div>

        {/* Update Other Information Section */}
        <div className="container-form">
          <div className="heading">Update Honors & Awards</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
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
