import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const initailvalues = {
    email: "",
    password: "",
  };

  const [formValues, setformValues] = useState(initailvalues);
  const { login ,isLoading ,error} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values" , formValues)
    await login(formValues);
  };

  

  return (
    <form action="" className="login" onSubmit={handleSubmit}>
      <h4> Login in</h4>

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

      <button  disabled={isLoading}> Log in</button>
      {error &&  <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
