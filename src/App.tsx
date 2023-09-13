// Import necessary components and hooks from React and react-router-dom
import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import DetailRecipe from "./components/DetailRecipe/DetailRecipe";
import Home from "./components/Home/Home";
import Calender from "./components/Calendar/Calender";
import Layout from "./Layout";

function App() {
  const navigate = useNavigate()

  return (


    <Routes>
      <Route path="/" element={<Layout component={<Home />} />} />
      <Route path="/calendar" element={<Layout component={<Calender />} />} />
      <Route path="/detail-recipe?/:recipecat?/:recipeId?" element={<Layout component={<DetailRecipe />} />} />
    </Routes>
  );
}

export default App;
