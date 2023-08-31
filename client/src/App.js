import React,{createContext, useContext,useEffect,useReducer} from "react";
import NavBar from "./components/Navbar";
import "./App.css"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import {reducer,initialState} from "./reducers/userReducer"
import UserProfile from "./components/screens/UserProfile"
import Message from "./components/screens/Messages"
import SubscribedUserPost from "./components/screens/SubscribeUserPost"

export const UserContext = createContext()

const Routing =()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",paylaod:user})
      navigate('/');
    }else{
      navigate('/signin');
    }
  },[])
  return(
    
    <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/messsage" element={<Message />} />
          <Route path="/profile/:userid" element={<UserProfile />} />
          <Route path="/myfollowerspost" element={<SubscribedUserPost />} />
    </Routes>
    
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
