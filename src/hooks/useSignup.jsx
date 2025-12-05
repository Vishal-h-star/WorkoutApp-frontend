import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () =>{
     const [error, setError] = useState(null) 
     const [isLoading, setisLoading] = useState(null)
      const {dispatch} = useAuthContext();

     const signup =  async ({email ,password}) =>{
           setError(null)
           setisLoading(true);

           const response  = await fetch('/api/user/signup' , {
              method: 'POST',
              headers: {'content-type' : "application/json"},
              body : JSON.stringify({email, password}) 
           })

           console.log("my response",response)

           const json = await response.json()

           if(!response.ok){
               setisLoading(false);
               setError(json.error)
           }

           if(response.ok){
            //  saving the user details to the prowser
                localStorage.setItem( 'user' , JSON.stringify(json))
                // updating gloable auth context 
                dispatch({type:'LOGIN' , payload: json })
                setisLoading(false)
           }

     }

     return { signup , isLoading, error }
}
