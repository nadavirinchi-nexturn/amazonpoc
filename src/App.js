import "./App.css";
import { Box } from "@mui/material";
import React from "react";
// import "./components/styles/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Return from "./components/Return";
import SignIn from "./components/SignIn";
import ListReturnProducts from "./components/ListReturnProducts";

function App() {

  const [operatingUnitNumber, setOperatingUnitNumber] = React.useState('')
  const [userName, setuserName] = React.useState("");
  const [userId, setUserId] = React.useState('')
  const [loginId, setLoginId] = React.useState('')

  return (
    <BrowserRouter>
      <Box className="App">
        <Routes>
          <Route path="/" element={<SignIn setOperatingUnitNumber={setOperatingUnitNumber} userName={userName} setuserName={setuserName} setUserId={setUserId} setLoginId={setLoginId} />} />
          <Route path="/create" element={<Return operatingUnitNumber={operatingUnitNumber} userName={userName} userId={userId} loginId={loginId} />} />
          <Route path="/list" element={<ListReturnProducts />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
