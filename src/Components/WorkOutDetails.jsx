import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Datat fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkOutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const  {user} = useAuthContext();

  const handleClick = async () => {
     if(!user){
      return
     }

    const responce = await fetch("https://wokoutapp-backend.onrender.com/api/workouts/" + workout._id, {
      method: "DELETE",
      headers : {"Authorization": `Bearer ${user.token}`}
    });

    const json = await responce.json();

    if (responce.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json.data });
    }
  };
  
  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (In kgs): &nbsp;</strong>
          {workout.load}
        </p>
        <p>
          <strong> Reps:</strong>
          {workout.reps}
        </p>

        <p>{formatDistanceToNow(new Date(workout.createdAt) ,{ addSuffix:true})}</p>

         <span className="material-symbols-outlined btn" onClick={handleClick}>
        delete
      </span>
      </div> 

     
    </>
  );
};

export default WorkOutDetails;
