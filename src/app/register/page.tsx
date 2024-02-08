import React, { useEffect, useState } from "react";

function SignIn() {
  const [fname, setFirstName] = useState<string>("");
  const [lname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    validatePassword(password, confirmPassword)
  }, [password, confirmPassword]);

  function validatePassword(pass: string, confirmPass: string) {
    let isValid = confirmPass === pass;
    if (!isValid) {
      setPassError(true);
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let userData = {
      fname,
      lname,
      email,
      username,
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
      <form onSubmit={handleSubmit}>
      </form>
    );
}

export default SignIn;