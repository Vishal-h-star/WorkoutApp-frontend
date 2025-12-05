import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const initailvalues = {
    email: "",
    password: "",
  };

  const [formValues, setformValues] = useState(initailvalues);
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formValues);
    setformValues(initailvalues)
    // console.log("Data" , formValues)
  };

  return (
    <form action="" className="signup" onSubmit={handleSubmit}>
      <h4>Sign Up</h4>

      <label htmlFor="">Email :</label>
      <input
        type="text"
        name="email"
        value={formValues.email}
        onChange={(e) =>
          setformValues({ ...formValues, [e.target.name]: e.target.value })
        }
      />

      <label htmlFor="">Password :</label>
      <input
        type="password"
        name="password"
        value={formValues.password}
        onChange={(e) =>
          setformValues({ ...formValues, [e.target.name]: e.target.value })
        }
      />

      <button disabled={isLoading}> Sign Up</button>
      {error && <div className="error"> {error}</div>}
    </form>
  );
};

export default SignUp;
