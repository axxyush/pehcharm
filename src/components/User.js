import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function User() {
  const [authUser, setAuthUser] = useAuth();
  const [recs, setRecs] = React.useState(authUser.recommendation || []);

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
      project: authUser.project || [
        {
          title: "",
          skills: "",
          time: "",
          link: "",
          description: "",
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
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "project",
  });

  const {
    fields: skillsFields,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const updateRec = async (recId, show) => {
    try {
      await axios.patch(
        `https://pehcharm-backend.onrender.com/recommendations/${recId}`,
        { show }
      );
      setRecs((rs) => rs.map((r) => (r._id === recId ? { ...r, show } : r)));
    } catch (err) {
      console.error(err);
    }
  };

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

        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Update Profile
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form texts text-light"
            >
              <p>
                Email:{" "}
                <input
                  placeholder="E-mail"
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  {...register("email")}
                />
              </p>

              <p>
                Name:{" "}
                <input
                  placeholder="Name"
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  {...register("name")}
                />
              </p>

              <p>
                Username:{" "}
                <input
                  placeholder="Username"
                  id="username"
                  name="username"
                  type="text"
                  className="input"
                  {...register("username")}
                />
              </p>

              <p>
                About:{" "}
                <textarea
                  placeholder="About"
                  id="about"
                  name="about"
                  className="input"
                  {...register("about")}
                  rows={5}
                />
              </p>

              <input value="Update" type="submit" className="btn btn-success" />
            </form>
          </div>
        </div>

        {/* Update Experience Section */}
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Update Experience
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form texts text-light"
            >
              {experienceFields.map((field, index) => (
                <div key={field.id} className="">
                  <p>
                    Job Title:{" "}
                    <input
                      placeholder="Job Title"
                      id={`experience[${index}].jobtitle`}
                      name={`experience[${index}].jobtitle`}
                      type="text"
                      className="input"
                      {...register(`experience[${index}].jobtitle`)}
                    />
                  </p>

                  <p>
                    Company Name:{" "}
                    <input
                      placeholder="Company Name"
                      id={`experience[${index}].company`}
                      name={`experience[${index}].company`}
                      type="text"
                      className="input"
                      {...register(`experience[${index}].company`)}
                    />
                  </p>

                  <p>
                    Enter time period:{" "}
                    <input
                      placeholder="Time Period"
                      id={`experience[${index}].year`}
                      name={`experience[${index}].year`}
                      type="text"
                      className="input"
                      {...register(`experience[${index}].year`)}
                    />
                  </p>

                  <p>
                    Location:{" "}
                    <input
                      placeholder="Location"
                      id={`experience[${index}].location`}
                      name={`experience[${index}].location`}
                      type="text"
                      className="input"
                      {...register(`experience[${index}].location`)}
                    />
                  </p>

                  <p>
                    Job Description:{" "}
                    <textarea
                      placeholder="Job Description"
                      id={`experience[${index}].jobdescription`}
                      name={`experience[${index}].jobdescription`}
                      className="input"
                      {...register(`experience[${index}].jobdescription`)}
                      rows={5}
                    />
                  </p>

                  <button
                    className="btn btn-outline-danger mb-2"
                    type="button"
                    onClick={() => removeExperience(index)}
                  >
                    Remove Experience &uarr;
                  </button>
                  <hr />
                </div>
              ))}
              <button
                type="button"
                style={{ width: "fit-content" }}
                className="btn btn-outline-warning my-2"
                onClick={() =>
                  appendExperience({
                    jobtitle: "",
                    company: "",
                    location: "",
                    jobdescription: "",
                  })
                }
              >
                + Add Experience
              </button>
              <input
                value="Update"
                type="submit"
                className="btn btn-success my-2"
              />
            </form>
          </div>
        </div>

        {/* Update Projects Section */}
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Update Projects
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form texts text-light"
            >
              {projectFields.map((field, index) => (
                <div key={field.id} className="">
                  <p>
                    Project Title:{" "}
                    <input
                      placeholder="Project Title"
                      id={`project[${index}].title`}
                      name={`project[${index}].title`}
                      type="text"
                      className="input"
                      {...register(`project[${index}].title`)}
                    />
                  </p>

                  <p>
                    Skills:{" "}
                    <input
                      placeholder="Skills"
                      id={`project[${index}].skills`}
                      name={`project[${index}].skills`}
                      type="text"
                      className="input"
                      {...register(`project[${index}].skills`)}
                    />
                  </p>

                  <p>
                    Enter time period:{" "}
                    <input
                      placeholder="Time Period"
                      id={`project[${index}].time`}
                      name={`project[${index}].time`}
                      type="text"
                      className="input"
                      {...register(`project[${index}].time`)}
                    />
                  </p>

                  <p>
                    Link:{" "}
                    <input
                      placeholder="Link"
                      id={`project[${index}].link`}
                      name={`project[${index}].link`}
                      type="text"
                      className="input"
                      {...register(`project[${index}].link`)}
                    />
                  </p>

                  <p>
                    Description:{" "}
                    <textarea
                      placeholder="Description"
                      id={`project[${index}].description`}
                      name={`project[${index}].description`}
                      className="input"
                      {...register(`project[${index}].description`)}
                      rows={5}
                    />
                  </p>

                  <button
                    className="btn btn-outline-danger mb-2"
                    type="button"
                    onClick={() => removeProject(index)}
                  >
                    Remove Project &uarr;
                  </button>
                  <hr />
                </div>
              ))}
              <button
                type="button"
                style={{ width: "fit-content" }}
                className="btn btn-outline-warning my-2"
                onClick={() =>
                  appendProject({
                    title: "",
                    skills: "",
                    time: "",
                    link: "",
                    description: "",
                  })
                }
              >
                + Add Project
              </button>
              <input
                value="Update"
                type="submit"
                className="btn btn-success my-2"
              />
            </form>
          </div>
        </div>

        {/* Update Education Section */}
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Update Education
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form texts text-light"
            >
              {educationFields.map((field, index) => (
                <div key={field.id} className="">
                  <p>
                    College Name:{" "}
                    <input
                      placeholder="College name"
                      id={`education[${index}].clgname`}
                      name={`education[${index}].clgname`}
                      type="text"
                      className="input"
                      {...register(`education[${index}].clgname`)}
                    />
                  </p>

                  <p>
                    Degree:{" "}
                    <input
                      placeholder="Degree"
                      id={`education[${index}].degree`}
                      name={`education[${index}].degree`}
                      type="text"
                      className="input"
                      {...register(`education[${index}].degree`)}
                    />
                  </p>

                  <p>
                    Graduation Year:{" "}
                    <input
                      placeholder="Year"
                      id={`education[${index}].year`}
                      name={`education[${index}].year`}
                      type="text"
                      className="input"
                      {...register(`education[${index}].year`)}
                    />
                  </p>

                  <p>
                    GPA:{" "}
                    <input
                      placeholder="GPA"
                      id={`education[${index}].gpa`}
                      name={`education[${index}].gpa`}
                      type="text"
                      className="input"
                      {...register(`education[${index}].gpa`)}
                    />
                  </p>

                  <p>
                    Activities:{" "}
                    <textarea
                      placeholder="Activities"
                      id={`education[${index}].activities`}
                      name={`education[${index}].activities`}
                      className="input"
                      {...register(`education[${index}].activities`)}
                      rows={5}
                    />
                  </p>

                  <button
                    className="btn btn-outline-danger mb-2"
                    type="button"
                    onClick={() => removeEducation(index)}
                  >
                    Remove Education &uarr;
                  </button>
                  <hr />
                </div>
              ))}
              <button
                type="button"
                style={{ width: "fit-content" }}
                className="btn btn-outline-warning my-2"
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
                + Add Education
              </button>
              <input
                value="Update"
                type="submit"
                className="btn btn-success my-2"
              />
            </form>
          </div>
        </div>

        {/* Update Socials Section */}
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Update Socials
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form texts text-light"
            >
              <p>
                LinkedIn URL:{" "}
                <input
                  placeholder="LinkedIn"
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  className="input"
                  {...register("linkedin")}
                />
              </p>

              <p>
                Instagram URL:{" "}
                <input
                  placeholder="Instagram"
                  id="instagram"
                  name="instagram"
                  type="text"
                  className="input"
                  {...register("instagram")}
                />
              </p>

              <p>
                GitHub URL:{" "}
                <input
                  placeholder="GitHub"
                  id="github"
                  name="github"
                  type="text"
                  className="input"
                  {...register("github")}
                />
              </p>

              <input
                value="Update"
                type="submit"
                className="btn btn-success my-2"
              />
            </form>
          </div>
        </div>

        {/* Update Skills Section */}
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Update Skills
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form texts text-light"
            >
              {skillsFields.map((field, index) => (
                <div key={field.id} className="skill-entry">
                  <p>
                    {index + 1}.{" "}
                    <input
                      style={{ width: "fit-content" }}
                      placeholder="Skill"
                      id={`skills[${index}]`}
                      name={`skills[${index}]`}
                      type="text"
                      className="input"
                      {...register(`skills[${index}]`)}
                    />
                    <button
                      className="btn btn-outline-danger m-2"
                      type="button"
                      onClick={() => removeSkills(index)}
                    >
                      Remove Skill
                    </button>
                  </p>
                </div>
              ))}
              <button
                type="button"
                style={{ width: "fit-content" }}
                className="btn btn-outline-warning my-2"
                onClick={() => appendSkills("")}
              >
                + Add Skill
              </button>
              <input
                value="Update"
                type="submit"
                className="btn btn-success my-2"
              />
            </form>
          </div>

          {/* Update Other Information Section */}
          <div style={{ width: "100%" }} className="container-repo">
            <div style={{ width: "100%" }} className="box p-4">
              <h1 className="display-10 fw-bold text-white  text-center">
                Update Honors & Awards
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="form texts">
                <p>
                  Briefly explain your Honors & Awards:{" "}
                  <textarea
                    placeholder="Honors & Awards"
                    id="honors"
                    name="honors"
                    className="input"
                    {...register("honors")}
                    rows={5}
                  />
                </p>

                <input
                  value="Update"
                  type="submit"
                  className="btn btn-success my-2"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ width: "100%" }} className="container-repo">
          <div style={{ width: "100%" }} className="box p-4">
            <h1 className="display-10 fw-bold text-white  text-center">
              Recommendations
            </h1>
            {recs.length === 0 && <p>No recommendations yet.</p>}

            {recs.map((r) => (
              <div key={r._id} className="mb-4">
                <b>{r.fromUser}</b>
                <i> Visible – {r.show ? "Yes" : "No"}</i>
                <i> Date – {new Date(r.date).toLocaleDateString()}</i>
                <p>{r.content}</p>
                <div>
                  <div>
                    <button
                      onClick={() => updateRec(r._id, true)}
                      className="btn btn-sm btn-success me-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateRec(r._id, false)}
                      className="btn btn-sm btn-danger"
                    >
                      Reject
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
