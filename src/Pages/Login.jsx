import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const initailvalues = {
    email: "",
    password: "",
  };

  //  All values and state
  const [formValues, setformValues] = useState(initailvalues);
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  console.log(emailStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values", formValues);
    await login(formValues);
  };

  return (
    <form action="" className="login" onSubmit={handleSubmit}>
      <h4>LOGIN</h4>

      <div className="inputField">
        <input
          type="text"
          name="email"
          value={formValues.email}
          placeholder="Email"
          onChange={(e) =>
            setformValues({ ...formValues, [e.target.name]: e.target.value })
          }
        />

        <button type="button" onClick={() => setEmailStatus((prev) => !prev)}>
          {formValues.email.length > 0 ? (
            <MdMarkEmailRead className="icon" />
          ) : (
            <MdEmail className="icon" />
          )}
        </button>
      </div>

      <div className="inputField">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formValues.password}
          placeholder="Password"
          onChange={(e) =>
            setformValues({ ...formValues, [e.target.name]: e.target.value })
          }
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <IoEye className="icon" />
          ) : (
            <IoEyeOff className="icon" />
          )}
        </button>
      </div>

      <button className="btns" disabled={isLoading}>
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
