/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "./styles/fonts.css";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment/moment";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Slide from "@mui/material/Slide";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import CameraAltTwoToneIcon from "@mui/icons-material/CameraAltTwoTone";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const ReturnForm = (props) => {
  const navigate = useNavigate();

  const [lineData, setLineData] = React.useState([]);
  const [state, setState] = React.useState({
    toRad: "",
    shipTo: "",
    typeValue: "Return",
    reasonValue: "",
    commentValue: "",
    status: "New",
    createdBy: props.userName.toUpperCase(),
    returnReqValue: "",
    creationDate: moment(Date.now()).format("DD-MMM-YYYY"),
    shippingEmail: "",
    requestedphoneNumber: "",
    shippingType: "",
    tracking: "",
    orgId: "",
    orgValue: "",
    shipToId: "",
    toRadId: "",
    fromSiteValue: { org_value: "", org_id: "" },
    fromSiteTextValue: "",
    shipFromSite: [],
    shipFromAddresses: [],
    shipmentMethods: [],
    rowIndex: -1,
    columnIndex: -1,
    shippingMethod: { shipping_method_code: "", shipping_method: "" },
    shipFromAddressValue: { ship_from_org_value: "", ship_from_org_id: "" },
    openBackdrop: false,
    openStatusBackdrop: false,
    openSnackbar: false,
    alertMsg: "",
    return_request_number: "",
    barCodeData: "",
    showBarCodeComponent: false,
    openBarCodeDialog: false,
  });

  const equipment_rad_ref = React.useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNewLine = () => {
    setState((prevState) => ({
      ...prevState,
      barCodeData: "",
    }));

    setLineData((oldRecord) => [
      { serial_number: "", asset_number: "", comments: "" },
      ...oldRecord,
    ]);
  };

  const handleExit = () => {
    setState((prevState) => ({
      ...prevState,
      rowIndex: -1,
      columnIndex: -1,
    }));
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

  const handleCloseBackdrop = () => {
    setState((prevState) => ({
      ...prevState,
      openBackdrop: false,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      openBackdrop: false,
      openSnackbar: false,
    }));
  };

  const handleonCLickSubmit = async () => {
    setState((prevState) => ({
      ...prevState,
      openBackdrop: true,
    }));
    try {
      const submitted_data = await axios.post(
        "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/submitAll",
        {
          header_id: state.returnReqValue,
          userName: props.userName.toUpperCase(),
        }
      );
      let response = submitted_data.data.submitted_data;
      console.log("submitted_data", submitted_data);
      setState((prevState) => ({
        ...prevState,
        openSnackbar: true,
        servityType: "success",
        alertMsg: "Your request is submitted",
        submitBtnClicked: true,
        return_request_number: response.outBinds.p_req_number,
      }));
    } catch (err) {
      console.log("error", err);
    }
    equipment_rad_ref.current?.scrollIntoView({ behavior: "smooth" });
    setState((prevState) => ({
      ...prevState,
      openBackdrop: false,
    }));
  };

  const handleOnCLickCancel = () => {
    console.log("state", state);
    console.log("lineData", lineData);
    setState((prevState) => ({
      ...prevState,
      openBackdrop: true,
    }));
    setTimeout(() => {
      navigate("/list");
    }, 2000);
  };

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      openBarCodeDialog: false,
      showBarCodeComponent: false,
    }));
  };

  const onUpdateScreen = (err, result) => {
    if (result) {
      setState((prevState) => ({
        ...prevState,
        barCodeData: result.text,
        showBarCodeComponent: false,
        openBarCodeDialog: false,
      }));
      handleSerialChange(state.rowIndex, "serial_number", result.text);
    }
  };

  React.useEffect(() => {
    if (state.openBarCodeDialog === true) {
      setState((prevState) => ({
        ...prevState,
        showBarCodeComponent: true,
      }));
    }
  }, [state.openBarCodeDialog]);

  const handleOnClickSave = async () => {
    setState((prevState) => ({
      ...prevState,
      openBackdrop: true,
    }));
    if (state.fromSiteValue.org_id === "") {
      setState((prevState) => ({
        ...prevState,
        servityType: "error",
        alertMsg: "please select From site",
        openSnackbar: true,
      }));
      return;
    }

    if (state.shipFromAddressValue.ship_from_org_id === "") {
      setState((prevState) => ({
        ...prevState,
        servityType: "error",
        alertMsg: "please select ship from address",
        openSnackbar: true,
      }));
      return;
    }

    if (state.shippingMethod.shipping_method_code === "") {
      setState((prevState) => ({
        ...prevState,
        servityType: "error",
        alertMsg: "please select shipping method",
        openSnackbar: true,
      }));
      return;
    }

    if (state.tracking === "") {
      setState((prevState) => ({
        ...prevState,
        servityType: "error",
        alertMsg: "please fill tracking number",
        openSnackbar: true,
      }));
      return;
    }

    if (state.shippingType === "") {
      setState((prevState) => ({
        ...prevState,
        alertMsg: "please select shipping type",
        openSnackbar: true,
      }));
      return;
    }

    if (lineData.length === 0) {
      setState((prevState) => ({
        ...prevState,
        servityType: "error",
        alertMsg: "please provide Line",
        openSnackbar: true,
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      alertMsg: "",
    }));

    let headers_data = await axios.post(
      "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/saveHeaders",
      {
        fromSiteValue: state.fromSiteValue,
        shipFromAddressValue: state.shipFromAddressValue,
        toRad: state.toRad,
        toRadID: state.toRadId,
        shipTo: state.shipTo,
        shipToID: state.shipToId,
        typeValue: state.typeValue,
        reasonValue: state.reasonValue,
        commentValue: state.commentValue,
        status: "Draft",
        createdBy: props.userId,
        creationDate: state.creationDate,
        shippingMethod: state.shippingMethod,
        shippingType: state.shippingType,
        userId: props.userId,
        loginId: 1234,
        userName: props.userName,
        requestedphoneNumber: state.requestedphoneNumber,
        shippingEmail: state.shippingEmail,
        tracking: state.tracking,
        lines: lineData,
      }
    );
    equipment_rad_ref.current?.scrollIntoView({ behavior: "smooth" });
    setState((prevState) => ({
      ...prevState,
      returnReqValue: headers_data.data.curr_val_header[0][0],
      openBackdrop: false,
      servityType: "success",
      alertMsg: "Your request is saved",
      openSnackbar: true,
      saveBtnClicked: true,
      status: "Draft",
    }));
  };

  React.useEffect(() => {
    if (state.fromSiteTextValue.length >= 3) {
      setState((prevState) => ({
        ...prevState,
        openBackdrop: true,
      }));
      axios
        .post(
          "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/fromSite",
          {
            operatingNumber: props.operatingUnitNumber,
            search_string: state.fromSiteTextValue.toUpperCase(),
          }
        )
        .then((response) => {
          console.log(response.data.data);
          setState((prevState) => ({
            ...prevState,
            shipFromSite: response.data.data,
            openBackdrop: false,
          }));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [state.fromSiteTextValue]);

  React.useEffect(() => {
    if (state.fromSiteValue && state.fromSiteValue !== "") {
      setState((prevState) => ({
        ...prevState,
        orgId: state.fromSiteValue.org_id,
        orgValue: state.fromSiteValue.org_value,
      }));
    }
  }, [state.fromSiteValue]);

  React.useEffect(() => {
    if (state.orgId && state.orgId !== "") {
      setState((prevState) => ({
        ...prevState,
        openBackdrop: true,
      }));
      let org_name = state.orgValue.split("(");
      axios
        .post(
          "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/shipFromAddress",
          {
            org_id: state.orgId,
            operatingUnitNumber: props.operatingUnitNumber,
            org_name: org_name[0],
          }
        )
        .then((response) => {
          console.log(response);
          setState((prevState) => ({
            ...prevState,
            shipFromAddresses: response.data.addresses,
            shipTo: response.data.shipTo,
            shipToId: response.data.shipToID,
            toRad: response.data.toRad,
            toRadId: response.data.toRadId,
            shipmentMethods: response.data.shipping_methods,
            openBackdrop: false,
          }));
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [state.orgId]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (
        state.return_request_number !== "" &&
        state.return_request_number !== null
      ) {
        setState((prevState) => ({
          ...prevState,
          openStatusBackdrop: true,
        }));
        try {
          const response = await axios.post(
            "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/retryForStatus",
            {
              header_id: state.returnReqValue,
            }
          );
          setState((prevState) => ({
            ...prevState,
            status: response.data.submit_status,
          }));
          if (response.data.submit_status === "Approved") {
            setState((prevState) => ({
              ...prevState,
              openStatusBackdrop: false,
            }));
            clearInterval(intervalId);
          }
        } catch (err) {
          console.log("error retrying for request number", err);
        }
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [state.return_request_number]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",

        "&::-webkit-scrollbar": {
          height: "5px",
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "var(--secondary-grey-300, #F4F7FE)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#39B8FF",
          borderRadius: "10px",
        },
      }}
    >
      <Dialog onClose={handleCloseDialog} open={state.showBarCodeComponent}>
        <DialogTitle>Scan BarCode</DialogTitle>
        <DialogContent>
          {state.showBarCodeComponent && (
            <BarcodeScannerComponent
              width={400}
              height={400}
              onUpdate={(err, result) => onUpdateScreen(err, result)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{
          zIndex: 100,
          backgroundColor: "rgba(255, 250, 250, 0.5)",
          opacity: "0.5",
        }}
        open={state.openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress sx={{ color: "#F28500" }} />
      </Backdrop>
      <Snackbar
        open={state.openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={state.servityType}
          sx={{ width: "100%" }}
        >
          {state.alertMsg}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          height: "25%",
          width: "100%",
          paddingTop: "1%",
          backgroundImage: "url(/assets/header_bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack direction="row" justifyContent="space-between" padding="1%">
          <Typography
            fontFamily="Gilroy"
            fontWeight={"600"}
            color="white"
            fontSize="1.5rem"
            ref={equipment_rad_ref}
          >
            Equipments Return to RAD
          </Typography>
          <Stack direction="row">
            <Typography fontFamily="Gilroy" fontWeight="600" color="white">
              Oracle Job :
            </Typography>
            <Typography
              fontFamily="Gilroy"
              fontWeight="600"
              color="white"
              width="100px"
            >
              {state.return_request_number}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          width="25%"
          justifyContent="space-around"
          padding="1%"
          marginTop="1%"
        >
          <Typography fontFamily="Gilroy" fontWeight="600" color="white">
            Request # : {state.returnReqValue}
          </Typography>
          <Box
            sx={{
              background: "#FFBB5C",
              padding: "1%",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              position: "relative",
            }}
          >
            <Typography fontFamily="Gilroy" color="#131921" fontWeight="1000">
              {state.status}
            </Typography>
          </Box>
          {state.openStatusBackdrop && (
            <CircularProgress size="1.5rem" sx={{ color: "#ffffff" }} />
          )}
        </Stack>
      </Box>
      <Stack
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        marginTop="2%"
      >
        <Paper sx={{ width: "90%", padding: "1%" }}>
          <Grid container columnSpacing={2} rowSpacing={4} xs={12}>
            <Grid item xs={3}>
              <Typography fontFamily="Gilroy" color="white">
                From Site
              </Typography>
              <Autocomplete
                freeSolo
                disabled={state.submitBtnClicked}
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
                options={state.shipFromSite}
                size="small"
                getOptionLabel={(shipFromSite) => shipFromSite.org_value}
                value={state.fromSiteValue}
                onChange={(event, newValue) => {
                  setState((prevState) => ({
                    ...prevState,
                    fromSiteValue: newValue,
                  }));
                }}
                inputValue={state.fromSiteTextValue}
                onInputChange={(event, newInputValue) => {
                  setState((prevState) => ({
                    ...prevState,
                    fromSiteTextValue: newInputValue,
                  }));
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
                    label="From(Site/Dept)"
                    value={state.fromSiteTextValue}
                    name="fromSiteTextValue"
                    onChange={(e) => handleChange(e)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography fontFamily="Gilroy" color="white">
                Ship From Address
              </Typography>
              <Autocomplete
                freeSolo
                disabled={state.submitBtnClicked}
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
                options={state.shipFromAddresses}
                size="small"
                getOptionLabel={(shipFromAddresses) =>
                  shipFromAddresses.ship_from_org_value
                }
                value={state.shipFromAddressValue}
                onChange={(event, newValue) => {
                  setState((prevState) => ({
                    ...prevState,
                    shipFromAddressValue: newValue,
                  }));
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
                    placeholder="Ship from Address"
                    label="Ship from Address"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3} marginTop={2} marginLeft={2}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                label="Type"
                value={state.typeValue}
                name="typeValue"
                onChange={(e) => handleChange(e)}
              >
                <FormControlLabel
                  disabled={state.submitBtnClicked}
                  value="Return"
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      fontFamily="Gilroy"
                      fontSize="0.9rem"
                      fontWeight="1000"
                    >
                      Return
                    </Typography>
                  }
                />
                <FormControlLabel
                  disabled={state.submitBtnClicked}
                  value="Repair"
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      fontFamily="Gilroy"
                      fontSize="0.9rem"
                      fontWeight="1000"
                    >
                      Repair
                    </Typography>
                  }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <TextField
                disabled={state.submitBtnClicked}
                sx={{
                  input: { color: "#373839" },
                  "& fieldset": { border: "none" },
                  width: "100%",
                }}
                size="small"
                InputLabelProps={{
                  style: {
                    color: "#7B7E94",
                    fontWeight: "500",
                  },
                }}
                variant="outlined"
                value={state.toRad}
                name="toRad"
                label="To RAD *"
                InputProps={{
                  style: {
                    fontWeight: "700",
                    fontFamily: "Gilroy",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={state.submitBtnClicked}
                sx={{
                  input: { color: "#373839" },
                  "& fieldset": { border: "none" },
                  width: "100%",
                }}
                size="small"
                InputLabelProps={{
                  style: {
                    color: "#7B7E94",
                    fontWeight: "500",
                  },
                }}
                variant="outlined"
                value={state.shipTo}
                name="shipTo"
                label="Ship to Address *"
                InputProps={{
                  style: {
                    fontWeight: "600",
                    fontFamily: "Gilroy",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                disabled={state.submitBtnClicked}
                value={state.reasonValue}
                name="reasonValue"
                placeholder="Reason"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleChange(e)}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "") {
                    return <Typography color="GrayText">Reason</Typography>;
                  }
                  return selected;
                }}
              >
                <MenuItem value="Excess Equipment Return">
                  Excess Equipment Return
                </MenuItem>
                <MenuItem value="Return">Return</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                disabled={state.submitBtnClicked}
                placeholder="Comment"
                variant="outlined"
                value={state.commentValue}
                name="commentValue"
                size="small"
                onChange={(e) => handleChange(e)}
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
                disabled={state.submitBtnClicked}
                sx={{
                  input: { color: "#373839" },
                  width: "100%",
                  "& fieldset": { border: "none" },
                }}
                InputLabelProps={{
                  style: {
                    color: "#7B7E94",
                    fontWeight: "500",
                  },
                }}
                variant="outlined"
                size="small"
                label="Created by"
                value={state.createdBy}
                name="createdBy"
                InputProps={{
                  style: {
                    fontWeight: "700",
                    fontFamily: "Gilroy",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                disabled={state.submitBtnClicked}
                sx={{
                  input: { color: "#373839" },
                  width: "100%",
                  "& fieldset": { border: "none" },
                }}
                InputLabelProps={{
                  style: {
                    color: "#7B7E94",
                    fontWeight: "500",
                  },
                }}
                size="small"
                variant="outlined"
                label="Creation Date"
                value={state.creationDate}
                name="creationDate"
                InputProps={{
                  style: {
                    fontWeight: "700",
                    fontFamily: "Gilroy",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Stack>
      <Paper
        sx={{
          width: "92%",
          marginTop: "2%",
          padding: "1",
          marginLeft: "4%",
        }}
      >
        <Accordion fullWidth>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontFamily="Gilroy">Shipment Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  freeSolo
                  disabled={state.submitBtnClicked}
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "5px",
                    "&.Mui-focused .MuiOutlinedInput-root": {
                      paddingRight: "10px!important",
                    },
                  }}
                  size="small"
                  options={state.shipmentMethods}
                  getOptionLabel={(shipmentMethods) =>
                    shipmentMethods.shipping_method
                  }
                  value={state.shippingMethod}
                  onChange={(event, newValue) => {
                    setState((prevState) => ({
                      ...prevState,
                      shippingMethod: newValue,
                    }));
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
                      label="Shipping Method"
                      required={true}
                      placeholder="Shipping Method"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled={state.submitBtnClicked}
                  placeholder="Tracking#"
                  label="Tracking#"
                  variant="outlined"
                  size="small"
                  required={true}
                  value={state.tracking}
                  name="tracking"
                  onChange={(e) => handleChange(e)}
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
                <Select
                  disabled={state.submitBtnClicked}
                  value={state.shippingType}
                  name="shippingType"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === "") {
                      return (
                        <Typography color="GrayText">Shipping Type</Typography>
                      );
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="Parcel">Parcel</MenuItem>
                  <MenuItem value="Pallet">Pallet</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled={state.submitBtnClicked}
                  label="Requested Phone Number"
                  variant="outlined"
                  size="small"
                  value={state.requestedphoneNumber}
                  name="requestedphoneNumber"
                  onChange={(e) => handleChange(e)}
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
              <Grid item xs={4}>
                <TextField
                  disabled={state.submitBtnClicked}
                  label="Requested Email"
                  variant="outlined"
                  size="small"
                  value={state.shippingEmail}
                  name="shippingEmail"
                  onChange={(e) => handleChange(e)}
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
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Box
        sx={{
          width: "92%",
          marginTop: "2%",
          marginLeft: "4%",
          marginBottom: "2%",
        }}
      >
        <Accordion fullWidth>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="line-content"
            id="line-header"
          >
            <Typography fontFamily="Gilroy"> Line Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <Divider />
            </Stack>
            <Button
              variant="contained"
              disabled={state.submitBtnClicked}
              sx={{
                background: "#FFBB5C",
                marginTop: "1%",
                "&:hover": {
                  background: "#FFBB5C",
                },
                color: "#131921",
              }}
              onClick={handleAddNewLine}
            >
              + Add Line
            </Button>
            <ClickAwayListener onClickAway={() => handleExit()}>
              <TableContainer
                component={Paper}
                sx={{
                  minHeight: "120px",
                  maxHeight: "320px",
                  marginTop: "2%",
                  marginBottom: "2%",
                }}
              >
                <Table stickyHeader>
                  <TableHead stickyHeader sx={{ fontFamily: "Gilroy" }}>
                    <TableRow>
                      <TableCell
                        width="25%"
                        sx={{
                          color: "#7B7E94",
                          fontWeight: "550",
                          fontFamily: "Gilroy",
                          background: "#F6F5FA",
                        }}
                      >
                        Serial
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          color: "#7B7E94",
                          fontFamily: "Gilroy",
                          fontWeight: "550",
                          background: "#F6F5FA",
                        }}
                      >
                        Asset
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          color: "#7B7E94",
                          fontFamily: "Gilroy",
                          fontWeight: "550",
                          background: "#F6F5FA",
                        }}
                      >
                        Comment
                      </TableCell>
                      <TableCell
                        width="25%"
                        sx={{
                          color: "#7B7E94",
                          fontFamily: "Gilroy",
                          fontWeight: "550",
                          background: "#F6F5FA",
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
                            setState((prevState) => ({
                              ...prevState,
                              rowIndex: index,
                              columnIndex: 0,
                            }));
                          }}
                          sx={{
                            color: "#373839",
                            fontFamily: "Gilroy",
                            fontWeight: "550",
                          }}
                        >
                          {state.rowIndex === index &&
                          state.columnIndex === 0 ? (
                            <TextField
                              defaultValue={state.barCodeData}
                              disabled={state.submitBtnClicked}
                              value={row.serial_number}
                              focused
                              autoFocus
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => {
                                        setState((prevState) => ({
                                          ...prevState,
                                          openBarCodeDialog: true,
                                        }));
                                      }}
                                    >
                                      <CameraAltTwoToneIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
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
                            setState((prevState) => ({
                              ...prevState,
                              rowIndex: index,
                              columnIndex: 1,
                            }));
                          }}
                          sx={{
                            color: "#373839",
                            fontWeight: "550",
                            fontFamily: "Gilroy",
                          }}
                        >
                          {state.rowIndex === index &&
                          state.columnIndex === 1 ? (
                            <TextField
                              variant="outlined"
                              focused
                              autoFocus
                              disabled={state.submitBtnClicked}
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
                            setState((prevState) => ({
                              ...prevState,
                              rowIndex: index,
                              columnIndex: 2,
                            }));
                          }}
                          sx={{
                            color: "#373839",
                            fontWeight: "550",
                            fontFamily: "Gilroy",
                          }}
                        >
                          {state.rowIndex === index &&
                          state.columnIndex === 2 ? (
                            <TextField
                              defaultValue={row.comments}
                              fullWidth
                              focused
                              autoFocus
                              disabled={state.submitBtnClicked}
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
                            fontWeight: "550",
                          }}
                        >
                          <DeleteIcon
                            disabled={state.submitBtnClicked}
                            onClick={() => {
                              setLineData(
                                lineData.filter(
                                  (line, indexx) => indexx !== index
                                )
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ClickAwayListener>
          </AccordionDetails>
        </Accordion>

        <Stack
          justifyContent="flex-end"
          direction="row"
          paddingRight="1%"
          marginBottom="1%"
          marginTop="2%"
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
            disabled={state.submitBtnClicked}
            onClick={handleOnClickSave}
          >
            Save
          </Button>
          <Button
            disabled={!state.saveBtnClicked || state.submitBtnClicked}
            sx={{
              marginLeft: "25px",
              background: "#FFBB5C",
              borderRadius: "5px",
              color: "#131921",
              "&:hover": {
                backgroundColor: "#FFBB5C",
              },
            }}
            onClick={handleonCLickSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default ReturnForm;
