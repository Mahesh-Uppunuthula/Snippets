// import React, { useState, useEffect } from "react";
// import Axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Profie from "../pages/Profile";
import AuthRegister from "../pages/AuthRegister";
import AuthLogin from "../pages/AuthLogin";

import ToastMessage from "./ToastMessage/ToastMessage";
import Editor from "../pages/Editor";

// const urlPath = "http://localhost:5000/";

const App = () => {
  // const [data, setData] = useState("");
  // const getData = async ()=>{
  //     const response = await Axios.get("http://localhost:5000/getData");
  //     console.log(response);
  //     setData(response.data)
  // }

  // useEffect(()=>{
  //     getData();
  // },[])

  return (
      <Router> 
        <NavBar />
        {/* <ToastMessage /> */}
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/editor" Component={Editor} ></Route>
          <Route path="/profile" Component={Profie} ></Route>
          <Route path="/register" Component={AuthRegister} ></Route>
          <Route path="/login" Component={AuthLogin} ></Route>
        </Routes>
      </Router>
  );
};

export default App;
