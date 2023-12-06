import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const SignIn = (props) => {
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const navigate = useNavigate();

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenBackdrop(false);
  };

  const handleSignInBtn = async () => {
    setOpenBackdrop(true);
    if (props.userName === "") {
      setOpenSnackbar(true);
      return;
    }
    let response;
    console.log("user name is ", props.userName);
    try {
      response = await axios.post(
        "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/getOperatingUnitNumber",
        { username: props.userName.toUpperCase() }
      );
      const data = response.data;
      props.setUserId(data.user_id);
      if (data.op_unit_number) {
        props.setOperatingUnitNumber(data.op_unit_number);
      }
      if (
        data.responsibility &&
        data.responsibility.toUpperCase().includes("ONE STOP SHOP")
      ) {
        navigate("/list");
      } else {
        setOpenSnackbar(true);
      }
      setOpenBackdrop(false);
    } catch (err) {
      console.log("error", err);
      setOpenSnackbar(true);
      props.setuserName("");
    }
  };

  return (
    <Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          User is not Authorized
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{
          zIndex: 100,
          backgroundColor: "rgba(255, 250, 250, 0.5)",
          opacity: "0.5",
        }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress sx={{ color: "#F28500" }} />
      </Backdrop>
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
            value={props.userName}
            onChange={(e) => props.setuserName(e.target.value)}
            sx={{
              width: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              marginTop: "30px",
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
