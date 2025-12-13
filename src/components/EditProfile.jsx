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
  <div className="flex flex-col md:flex-row items-start justify-center gap-6 px-4 py-6">

  <div className="card card-dash bg-base-300 w-full md:w-[420px] lg:w-[480px] flex-shrink-0">
    <div className="card-body p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold text-center mb-2">Edit Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            className="input w-full"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input w-full"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </fieldset>
      </div>

      <fieldset className="fieldset mb-3">
        <legend className="fieldset-legend">Photo URL</legend>
        <input
          type="text"
          className="input w-full"
          value={photoUrl}
          onChange={(e) => setphotoUrl(e.target.value)}
        />
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input
            type="text"
            className="input w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            className="input w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </fieldset>
      </div>

      <fieldset className="fieldset mb-3">
        <legend className="fieldset-legend">About</legend>
        <textarea
          className="textarea w-full h-24 resize-y"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </fieldset>

      <p className="text-red-500 mb-2">{error}</p>

      <div className="card-actions justify-center md:justify-end">
        <button
          onClick={saveProfile}
          className="btn btn-primary w-full md:w-auto"
        >
          Save Profile
        </button>
      </div>
    </div>
  </div>

  <div className="w-full md:w-[360px] lg:w-[400px] flex-shrink-0 mb-24 mb-32">
    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
  </div>

 {showToast && (
  <div
    role="status"
    aria-live="polite"
    className="fixed inset-x-4 sm:inset-x-auto left-1/2 -translate-x-1/2
               bottom-6 md:top-6 lg:top-24 z-[9999]
               pointer-events-none"
  >
    <div className="mx-auto max-w-md w-full pointer-events-auto">
      <div className="toast">
        <div className="alert alert-success shadow-lg">
          <span>Profile Saved Successfully !!</span>
        </div>
      </div>
    </div>
  </div>
)}

</div>

  );
}

export default EditProfile;
