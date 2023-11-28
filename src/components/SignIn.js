import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userName, setuserName] = useState("");
  const navigate = useNavigate();

  const handleSignInBtn = () => {
    console.log("user name is ", userName);
    navigate("/list");
  };

  return (
    <Box>
      <Box className="banner-containers"></Box>
      <Box
        m="auto"
        boxSizing="border-box"
        display="flex"
        width={400}
        height={300}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          border="1px solid lightGray"
          borderRadius={"5px"}
          backgroundColor="#ffffff"
          p={3}
          marginTop={"170px"}
          width="inherit"
          height="inherit"
          alignItems="center"
          justifyContent="center"
          align="center"
        >
          <Avatar sx={{ backgroundColor: "#F9A500" }}>
            <LockIcon />
          </Avatar>

          <Typography
            sx={{
              fontWeight: "600",
              fontFamily: "GilroyLight",
              fontSize: 24,
            }}
            align="center"
            p={1}
          >
            {" "}
            Sign In
          </Typography>
          <TextField
            id="req-email-txtfields"
            label="Username"
            variant="outlined"
            inputLabelProps={{ style: { color: "black" } }}
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            sx={{
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              marginTop: "30px",
              // "& .MuiOutlinedInput-root": {
              //   "&.Mui-focused fieldset": {
              //     borderColor: "#F9A500",
              //   },
              // },
              // "&.Mui-focused .MuiOutlinedInput-root": {
              //   paddingRight: "10px!important",
              // },
            }}
          />
          <Button
            variant="contained"
            sx={{ marginTop: "30px" }}
            fullWidth
            onClick={handleSignInBtn}
          >
            SIGN IN
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
