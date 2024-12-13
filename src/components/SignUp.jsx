import React, { useReducer, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Initial state for the form
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobileNumber: "",
  age: "",
  gender: "",
  skills: "",
  about: "",
  error: "",
};

// Reducer function to manage the form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "RESET_FORM":
      return initialState;

    case "UPDATE_SKILLS":
      return { ...state, skills: action.skills };
    default:
      throw new Error("Unknown action type");
  }
};

const SignUp = () => {
  const [state, dispatchForm] = useReducer(formReducer, initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong! from login");
      console.log("Login " + err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedSkills = state.skills
      .split(",") // Split the string into an array
      .map((skill) => skill.trim()) // Remove leading/trailing whitespace from each skill
      .filter((skill) => skill); // Remove empty values (in case of trailing commas)

    console.log(state);
    console.log(processedSkills);
    console.log(typeof processedSkills);

    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.password ||
      !state.confirmPassword ||
      !state.mobileNumber ||
      processedSkills.length <= 0
    ) {
      dispatchForm({
        type: "SET_ERROR",
        error: "Please fill in all required fields",
      });
    } else if (state.password !== state.confirmPassword) {
      dispatchForm({ type: "SET_ERROR", error: "Passwords do not match" });
    } else {
      console.log("Form Submitted:", state);
      dispatchForm({ type: "SET_ERROR", error: "" });
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          mobileNumber: state.mobileNumber,
          age: state.age,
          gender: state.gender,
          skills: processedSkills,
          about: state.about,
        },
        { withCredentials: true }
      );

      console.log(res.data);
      dispatch(addUser(res.data?.data));

      toast.success(res.data.message, {
        position: "top-center",
      });
      return navigate("/");
    } catch (err) {
      console.log(err);

      dispatchForm({
        type: "SET_ERROR",
        error: err?.response?.data || "Something went wrong! from login",
      });
      // setError(err?.response?.data || "Something went wrong! from login");
      console.log("signup " + err);
    }
  };

  const handleReset = () => {
    dispatchForm({ type: "RESET_FORM" });
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">User Form</h2>

          {/* First Name */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              name="firstName"
              value={state.firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </label>

          {/* Last Name */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              name="lastName"
              value={state.lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </label>

          {/* Email */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              name="email"
              value={state.email}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </label>

          {/* Password */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              name="password"
              value={state.password}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </label>

          {/* Confirm Password */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </label>

          {/* Mobile Number */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Mobile Number</span>
            </div>
            <input
              type="number"
              name="mobileNumber"
              value={state.mobileNumber}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
              placeholder="Enter a 10-digit number"
            />
          </label>

          {/* Age */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="number"
              name="age"
              value={state.age}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
            />
          </label>

          {/* Gender */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              name="gender"
              value={state.gender}
              className="select select-bordered w-full max-w-xs"
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* Skills */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Skills (comma separated)</span>
            </div>
            <input
              type="text"
              name="skills"
              value={state.skills}
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
              placeholder="e.g., HTML, CSS, JavaScript"
            />
          </label>

          {/* About */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <textarea
              name="about"
              value={state.about}
              className="textarea textarea-bordered w-full max-w-xs"
              onChange={handleInputChange}
            ></textarea>
          </label>

          {/* Error */}
          {state.error && <p className="text-red-500">{state.error}</p>}

          <div className="text-center">
            <h1>
              Already have account?{" "}
              <Link className="text-xl underline text-white" to="/login">
                Login
              </Link>
            </h1>
          </div>
          {/* Actions */}
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
