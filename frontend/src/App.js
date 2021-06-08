import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <div className="app">
        <div className="app__body">
          <Sidebar />
          <button onClick={}>+</button>
          {isLoggedIn ? <Chat /> : ""}
        </div>
      </div>
    </>
  );
}

export default App;
