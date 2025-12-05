import React, { useEffect, useState  } from "react";

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
  const   {user} =  useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/" , {
          headers : { 'Authorization' : `Bearer ${user.token}`}
      });
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json.data);

        dispatch({ type: "SET_WORKOUTS", payload: json.data });
      }
      console.log(json.data);
    };

      if(user){
        fetchWorkouts();
      }
  }, [dispatch ,user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkOutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkOutForm />
    </div>
  );
};

export default HomePage;
