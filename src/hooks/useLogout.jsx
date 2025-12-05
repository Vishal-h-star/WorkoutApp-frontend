import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const  useLogout = () =>{
    
    const {dispatch} = useAuthContext();
    // Exp works something like this 
    // const contextValue = useWorkoutContext();
    // const workoutDispatch = contextValue.disp 
    const {dispatch : workoutDIspatch} = useWorkoutContext();

    const logout = () =>{

         localStorage.removeItem('user')
         dispatch({type:'LOGOUT'})
         workoutDIspatch({type:"SET_WORKOUTS" , payload: null})
    }

    return  {logout}
}