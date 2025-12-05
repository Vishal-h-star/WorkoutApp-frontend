import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// importing components
import WorkOutDetails from "../Components/WorkOutDetails";
import WorkOutForm from "../Components/WorkOutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";


const HomePage = () => {
  // by useState
  //  const [workouts, setWorkouts] = useState(null);

  // bu useWorkoutContext
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API}/api/workouts/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json.data);

        dispatch({ type: "SET_WORKOUTS", payload: json.data });
      }
      console.log(json.data);
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="homeContainer" id="main">
       <button id="addworkout"><Link to="/workoutForm">Add Workout</Link></button>
      <div className="WorkoutData">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkOutDetails key={workout._id} workout={workout} />
            ))}
        </div>
         <div className="workoutFormDiv"> 
           <WorkOutForm />
         </div>
      </div>
    </div>
  );
};

export default HomePage;
