import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

// Datat fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkOutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const responce = await fetch(`${API}/api/workouts/` + workout._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await responce.json();

    if (responce.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json.data });
    }
  };

  return (
    <>
      <div className="workout-details">
        <div className="workoutContent">
          <h4>{workout.title}</h4>
          <p>
            <strong>Load (In kgs): &nbsp;</strong>
            {workout.load}
          </p>
          <p>
            <strong> Reps: &nbsp;</strong>
            {workout.reps}
          </p>

          <p>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>

        <div className="buttonsDiv">
          <button type="button" className="btn" onClick={handleClick}>
            <MdDeleteOutline className="icon" />
          </button>
            <button type="button" className="btn" onClick={handleClick}>
            <FaCheck className="icon" />
          </button>
        </div>
        {/* <span className="material-symbols-outlined btn" onClick={handleClick}>
         delete
      </span> */}
    
      </div>
    </>
  );
};

export default WorkOutDetails;
