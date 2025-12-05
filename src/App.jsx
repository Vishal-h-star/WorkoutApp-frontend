import { useState } from 'react'
import {BrowserRouter , Routes , Route ,Navigate} from "react-router-dom"
// import './App.css'
import './Scss/main.scss'

// importing components and pages
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Login from  './Pages/Login'
import SignUp from './Pages/SignUp'
import { useAuthContext } from './hooks/useAuthContext'
import WorkOutForm from './Components/WorkOutForm'

function App() {
 
const {user} = useAuthContext();

  return (
     <div className="App">
         <BrowserRouter>
          <Navbar/>
          <div className="pages">
             <Routes>
                <Route path="/" 
                 element={ user ? <HomePage/> : <Navigate to='/login'/> }/> 
                <Route path="/login"
                element={!user  ? <Login /> : <Navigate to="/"  /> }/> 
                <Route path="/signup" 
                 element={!user ? <SignUp /> : <Navigate to="/" /> } /> 
                <Route path="/workoutForm" 
                 element={ user && <WorkOutForm/> } /> 
             </Routes>
          </div>
         </BrowserRouter>
     </div>
  )
}

export default App
