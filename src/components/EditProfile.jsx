import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills.join(", "));
  // const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const validateFields = () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!age || isNaN(age) || age <= 0) {
      setError("Age must be a valid number greater than 0");
      return false;
    }
    if (
      !photoUrl.trim() ||
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(photoUrl)
    ) {
      setError("Please provide a valid image URL");
      return false;
    }
    if (!gender.trim()) {
      setError("Gender is required");
      return false;
    }
    if (!about.trim()) {
      setError("About section cannot be empty");
      return false;
    }
    setError("");
    return true;
  };

  const saveProfile = async () => {
    setError("");
    const processedSkills = skills
      .split(",") // Split the string into an array
      .map((skill) => skill.trim()) // Remove leading/trailing whitespace from each skill
      .filter((skill) => skill); // Remove empty values (in case of trailing commas)
    console.log("clied save profile");
    try {
      if (validateFields()) {
        console.log("valid");
        const res = await axios.patch(
          `${BASE_URL}/profile/edit`,
          {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills: processedSkills,
          },
          {
            withCredentials: true,
          }
        );
        console.log("res in edit ", res);
        dispatch(addUser(res?.data?.data));
        console.log("EDIT ", res?.data?.data);
        toast.success("Profile updated successfully. ", {
          position: "top-center",
        });
      } else {
        setError("Please fill all fields with valid information");
      }
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled defaultValue="male">
                      Pick one
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
        />
      </div>

      {/* {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )} */}
    </>
  );
};

export default EditProfile;
