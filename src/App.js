import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Homescreen";
import { Toaster } from 'react-hot-toast';
import SpotifyPage from "./Pages/Home/Spotify";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/spotify" element={<SpotifyPage />}></Route>
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;