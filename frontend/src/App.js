import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  const [showLogin, switchState] = useState(true);
  return (
    <div className="app">
      {showLogin ? (
        <Register />
      ) : (
        <>
          <Sidebar />
          <Chat />
        </>
      )}
    </div>
  );
}

export default App;
