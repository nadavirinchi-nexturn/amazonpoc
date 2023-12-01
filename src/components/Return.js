/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Typography,
  Stack,
  Chip,
  Autocomplete,
  TextField,
  InputLabel,
  Divider,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
  ClickAwayListener,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import "./Return.css";
import "../images/header_back.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Block } from "@mui/icons-material";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment/moment";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide, { SlideProps } from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Return = (props) => {
  // const [rows, setRows] = React.useState([]);
  // const [rowModesModel, setRowModesModel] = React.useState({});

  const [shipFromSite, setShipFromSite] = React.useState([]);
  const [fromSiteValue, setFromSiteValue] = React.useState({
    org_value: "",
    org_id: "",
  });
  const [fromSiteTextValue, setFromSiteTextValue] = React.useState("");

  const [orgId, setOrgId] = React.useState("");
  const [orgValue, setOrgValue] = React.useState("");

  const [shipFromAddresses, setShipFromAddresses] = React.useState([]);
  const [shipFromAddressValue, setShipFromAddresseValue] = React.useState({
    ship_from_org_value: "",
    ship_from_org_id: "",
  });
  const [toRad, setToRad] = React.useState("");
  const [toRadID, setToRadID] = React.useState("");
  const [shipTo, setShipTo] = React.useState("");
  const [shipToID, setShipToID] = React.useState("");

  const [typeValue, setTypeValue] = React.useState("return");
  const [reasonValue, setReasonValue] = React.useState("");
  const [status, setStatus] = React.useState("Draft");

  const [commentValue, setCommentValue] = React.useState("");
  const [returnReqValue, setReturnReqValue] = React.useState("");
  const [createdBy, setCreatedBy] = React.useState(
    props.userName.toUpperCase()
  );
  const [creationDate, setCreationDate] = React.useState(
    moment(Date.now()).format("DD_MMM_YYYY")
  );

  const [shipmentMethods, setShipmentMethods] = React.useState([]);
  const [shippingMethod, setShippingMethod] = React.useState({
    shipping_method_code: "",
    shipping_method: "",
  });
  const [tracking, setTracking] = React.useState("");
  const [requestedphoneNumber, setReqiuestedPhoneNumber] = React.useState("");
  const [shippingEmail, setShippingEmail] = React.useState("");
  const [shippingType, setShippingType] = React.useState("");

  const [lineData, setLineData] = React.useState([]);
  const [rowIndex, setRowIndex] = React.useState(-1);
  const [columnIndex, setColumnIndex] = React.useState(-1);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  const handleonCLickSubmit = () => {
    console.log("line Data", lineData);
  };
  const handleOnCLickCancel = () => {};
  const handleOnClickSave = async () => {
    if (fromSiteValue.org_id === "") {
      setAlertMsg("please select From site");
      setOpenSnackbar(true);
      return;
    }

    if (shipFromAddressValue.ship_from_org_id === "") {
      setAlertMsg("please select ship from address");
      setOpenSnackbar(true);
      return;
    }

    if (shippingMethod.shipping_method_code === "") {
      setAlertMsg("please select shipping method");
      setOpenSnackbar(true);
      return;
    }

    if (tracking === "") {
      setAlertMsg("please fill tracking number");
      setOpenSnackbar(true);
      return;
    }

    if (shippingType === "") {
      setAlertMsg("please select shipping type");
      setOpenSnackbar(true);
      return;
    }

    if (lineData.length === 0) {
      setAlertMsg("please provide Line");
      setOpenSnackbar(true);
      return;
    }

    setAlertMsg("");

    let data = await axios.post(
      "http://localhost:3000/amazonpoc/returns/saveHeaders",
      {
        fromSiteValue: fromSiteValue,
        shipFromAddressValue: shipFromAddressValue,
        toRad: toRad,
        toRadID: toRadID,
        shipTo: shipTo,
        shipToID: shipToID,
        typeValue: typeValue,
        reasonValue: reasonValue,
        commentValue: commentValue,
        status: status,
        createdBy: "1484",
        creationDate: creationDate,
        shippingMethod: shippingMethod,
        shippingType: shippingType,
        userId: "1484",
        loginId: 1234,
        userName: "BCOLDREN",
        requestedphoneNumber: requestedphoneNumber,
        shippingEmail: shippingEmail,
        lines: lineData,
      }
    );
    console.log("data", data);
  };

  React.useEffect(() => {
    if (fromSiteTextValue.length >= 3) {
      setOpenBackdrop(true);
      axios
        .post("http://localhost:3000/amazonpoc/returns/fromSite", {
          operatingNumber: props.operatingUnitNumber,
          search_string: fromSiteTextValue.toUpperCase(),
        })
        .then((response) => {
          console.log(response.data.data);
          setShipFromSite(response.data.data);
          setOpenBackdrop(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [fromSiteTextValue]);

  React.useEffect(() => {
    if (fromSiteValue && fromSiteValue !== "") {
      setOrgId(fromSiteValue.org_id);
      setOrgValue(fromSiteValue.org_value);
    }
  }, [fromSiteValue]);

  React.useEffect(() => {
    if (orgId && orgId !== "") {
      setOpenBackdrop(true);
      let org_name = orgValue.split("(");
      axios
        .post("http://localhost:3000/amazonpoc/returns/shipFromAddress", {
          org_id: orgId,
          operatingUnitNumber: props.operatingUnitNumber,
          org_name: org_name[0],
        })
        .then((response) => {
          console.log(response);
          setShipFromAddresses(response.data.addresses);
          setShipTo(response.data.shipTo);
          setShipToID(response.data.shipToID);
          setToRad(response.data.toRad);
          setToRadID(response.data.toRadId);
          setShipmentMethods(response.data.shipping_methods);
          setOpenBackdrop(false);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [orgId]);

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

  const handleSerialChange = (rowIndex, colname, value) => {
    lineData[rowIndex][colname] = value;
    setLineData([...lineData]);
  };
  const handleAssetChange = (rowIndex, colname, value) => {
    lineData[rowIndex][colname] = value;
    setLineData([...lineData]);
  };

  const handleCommentChange = (rowIndex, colname, value) => {
    lineData[rowIndex][colname] = value;
    setLineData([...lineData]);
  };

  const handleExit = () => {
    setRowIndex(-1);
    setColumnIndex(-1);
  };

  const handleAddNewLine = () => {
    setLineData((oldRecord) => [
      { serial_number: "", asset_number: "", comments: "" },
      ...oldRecord,
    ]);
  };

  return (
    <Box className="return-main-container">
      <Box className="banner-container">
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {alertMsg}
          </Alert>
        </Snackbar>
        <Stack className="stack-from" direction={"row"}>
          <Typography
            sx={{
              fontWeight: "600",
              fontFamily: "GilroyLight",
              fontSize: 16,
              paddingTop: "4px",
              paddingRight: "20px",
            }}
            display={"inline"}
          >
            Equipments Return to RAD
          </Typography>
          <Chip
            sx={{
              backgroundColor: "#ffffff",
              padding: "10px",
              border: "0px",
              color: "#F9A500",
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 550,
            }}
            label="DRAFT"
            variant="outlined"
          />
          {returnReqValue && returnReqValue !== "" && (
            <Typography
              sx={{
                fontWeight: "650",
                fontFamily: "GilroyLight",
                fontSize: 16,
                paddingTop: "4px",
                paddingLeft: "120px",
              }}
              display={"inline"}
            >
              Return Request: {returnReqValue}
            </Typography>
          )}
        </Stack>
        <Stack className="stack-from" spacing={2} direction={"row"}>
          <Box>
            <InputLabel sx={{ fontSize: "18px", fontWeight: 600 }}>
              From Site *
            </InputLabel>
            <Autocomplete
              freeSolo
              sx={{
                width: "360px",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F9A500",
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
              options={shipFromSite}
              getOptionLabel={(shipFromSite) => shipFromSite.org_value}
              value={fromSiteValue}
              onChange={(event, newValue) => {
                setFromSiteValue(newValue);
              }}
              inputValue={fromSiteTextValue}
              onInputChange={(event, newInputValue) => {
                setFromSiteTextValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  required={true}
                  InputLabelProps={{ style: { color: "black" } }}
                  placeholder="From(Site/Dept)"
                  value={fromSiteTextValue}
                  onChange={(e) => setFromSiteTextValue(e.target.value)}
                />
              )}
            />
          </Box>
          <Box>
            <InputLabel sx={{ fontSize: "18px", fontWeight: 600 }}>
              Ship from Address *
            </InputLabel>
            <Autocomplete
              freeSolo
              sx={{
                width: "360px",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#F9A500",
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
              options={shipFromAddresses}
              getOptionLabel={(shipFromAddresses) =>
                shipFromAddresses.ship_from_org_value
              }
              value={shipFromAddressValue}
              onChange={(event, newValue) => {
                setShipFromAddresseValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        {" "}
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                  required={true}
                  InputLabelProps={{ style: { color: "black" } }}
                  placeholder="To(Site/Dept)"
                />
              )}
            />
          </Box>
        </Stack>
      </Box>
      <Box
        className="To-Rad"
        sx={{
          margin: "20px",
          border: "1px solid #DCDCDC",
          borderRadius: "5px",
          height: "35vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Grid container p={5} columnSpacing={2} rowSpacing={2}>
          <Grid item xs={3}>
            <TextField
              sx={{
                input: { color: "#373839" },
                // border: "1px solid red",
                width: "100%",
              }}
              InputLabelProps={{
                style: {
                  color: "#7B7E94",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              }}
              variant="standard"
              value={toRad}
              label="To RAD *"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "GilroyLight",
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{
                input: { color: "#373839" },
                width: "100%",
              }}
              InputLabelProps={{
                style: {
                  color: "#7B7E94",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              }}
              variant="standard"
              value={shipTo}
              label="Ship to Address *"
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  fontWeight: "600",
                  fontFamily: "GilroyLight",
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={typeValue}
                onChange={(e) => setTypeValue(e.target.value)}
              >
                <FormControlLabel
                  value="return"
                  control={<Radio />}
                  label="Return"
                />
                <FormControlLabel
                  value="repair"
                  control={<Radio />}
                  label="Repair"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-reason">Reason</InputLabel>

              <Select
                labelId="demo-simple-select-reason"
                id="demo-simple-select-reason"
                value={reasonValue}
                label="Reason"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setReasonValue(e.target.value)}
              >
                <MenuItem value="Excess Equipment Return">
                  Excess Equipment Return
                </MenuItem>
                <MenuItem value="Return">Return</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Comment"
              variant="outlined"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{
                input: { color: "#373839" },
                width: "100%",
              }}
              InputLabelProps={{
                style: {
                  color: "#7B7E94",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              }}
              variant="standard"
              label="Created by"
              value={createdBy}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "GilroyLight",
                },
              }}
            />
          </Grid>
          {/* <Grid item xs={3}>
            <TextField
              sx={{
                input: { color: "#373839" },
                width: "100%",
              }}
              InputLabelProps={{
                style: {
                  color: "#7B7E94",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              }}
              variant="standard"
              value={returnReqValue}
              label="Return Request Number"
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "GilroyLight",
                },
              }}
            />
          </Grid> */}
          <Grid item xs={3}>
            <TextField
              sx={{
                input: { color: "#373839" },
                width: "100%",
              }}
              InputLabelProps={{
                style: {
                  color: "#7B7E94",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              }}
              variant="standard"
              label="Creation Date"
              value={creationDate}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: "GilroyLight",
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        className="ship-details"
        sx={{
          margin: "20px",
          border: "1px solid #DCDCDC",
          borderRadius: "5px",
          //   height: "30vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Grid container p={5} direction="row" columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography> Shipment Details</Typography>
            <Divider sx={{ paddingTop: "10px" }} />
          </Grid>

          <Grid item xs={3}>
            <Autocomplete
              freeSolo
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
              options={shipmentMethods}
              getOptionLabel={(shipmentMethods) =>
                shipmentMethods.shipping_method
              }
              value={shippingMethod}
              onChange={(event, newValue) => {
                setShippingMethod(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  required={true}
                  label="Shipping Method"
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Tracking *"
              variant="outlined"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-ship-type">
                Shipping Type *
              </InputLabel>

              <Select
                value={shippingType}
                label="Shipping Type *"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setShippingType(e.target.value)}
              >
                <MenuItem value="Parcel">Parcel</MenuItem>
                <MenuItem value="Pallet">Pallet</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <TextField
              label="Requested Phone Number"
              variant="outlined"
              value={requestedphoneNumber}
              onChange={(e) => setReqiuestedPhoneNumber(e.target.value)}
              inputLabelProps={{ style: { color: "black" } }}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Requested Email"
              variant="outlined"
              value={shippingEmail}
              onChange={(e) => setShippingEmail(e.target.value)}
              inputLabelProps={{ style: { color: "black" } }}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        className="line-details"
        sx={{
          margin: "20px",
          border: "1px solid #DCDCDC",
          borderRadius: "5px",
          //   height: "30vh",
          backgroundColor: "#ffffff",
        }}
      >
        <Grid container m={3} direction="row" columnSpacing={2} rowSpacing={2}>
          <Grid item xs={11}>
            <Typography> Line Details</Typography>
            <Divider sx={{ paddingTop: "10px" }} />
          </Grid>
        </Grid>
        <Box m={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4747A1",
              margin: "10px",
            }}
            onClick={handleAddNewLine}
          >
            + Add Line
          </Button>
          <ClickAwayListener onClickAway={() => handleExit()}>
            <TableContainer
              component={Paper}
              sx={{ margin: "5px", height: "280px" }}
            >
              <Table stickyHeader aria-label="simple table">
                <TableHead
                  stickyHeader
                  sx={{ backgroundColor: "#F6F5FA", fontFamily: "GilroyLight" }}
                >
                  <TableRow>
                    <TableCell
                      width="25%"
                      sx={{
                        color: "#7B7E94",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Serial
                    </TableCell>
                    <TableCell
                      width="25%"
                      sx={{
                        color: "#7B7E94",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Asset
                    </TableCell>
                    <TableCell
                      width="25%"
                      sx={{
                        color: "#7B7E94",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Comment
                    </TableCell>
                    <TableCell
                      width="25%"
                      sx={{
                        color: "#7B7E94",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        onClick={() => {
                          setRowIndex(index);
                          setColumnIndex(0);
                        }}
                        sx={{
                          color: "#373839",
                          fontSize: "14px",
                          fontWeight: "550",
                        }}
                      >
                        {rowIndex === index && columnIndex === 0 ? (
                          <TextField
                            defaultValue={row.serial_number}
                            fullWidth
                            onChange={(event) =>
                              handleSerialChange(
                                index,
                                "serial_number",
                                event.target.value
                              )
                            }
                          />
                        ) : (
                          row.serial_number
                        )}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setRowIndex(index);
                          setColumnIndex(1);
                        }}
                        sx={{
                          color: "#373839",
                          fontSize: "14px",
                          fontWeight: "550",
                        }}
                      >
                        {rowIndex === index && columnIndex === 1 ? (
                          <TextField
                            variant="outlined"
                            focused
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-root": {
                                cursor: "pointer",
                              },
                            }}
                            type="text"
                            defaultValue={row.asset_number}
                            fullWidth
                            onChange={(event) =>
                              handleAssetChange(
                                index,
                                "asset_number",
                                event.target.value
                              )
                            }
                          />
                        ) : (
                          row.asset_number
                        )}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setRowIndex(index);
                          setColumnIndex(2);
                        }}
                        sx={{
                          color: "#373839",
                          fontSize: "14px",
                          fontWeight: "550",
                        }}
                      >
                        {rowIndex === index && columnIndex === 2 ? (
                          <TextField
                            defaultValue={row.comments}
                            fullWidth
                            onChange={(event) =>
                              handleCommentChange(
                                index,
                                "comments",
                                event.target.value
                              )
                            }
                          />
                        ) : (
                          row.comments
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#373839",
                          fontSize: "14px",
                          fontWeight: "550",
                        }}
                      >
                        <DeleteIcon
                          onClick={() => {
                            setLineData(
                              lineData.filter(
                                (line, indexx) => indexx !== index
                              )
                            );
                          }}
                        ></DeleteIcon>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ClickAwayListener>
        </Box>
      </Box>
      {/* sx={{ marginRight: "0px", marginLeft: "auto" }} */}
      <Box
        m={2}
        p={2}
        display="flex"
        sx={{ backgroundColor: "#ffffff" }}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
      >
        <Button
          sx={{
            marginRight: "15px",
            backgroundColor: "#E8EFFD",
            color: "#4747A1",
            "&:hover": {
              backgroundColor: "#E8EFFD",
            },
          }}
          variant="contained"
          onClick={handleOnCLickCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{
            marginLeft: "15px",
            border: "1px solid black",
            color: "black",
          }}
          variant="outlined"
          onClick={handleOnClickSave}
        >
          Save
        </Button>
        <Button
          sx={{
            marginLeft: "25px",
            backgroundColor: "#F9A500",
            borderRadius: "5px",
            color: "black",
            "&:hover": {
              backgroundColor: "#F9A500",
            },
          }}
          onClick={handleonCLickSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Return;
