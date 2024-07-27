import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
    };
    await axios
      .post("https://pehcharm-backend.onrender.com/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Sign up successfull");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error : User already exists");
        }
      });
  };
  return (
    <>
      <div
        style={{ height: "85vh" }}
        className="container signup-form d-flex justify-content-center align-items-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-danger">This field is required</span>
            )}
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername1" className="form-label">
              User Name
            </label>
            <input
              type="username"
              className="form-control"
              aria-describedby="username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-danger">This field is required</span>
            )}
            <div className="form-text text-danger">
              Please remember your password. Due to security reasons you WON'T
              be able to see or change it again!
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
          <p className="mt-3">
            Have account?{" "}
            <Link data-bs-toggle="modal" data-bs-target="#exampleModal" to="/">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
