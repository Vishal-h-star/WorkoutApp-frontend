import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkOutForm = () => {
  const initialvalues = {
    title: "",
    load: "",
    reps: "",
  };
  const [formvalues, setformvalues] = useState(initialvalues);
  const [errors, setErrors] = useState(null);
  const [errorField, setErrorField] = useState({});
  // console.log(errorField)

  //   to store data in my workout context
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext();

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
        setErrors("user must be Logged in!")
        return;
    }

    const response = await fetch("/api/workouts/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "Authorization" : `Bearer ${user.token}`
      },
      body: JSON.stringify({
        data: formvalues,
      }),
    });

    console.log( "res",response)

    const json = await response.json();

    if (!response.ok) {
      setErrors(json.error);
      setErrorField(json.errorField || {});
    } else {
      // setErrors(null);
      setformvalues(initialvalues);
      console.log(" New workout updated ", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json.data });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit} action="">
      <h3>Add a new Workout </h3>

      {errorField.title && <div className="fielderror">{errorField.title}</div>}
      <label htmlFor="title"> Exercise Title: </label>
      <input
        id="title"
        type="text"
        name="title"
        value={formvalues.title}
        onChange={handleChnage}
      />

      {errorField.load && <div className="fielderror">{errorField.load}</div>}
      <label htmlFor="load"> Load (in kg's): </label>
      <input
        id="load"
        type="text"
        name="load"
        value={formvalues.load}
        onChange={handleChnage}
      />
      {errorField.reps && <div className="fielderror">{errorField.reps}</div>}
      <label htmlFor="reps"> Reps: </label>
      <input
        id="reps"
        type="text"
        name="reps"
        value={formvalues.reps}
        onChange={handleChnage}
      />

      <button>Add Workout</button>
      {errors && <div className="error">{errors}</div>}
    </form>
  );
};

export default WorkOutForm;
