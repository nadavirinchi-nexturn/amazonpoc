import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import "./ListReturnProducts.css";
import boxImage from "../images/Mask group.png";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(rqst, from, shipfrom, to, shipto, create, line) {
  return { rqst, from, shipfrom, to, shipto, create, line };
}

const rows = [
  createData(
    "2356176253",
    "PSP1-GCF-FC-ARS-NA_US",
    "PSP1 FC (Beaumont CA)",
    "RAD1-OTIT-RAD-RAD-NA",
    "RAD1-Rapid Asset Deploy’t Whse",
    "user_01",
    "1234567"
  ),
  createData(
    "2356176254",
    "PSP1-GCF-FC-ARS-NA_US",
    "PSP1 FC (Beaumont CA)",
    "RAD1-OTIT-RAD-RAD-NA",
    "RAD1-Rapid Asset Deploy’t Whse",
    "user_01",
    "1234567"
  ),
  createData(
    "2356176255",
    "PSP1-GCF-FC-ARS-NA_US",
    "PSP1 FC (Beaumont CA)",
    "RAD1-OTIT-RAD-RAD-NA",
    "RAD1-Rapid Asset Deploy’t Whse",
    "user_01",
    "1234567"
  ),
  createData(
    "2356176256",
    "PSP1-GCF-FC-ARS-NA_US",
    "PSP1 FC (Beaumont CA)",
    "RAD1-OTIT-RAD-RAD-NA",
    "RAD1-Rapid Asset Deploy’t Whse",
    "user_01",
    "1234567"
  ),
  createData(
    "2356176257",
    "PSP1-GCF-FC-ARS-NA_US",
    "PSP1 FC (Beaumont CA)",
    "RAD1-OTIT-RAD-RAD-NA",
    "RAD1-Rapid Asset Deploy’t Whse",
    "user_01",
    "1234567"
  ),
];

