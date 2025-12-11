import React, { use } from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center mt-1 gap-5 text-sm">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <div className="mx-auto ">
            <h1>Edit Profile</h1>
          </div>
          <fieldset className="fieldset px-2">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset px-2">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset px-2">
            <legend className="fieldset-legend">Photo Url</legend>
            <input
              type="text"
              className="input"
              value={photoUrl}
              onChange={(e) => setphotoUrl(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset px-2">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset px-2">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset px-2">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          <div className="div">
            <p className="text-red-500">{error}</p>
          </div>
          <div className="card-actions justify-center">
            <button onClick={saveProfile} className="btn btn-primary">
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center mt-5">
          <div className="alert alert-success">
            <span>Profile Saved Successfully !!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
