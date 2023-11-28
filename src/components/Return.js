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
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

const Return = () => {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    { field: "name", headerName: "Serial", width: 180, editable: true },
    { field: "asset", headerName: "Asset", width: 180, editable: true },
    { field: "comment", headerName: "Comments", width: 180, editable: true },
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
      width: 100,
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
            <InputLabel
              id="From-autoComplete"
              sx={{ fontSize: "18px", fontWeight: 600 }}
            >
              From
            </InputLabel>
            <Autocomplete
              id="free-solo-demo"
              labelId="From-autoComplete"
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
              options={top100Films.map((option) => option.title)}
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
                  // label="From"
                  placeholder="From(Site/Dept)"
                />
              )}
            />
          </Box>
          <Box>
            <InputLabel
              id="Shipto-autoComplete"
              sx={{ fontSize: "18px", fontWeight: 600 }}
            >
              To
            </InputLabel>
            <Autocomplete
              id="shipTo-solo-demo"
              labelId="Shipto-autoComplete"
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
              options={top100Films.map((option) => option.title)}
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
              id="outlined-read-only-to-rad"
              variant="standard"
              label="To RAD *"
              defaultValue="RAD1-OTIT-RAD-RAD-NA"
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
                // border: "1px solid red",
                width: "100%",
                // height: "60px",
              }}
              InputLabelProps={{
                style: {
                  color: "#7B7E94",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              }}
              id="outlined-read-only-ship-to-add"
              variant="standard"
              label="Ship to Address *"
              defaultValue="RAD1-Rapid Asset Deploy’t Whse"
              InputProps={{
                // readOnly: true,
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
            <FormControl sx={{ width: "100%" }}>
              <FormLabel
                sx={{
                  "& .MuiFormControl-root": {
                    "& .MuiFormLabel-root": {
                      //   border: "1px solid red",
                    },
                  },
                }}
              >
                Type
              </FormLabel>
              <RadioGroup
                sx={{ marginBottom: "8px" }}
                row
                // aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                // value={value}
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="return"
                  control={
                    <Radio
                      sx={{
                        color: "#D1D1D6",
                        "&.Mui-checked": {
                          color: "#373839",
                        },
                      }}
                    />
                  }
                  label="Return"
                  sx={{ color: "#373839" }}
                />
                <FormControlLabel
                  value="repair"
                  control={
                    <Radio
                      sx={{
                        color: "#D1D1D6",
                        "&.Mui-checked": {
                          color: "#373839",
                        },
                      }}
                    />
                  }
                  label="Repair"
                  sx={{
                    color: "#373839",
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-reason">Reason</InputLabel>

              <Select
                labelId="demo-simple-select-reason"
                id="demo-simple-select-reason"
                // value={"10"}
                label="Reason"
                InputLabelProps={{ shrink: true }}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Free text</MenuItem>
                <MenuItem value={20}>Free text</MenuItem>
                <MenuItem value={30}>Free text</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="comment-txtfield"
              label="Comment"
              variant="outlined"
              InputLabelProps={{ style: { color: "black" } }}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#F9A500",
                  },
                },
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
              id="outlined-read-only-createdby"
              variant="standard"
              label="Created by"
              defaultValue="Shiva Sankar"
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
              id="outlined-read-only-returnnumber"
              variant="standard"
              label="Return Request Number"
              defaultValue="1233252344632"
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
              id="outlined-read-only-creation-date"
              variant="standard"
              label="Creation Date"
              defaultValue="11-Nov-2023"
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-ship-method">
                Shipping Method *
              </InputLabel>

              <Select
                labelId="demo-simple-select-ship-method"
                id="demo-simple-select-ship-method"
                // value={"10"}
                label="Shipping Method *"
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
          <Grid item xs={3}>
            <TextField
              id="tracing-txtfield"
              label="Tracking *"
              variant="outlined"
              //   required={true}
              InputLabelProps={{ style: { color: "black" } }}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#F9A500",
                  },
                },
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
              id="req-phone-txtfields"
              label="Requested Phone Number"
              variant="outlined"
              //   required={true}
              inputLabelProps={{ style: { color: "black" } }}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#F9A500",
                  },
                },
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="req-email-txtfields"
              label="Requested Email"
              variant="outlined"
              //   required={true}
              inputLabelProps={{ style: { color: "black" } }}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#F9A500",
                  },
                },
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
          <Grid item xs={10}>
            <Typography> Line Details</Typography>
            <Divider sx={{ paddingTop: "10px" }} />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        {/* <EditToolbar /> */}
        <DataGrid
          sx={{
            marginLeft: "40px",
            marginRight: "40px",
          }}
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </Box>
  );
};

export default Return;
