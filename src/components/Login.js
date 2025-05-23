import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // Add loading state

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    const userInfo = { email: data.email, password: data.password };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );
      if (res.data) {
        toast.success("Login successful!");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      toast.error("Error: Invalid username or password");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {loading ? (
              <div
                style={{ height: "20vh" }}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                <div className=" mb-3">
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

                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
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
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <p className="mt-3">
                  Not registered? <a href="/signup">Sign up</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
