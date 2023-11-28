import React from "react";

import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListReturnProducts = () => {
  const navigate = useNavigate();

  const handleNewReques = () => {
    navigate("/create");
  };

  return (
    <Box
      m="auto"
      boxSizing="border-box"
      display="flex"
      width={400}
      height={300}
      alignItems="center"
      justifyContent="center"
    >
      <Box m="auto">
        <Button
          variant="contained"
          sx={{ marginTop: "30px" }}
          fullWidth
          onClick={handleNewReques}
        >
          + New Request
        </Button>
      </Box>
    </Box>
  );
};

export default ListReturnProducts;
