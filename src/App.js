import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import About from "./component/About";
import NoteState from "./Contetxt/Notes/NoteState";

import SignUp from "./component/SignUp";
import Login from "./component/Login";
import Alerts from "./component/Alerts";

function App() {
  const [alerts, setalert] = useState(null);

  const setalertobj = (msges, type) => {
    setalert({
      msg: msges,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  return (
    <NoteState >
      <BrowserRouter>
        <Navbar showalert={setalertobj}/>
        <Alerts alerts={alerts}></Alerts>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showalert={setalertobj} />}></Route>
            <Route exact path="/signup" element={<SignUp showalert={setalertobj} />} />
            <Route exact path="/login" element={<Login showalert={setalertobj}/>} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
