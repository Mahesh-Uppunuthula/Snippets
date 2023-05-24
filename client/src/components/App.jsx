// import React, { useState, useEffect } from "react";
// import Axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar";

import Home from "../pages/Home";
import Create from "../pages/Create";
import Dashboard from "../pages/Dashboard";
import Profie from "../pages/Profile";
import Auth from "../pages/Auth";

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
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/create" Component={Create} ></Route>
          <Route path="/profile" Component={Profie} ></Route>
          <Route path="/auth" Component={Auth} ></Route>
        </Routes>
      </Router>
  );
};

export default App;
