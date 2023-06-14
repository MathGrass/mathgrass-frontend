import { Fragment, useEffect, useState } from "react";
import GraphEditor from "./Components/GraphEditor/GraphEditor";
import "./App.css";
import UserLogin from "./Components/UserLogin/LoginForm/UserLogin";
import { Route, Routes, useNavigate } from "react-router-dom";
import MathGrass from "../mathGrass";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/config/store";
import { sessionValidationFetch } from "./store/slices/sessionValidationSlice";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const sessionValidation = async () => {
      const adminToken = localStorage.getItem("admin");
      localStorage.removeItem("GraphMode");
      localStorage.setItem("GraphicalHint", JSON.stringify(false));
      const results = await dispatch(
        sessionValidationFetch({ token: adminToken })
      );
      console.log("isExpired token - ", results.payload);
      if (results.payload === false) {
        navigate("/user");
      } else if (results.payload === true) {
        localStorage.removeItem("admin");
        navigate("/");
      } else {
        navigate("/");
      }
    };
    sessionValidation();
  }, []);
  return (
    <Fragment>
      <Routes>
        <Route path="/student" element={<MathGrass />} />
        <Route path="/user" element={<GraphEditor />} />
        <Route path="/" element={<UserLogin />} />
      </Routes>
    </Fragment>
  );
}

export default App;
