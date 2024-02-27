"use client"
import React, { useEffect, useState } from "react";

export default function SignIn() {
  // state variables to store user input
  const [fname, setFirstName] = useState<string>("");
  const [lname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passError, setPassError] = useState(false);

  // useEffect hook to validate password whenever password or confirmpassword changes
  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  // function to validate whether or not the passwords match
  function validatePassword(pass: string, confirmPass: string) {
    let isValid = confirmPass === pass;
    if (!isValid) {
      setPassError(true);
    }
  }

  // function to handle form submission 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevents the default form submission behavior (stop spage from reloading)
    let userData = {
      fname,
      lname,
      email,
      DOB,
      gender,
      password,
    };

    // Make call to backend to create user
    const res = await fetch("http://localhost:3000/api/user/create", {
      method: "POST", // we use the fetch api tp use this method to request to the url above 
      body: JSON.stringify(userData), // this makes the userdata pass through as strings in  a json format
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();

      // registration success
    } else {
      //registration failed
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md">
        <h2 className="text-center mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="DOB">Date of Birth</label>
            <input
              type="text"
              id="DOB"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Enter your Date of Birth"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Enter your Gender"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300"
              placeholder="Confirm your password"
              required
            />
          </div>
          {passError && <p className="text-red-500">Passwords do not match.</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-indigo-600 text-white cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
