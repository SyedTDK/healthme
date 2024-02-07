import React, { useEffect, useState } from "react";

function SignIn() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  function validatePassword(pass, confrimPass) {
    let isValid = confirmPass === pass;
    if (!isValid) {
      setPassError(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let userData = {
      name,
      email,
      password,
    };

    // Make call to backend to create user
    const res = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();

      // registration success
    } else {
      //registration faled
    }
  }
  return (
    
}

export default SignIn;