import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const initailvalues = {
    email: "",
    password: "",
  };

  const [formValues, setformValues] = useState(initailvalues);
  const [showPassword, setShowPassword] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formValues);
    setformValues(initailvalues);
    // console.log("Data" , formValues)
  };

  return (
    <div className="signUpContainer">
      <div className="signUpform">
        <form action="" className="signup" onSubmit={handleSubmit}>
          <h4>Sign Up</h4>

          <div className="inputField">
            <input
              type="text"
              name="email"
              value={formValues.email}
              placeholder="Email"
              onChange={(e) =>
                setformValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => setEmailStatus((prev) => !prev)}
            >
              {formValues.email.length > 0 ? (
                <MdMarkEmailRead className="icon" />
              ) : (
                <MdEmail className="icon" />
              )}
            </button>
          </div>

          <div className="inputField">
            <input
              type={ showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={(e) =>
                setformValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEye className="icon" />
              ) : (
                <IoEyeOff className="icon" />
              )}
            </button>
          </div>

          <button className="btns" disabled={isLoading}>
            {" "}
            Sign Up
          </button>
          {error && <div className="error"> {error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
