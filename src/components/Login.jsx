import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [IsLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login Failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      console.log("Signup Error: ", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-36">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          {!IsLoginForm && (
            <>
              <fieldset className="fieldset p-2">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset p-2">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset p-2">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="m-auto">
            <button
              onClick={IsLoginForm ? handleLogin : handleSignup}
              className="btn btn-primary mt-2"
            >
              {IsLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            onClick={() => setIsLoginForm(!IsLoginForm)}
            className="text-sm text-white font-semibold mt-3 m-auto cursor-pointer"
          >
            {IsLoginForm
              ? "New User? Click here to Sign Up"
              : "Existing User? Click here to Login"}
          </p>
          <p className="text-red-500 m-auto">{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;