import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import AuthRegister from "../pages/AuthRegister";
import AuthLogin from "../pages/AuthLogin";
import Editor from "../pages/Editor";

const App = () => {

  return (
      <Router> 
        <NavBar />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/editor" Component={Editor} ></Route>
          <Route path="/register" Component={AuthRegister} ></Route>
          <Route path="/login" Component={AuthLogin} ></Route>
        </Routes>
      </Router>
  );
};

export default App;
