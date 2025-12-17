import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search"/>
        {/* <Route path="/search" element={<Task tag="search" />} /> */}
    </Routes>
  );
};

export default Pages;