const ListReturnProducts = () => {
  const navigate = useNavigate();

  const handleNewReques = () => {
    navigate("/create");
  };

  return (
    <Box className="list-main-container">
      <Box className="main-banner-container">
        <Stack direction={"row"}>
          <Stack direction={"row"} m={3}>
            <img
              src={boxImage}
              alt="return RAD"
              sx={{ padding: "2px" }}
              width={"22px"}
              height={"22px"}
            />
            <Typography
              sx={{
                fontWeight: "650",
                fontFamily: "GilroyDark",
                fontSize: 18,
                paddingLeft: "10px",
              }}
            >
              Returns RAD{" "}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            m={2}
            marginLeft={"120px"}
            // height={"60px"}
            // sx={{ border: "1px solid red" }}
          >
            <TextField
              id="ReqNumber-txtfield"
              placeholder="Request Number"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <SearchIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                width: "200px",
                backgroundColor: "#ffffff",
                marginRight: "10px",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    // borderColor: "#F9A500",
                  },
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
            <TextField
              id="FData-txtfield"
              placeholder="From Date"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                width: "200px",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    // borderColor: "#F9A500",
                  },
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
            <TextField
              id="TDate-txtfield"
              placeholder="To Date"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                width: "200px",
                backgroundColor: "#ffffff",
                marginRight: "15px",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    // borderColor: "#F9A500",
                  },
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />

            <TextField
              id="CreatedBy-txtfield"
              placeholder="Created by"
              variant="outlined"
              InputProps={
                {
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     {" "}
                  //     <SearchIcon />
                  //   </InputAdornment>
                  // ),
                  // disableUnderline: true,
                }
              }
              sx={{
                width: "200px",
                marginRight: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    // borderColor: "#F9A500",
                  },
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
            <Button variant="contained" sx={{ backgroundColor: "#4747A1" }}>
              Search
            </Button>
          </Stack>
        </Stack>
        <Grid container paddingLeft={2} paddingRight={2}>
          <Grid item xs={3}>
            <Typography
              sx={{
                marginLeft: "25px",
                fontWeight: "650",
                fontFamily: "GilroyLight",
                fontSize: 18,
              }}
            >
              Return List
            </Typography>
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4747A1" }}
              fullWidth
              onClick={handleNewReques}
            >
              + New Request
            </Button>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          marginTop={1}
          marginLeft={2}
          height={"52px"}
          sx={{ backgroundColor: "#ffffff", borderRadius: "5px 5px 0px 0px" }}
        >
          <Stack>
            <Typography
              marginLeft={"30px"}
              marginTop={"15px"}
              sx={{
                color: "#4747A1",
                fontWeight: "600",
                fontFamily: "GilroyLight",
                fontSize: 16,
              }}
            >
              Approved
            </Typography>
            <Divider
              style={{ background: "#4747A1" }}
              sx={{
                marginLeft: "20px",
                marginTop: "10px",
              }}
            />
          </Stack>
          <Typography
            marginLeft={"30px"}
            marginTop={"15px"}
            sx={{
              fontWeight: "400",
              fontFamily: "GilroyLight",
              fontSize: 16,
            }}
          >
            Submitted
          </Typography>
          <Typography
            marginLeft={"30px"}
            marginTop={"15px"}
            sx={{
              fontWeight: "400",
              fontFamily: "GilroyLight",
              fontSize: 16,
            }}
          >
            Draft
          </Typography>
        </Stack>
        <Stack direction={"row"}>
          <Chip
            sx={{
              display: "flex",
              width: "85px",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#ffffff",
              marginLeft: "30px",
              marginTop: "10px",
              border: "0px",
              color: "#243448",
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 550,
            }}
            label="All"
            variant="outlined"
            avatar={
              <Badge
                badgeContent={"99+"}
                sx={{
                  position: "absolute",
                  left: 70,
                  top: 223,
                  "& .MuiBadge-badge": {
                    color: "#2C67FF",
                    backgroundColor: "#E6EEFF",
                  },
                }}
                color="primary"
              ></Badge>
            }
          ></Chip>
          <Chip
            sx={{
              display: "flex",
              width: "105px",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#ffffff",
              marginLeft: "30px",
              marginTop: "10px",
              border: "0px",
              color: "#243448",
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 550,
            }}
            label="Return"
            variant="outlined"
            avatar={
              <Badge
                badgeContent={"70"}
                sx={{
                  position: "absolute",
                  left: 210,
                  top: 223,
                  "& .MuiBadge-badge": {
                    color: "#2C67FF",
                    backgroundColor: "#E6EEFF",
                  },
                }}
                color="primary"
              ></Badge>
            }
          ></Chip>
          <Chip
            sx={{
              display: "flex",
              width: "95px",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "#ffffff",
              marginLeft: "30px",
              marginTop: "10px",
              border: "0px",
              color: "#243448",
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 550,
            }}
            label="Draft"
            variant="outlined"
            avatar={
              <Badge
                badgeContent={"50"}
                sx={{
                  position: "absolute",
                  left: 330,
                  top: 223,
                  "& .MuiBadge-badge": {
                    color: "#2C67FF",
                    backgroundColor: "#E6EEFF",
                  },
                }}
                // color=""
              ></Badge>
            }
          ></Chip>
        </Stack>
      </Box>
      <Box
        className="table-main"
        sx={{
          border: "1px solid #FFFFFF",
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "-30px",
          marginBottom: "30px",
          height: "100%",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box
          className="table-container"
          sx={{
            // border: "2px solid red",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "30px",
            marginBottom: "30px",
            // backgroundColor: "green",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                sx={{ backgroundColor: "#F6F5FA", fontFamily: "GilroyLight" }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    Rqst#
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    From(Site/Dept)
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    Ship From
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    To (RAD)
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    Ship To
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    Created Info
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  >
                    Line#
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.rqst}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.rqst}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.from}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.shipfrom}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.to}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.shipto}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.create}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#373839",
                        fontSize: "14px",
                        fontWeight: "550",
                      }}
                    >
                      {row.line}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ListReturnProducts;

{
  /* <Box m="auto">
        <Button
          variant="contained"
          sx={{ marginTop: "30px" }}
          fullWidth
          onClick={handleNewReques}
        >
          + New Request
        </Button>
      </Box> */
}
