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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import axios from "axios";
import moment from "moment/moment";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    serial: "4324325ew4355",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    serial: "432sdfser5ww445",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    serial: "5434wgdsgdskj90g",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    serial: "43489edfjdfksdf08djkg",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
    serial: "kdsjk90o3keo9if",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [{ id, name: "", age: "", isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Line
      </Button>
    </GridToolbarContainer>
  );
}

const Return = (props) => {

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [shipFromSite, setShipFromSite] = React.useState([])
  const [fromSiteValue, setFromSiteValue] = React.useState({ org_value: '', org_id: '' })
  const [fromSiteTextValue, setFromSiteTextValue] = React.useState('')

  const [orgId, setOrgId] = React.useState('')
  const [orgValue, setOrgValue] = React.useState('')

  const [shipFromAddresses, setShipFromAddresses] = React.useState([])
  const [shipFromAddressValue, setShipFromAddresseValue] = React.useState('')
  const [toRad, setToRad] = React.useState('')
  const [shipTo, setShipTo] = React.useState('')

  const [typeValue, setTypeValue] = React.useState('return')
  const [reasonValue, setReasonValue] = React.useState('')

  const [commentValue, setCommentValue] = React.useState('')
  const [returnReqValue, setReturnReqValue] = React.useState('')
  const [createdBy, setCreatedBy] = React.useState(props.userName.toUpperCase())
  const [creationDate, setCreationDate] = React.useState(moment(Date.now()).format('DD_MMM_YYYY'))

  const [shipmentMethods, setShipmentMethods] = React.useState([])
  const [shippingMethod, setShippingMethod] = React.useState('')
  const [tracking, setTracking] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [shippingEmail, setShippingEmail] = React.useState('')

  const handleonCLickSubmit = () => {}
  const handleOnCLickCancel = () => {}
  const handleOnClickSave = () => {
    console.log('fromSiteValue', fromSiteValue)
    console.log('shipFromAddressValue', shipFromAddressValue)
    console.log('toRad', toRad)
    console.log('shipTo', shipTo)
    console.log('reasonValue', reasonValue)
    console.log('commentValue', commentValue)
    console.log('createdBy', createdBy)
    console.log('creationDate', creationDate)
    console.log('shippingMethod', shippingMethod)
    console.log('tracking', tracking)
    console.log('phoneNumber', phoneNumber)
    console.log('shippingEmail', shippingEmail)
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "serial",
      headerName: "Serial",
      width: 340,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "asset",
      headerName: "Asset",
      headerAlign: "center",
      width: 300,
      fullWidth: true,
      editable: true,
      align: "center",
    },
    {
      field: "comment",
      headerName: "Comments",
      width: 320,
      fullWidth: true,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 80,
    //   align: "left",
    //   headerAlign: "left",
    //   editable: true,
    // },
    // {
    //   field: "joinDate",
    //   headerName: "Join date",
    //   type: "date",
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: "role",
    //   headerName: "Department",
    //   width: 220,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: ["Market", "Finance", "Development"],
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      // width: 100,
      fullWidth: true,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    if(fromSiteTextValue.length >= 3){
      axios.post('http://localhost:3000/amazonpoc/returns/fromSite', { operatingNumber: props.operatingUnitNumber, search_string: fromSiteTextValue.toUpperCase() })
      .then((response) => {
        console.log(response.data.data)
        setShipFromSite(response.data.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
    }
  }, [fromSiteTextValue])

  React.useEffect(() => {
    if(fromSiteValue && fromSiteValue !== ''){
      setOrgId(fromSiteValue.org_id)
      setOrgValue(fromSiteValue.org_value)
    }
  }, [fromSiteValue])

  React.useEffect(() => {
    if(orgId && orgId !== ''){
      let org_name = orgValue.split('(')
      axios.post('http://localhost:3000/amazonpoc/returns/shipFromAddress', {
        org_id: orgId,
        operatingUnitNumber: props.operatingUnitNumber,
        org_name: org_name[0]
      }).then((response) => {
        console.log(response)
        setShipFromAddresses(response.data.addresses)
        setShipTo(response.data.shipTo)
        setToRad(response.data.toRad)
        setShipmentMethods(response.data.shipping_methods)
      }).catch((err) => {
        console.log('error', err)
      })
    }
  }, [orgId])

  return (
    <Box className="return-main-container">
      <Box className="banner-container">
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
        </Stack>
        <Stack className="stack-from" spacing={2} direction={"row"}>
          <Box>
            <InputLabel sx={{ fontSize: "18px", fontWeight: 600 }}>From</InputLabel>
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
            <InputLabel sx={{ fontSize: "18px", fontWeight: 600 }}>To</InputLabel>
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
              <FormControlLabel value="return" control={<Radio />} label="Return" />
              <FormControlLabel value="repair" control={<Radio />} label="Repair" />
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={3}>
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
                <MenuItem value='Excess Equipment Return'>Excess Equipment Return</MenuItem>
                <MenuItem value='Return'>Return</MenuItem>
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
          </Grid>
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
                labelId="demo-simple-select-ship-type"
                id="demo-simple-select-ship-type"
                // value={"10"}
                label="Shipping Type *"
                InputLabelProps={{ shrink: true }}
                // onChange={handleChange}
                required={true}
              >
                <MenuItem value={10}>Free text</MenuItem>
                <MenuItem value={20}>Free text</MenuItem>
                <MenuItem value={30}>Free text</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <TextField
              label="Requested Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
        <Grid container p={5} direction="row" columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography> Line Details</Typography>
            <Divider sx={{ paddingTop: "10px" }} />
          </Grid>
        </Grid>
        {/* <EditToolbar /> */}
        <DataGrid
          sx={{
            marginLeft: "40px",
            marginRight: "40px",
            marginBottom: "10px",
          }}
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          disableRowSelectionOnClick={true}
          hideFooterSelectedRowCount
          hideFooterPagination
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
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
              backgroundColor: '#E8EFFD'
            }
          }}
          variant="contained"
          onClick={handleOnCLickCancel}
        >
          Cancel
        </Button>
        <Button sx={{ 
          marginLeft: "15px", 
          border: "1px solid black", 
          color: "black" 
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
              backgroundColor: '#F9A500'
            }
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
