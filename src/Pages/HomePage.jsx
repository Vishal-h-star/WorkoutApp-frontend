import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// importing components
import WorkOutDetails from "../Components/WorkOutDetails";
import WorkOutForm from "../Components/WorkOutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Paginationcomp from "../Components/Paginationcomp";


const HomePage = () => {
  // by useState
  //  const [workouts, setWorkouts] = useState(null);

  // bu useWorkoutContext
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [page, setpage] = useState(1)
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

  // pagination logics 
      const rowsPerPage = 3
      const start = (page - 1) * rowsPerPage
      const end = start + rowsPerPage;
      const visibleData =  workouts ? workouts.slice(start ,end) :[]; 
      const pagesCount =  workouts ? Math.ceil( workouts.length / rowsPerPage) : 1;

   const setPageFunc = (event, value) =>{
      setpage(value)   
   }
   console.log(page)
      // console.log(workouts)
      // console.log("data toshow" , visibleData)
  return (
    <div className="homeContainer" id="main">
       <button id="addworkout"><Link to="/workoutForm">Add Workout</Link></button>
      <div className="WorkoutData">
        <div className="workouts">
          {/* {workouts &&
            workouts.map((workout) => (
              <WorkOutDetails key={workout._id} workout={workout} />
            ))} */}
           {visibleData.map( (workout) => (
              <WorkOutDetails key={workout._id} workout={workout} />
           ))  }
        </div>
         <div className="workoutFormDiv"> 
           <WorkOutForm />
         </div>
            <Paginationcomp count={pagesCount} func ={setPageFunc}/>
      </div>
    </div>
  );
};

export default HomePage;
