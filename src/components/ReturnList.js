import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

const styles = {
  returnListContainer: {
    height: "360px",
    width: "100%",
    paddingTop: "1%",
    backgroundImage: `url(${"/assets/version_2_bg.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  testContainer: {
    // backgroundColor: "#ffffff",
    width: "100px",
    height: "50px",
    marginLeft: "15px",
    backgroundImage: `url(${"/assets/logo-wide.png"})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

const ReturnList = (props) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Box sx={styles.returnListContainer}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          marginBottom={2}
        >
          <Box sx={styles.testContainer}></Box>
          <Typography
            sx={{ marginRight: "30px", marginLeft: "auto" }}
            fontFamily="Gilroy"
            color="white"
            fontWeight="1000"
          >
            Welcome {props.userName.toUpperCase()}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          m={2}
        >
          <Typography
            fontFamily="Gilroy"
            color="white"
            fontWeight="600"
            fontSize="1.5rem"
          >
            Equipment Returns to RAD
          </Typography>
          <Button
            sx={{
              marginLeft: "auto",
              background: "#FFD914",
              textTransform: "none",
              "&:hover": {
                background: "#FFBB5C",
              },
              width: "200px",
              height: "40px",
              color: "#131921",
            }}
            onClick={() => navigate("/create")}
          >
            + New Request
          </Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          // padding="1%"
          marginLeft={4}
          marginBottom={2}
        >
          <Typography
            fontFamily="Gilroy"
            color="white"
            fontWeight="600"
            fontSize="1.2rem"
          >
            Return List
          </Typography>
        </Stack>
        <Grid
          container
          // m={1}
          spacing={1}
          // marginLeft={1}
          // marginRight={2}
          // gap={1}
          // rowSpacing={2}
          // sx={{ border: "1px solid red" }}
          alignItems={"center"}
          // justifyContent={"center"}
          xs={12}
        >
          <Grid item xs={3}>
            <TextField
              placeholder="Request Number"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFBB5C",
                },
                marginLeft: "5px",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="From Date"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFBB5C",
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="To Date"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {" "}
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFBB5C",
                },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Created by"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFBB5C",
                },
                marginLeft: "auto",
                // marginRight: "5px",
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              sx={{
                background: "#FFBB5C",
                textTransform: "none",
                color: "#131921",
                "&:hover": {
                  background: "#FFBB5C",
                },
                height: "40px",
                width: "100px",
                marginLeft: "1px",
                marginRight: "1px",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          height="40px"
          left="30px"
          sx={{
            background: "white",
            marginTop: "25px",
            marginLeft: "30px",
            marginRight: "30px",
            borderRadius: "5px",
          }}
        >
          <Typography
            fontFamily="Gilroy"
            color="#131921"
            fontWeight="1000"
            marginLeft="2%"
          >
            Approved
          </Typography>
          <Typography
            fontFamily="Gilroy"
            color="#131921"
            fontWeight="1000"
            marginLeft="2%"
          >
            Submitted
          </Typography>
          <Typography
            fontFamily="Gilroy"
            color="#131921"
            fontWeight="1000"
            marginLeft="2%"
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
                badgeContent={"0"}
                sx={{
                  // position: "sticky",
                  // left: "65px",
                  // top: "350px",
                  "& .MuiBadge-badge": {
                    color: "#2C67FF",
                    backgroundColor: "#E6EEFF",
                    transform: "translate(50px, 2px)",
                    // marginTop: "12px",
                    // marginLeft: "-px",
                    // marginRight: "auto",
                  },
                }}
                color="primary"
              ></Badge>
            }
          ></Chip>
          <Chip
            sx={{
              display: "flex",
              width: "115px",
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
                badgeContent={"0"}
                sx={{
                  // position: "absolute",
                  // left: 200,
                  // top: 306,
                  "& .MuiBadge-badge": {
                    color: "#2C67FF",
                    backgroundColor: "#E6EEFF",
                    transform: "translate(80px, 2px)",
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
            label="Draft"
            variant="outlined"
            avatar={
              <Badge
                badgeContent={"0"}
                sx={{
                  // position: "absolute",
                  // left: 330,
                  // top: 306,
                  "& .MuiBadge-badge": {
                    color: "#2C67FF",
                    backgroundColor: "#E6EEFF",
                    transform: "translate(70px, 2px)",
                  },
                }}
                // color=""
              ></Badge>
            }
          ></Chip>
        </Stack>
      </Box>
      <Box
        sx={{
          border: "1px solid #FFFFFF",
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "-40px",
          marginBottom: "30px",
          minHeight: "150px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box
          className="table-container"
          sx={{
            // border: "2px solid red",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "10px",
            marginBottom: "30px",
            // backgroundColor: "green",
          }}
        >
          <TableContainer component={Paper} sx={{ height: "100px" }}>
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
                    Request #
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
                    Created By
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#7B7E94",
                      fontSize: "14px",
                      fontWeight: "550",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ReturnList;
