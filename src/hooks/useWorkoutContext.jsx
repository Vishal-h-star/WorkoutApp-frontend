import { useContext } from "react";
import { WorkoutsContext } from "../Context/WorkoutContext";

export const useWorkoutContext = () =>{
     const  context = useContext(WorkoutsContext);

 return context
}