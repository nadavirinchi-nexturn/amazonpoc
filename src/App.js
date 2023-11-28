import "./App.css";
import { Box } from "@mui/material";
import React from "react";
// import "./components/styles/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Return from "./components/Return";
import SignIn from "./components/SignIn";
import ListReturnProducts from "./components/ListReturnProducts";

function App() {
  return (
    // <Box sx={{ width: "100vw", height: "100vh" }}>
    //   hi
    // </Box>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/returnRequest" element={<Return />} />
          <Route path="/listReturn" element={<ListReturnProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
