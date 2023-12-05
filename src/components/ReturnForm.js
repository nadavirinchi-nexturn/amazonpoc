/* eslint-disable react-hooks/exhaustive-deps */
import { 
    Alert,
    Autocomplete, 
    Backdrop, 
    Box, 
    Button, 
    CircularProgress, 
    ClickAwayListener, 
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
    Typography 
} from '@mui/material'
import React from 'react'
import './styles/fonts.css'
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment/moment";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

const ReturnForm = (props) => {

    const [lineData, setLineData] = React.useState([])
    const [state, setState] = React.useState({
        toRad: '',
        shipTo: '',
        typeValue: 'return',
        reasonValue: '',
        commentValue: '',
        createdBy: props.userName.toUpperCase(),
        returnReqValue: '',
        creationDate: moment(Date.now()).format("DD-MMM-YYYY"),
        shippingEmail: '',
        requestedphoneNumber: '',
        shippingType: '',
        tracking: '',
        orgId: '',
        orgValue: '',
        shipToId: '',
        toRadId: '',
        fromSiteValue: { org_value: "", org_id: "" },
        fromSiteTextValue: '',
        shipFromSite: [],
        shipFromAddresses: [],
        shipmentMethods: [],
        rowIndex: -1,
        columnIndex: -1,
        shippingMethod: { shipping_method_code: "", shipping_method: "" },
        shipFromAddressValue: { ship_from_org_value: "", ship_from_org_id: "" },
        openBackdrop: false,
        openSnackbar: false,
        alertMsg: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState ((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddNewLine = () => {
        setLineData((oldRecord) => [
          { serial_number: "", asset_number: "", comments: "" },
          ...oldRecord,
        ]);
    };

    const handleExit = () => {
        setState(prevState => ({
            ...prevState,
            rowIndex: -1,
            columnIndex: -1
        }))
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
        setState(prevState => ({
            ...prevState,
            openBackdrop: false
        }))
    };
    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setState(prevState => ({
            ...prevState,
            openBackdrop: false,
            openSnackbar: false
        }))
    };

    const handleonCLickSubmit = async () => {
        setState(prevState => ({
            ...prevState,
            openBackdrop: true,
        }))
        try{
            await axios.post('https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/submitAll', {
                header_id: state.returnReqValue,
                userName: props.userName.toUpperCase()
            })
        }catch(err){
            console.log('error', err)
        }
        setState(prevState => ({
            ...prevState,
            openBackdrop: false,
        }))
    };

    const handleOnCLickCancel = () => {
        console.log('state', state)
        console.log('lineData', lineData)
    };

    const handleOnClickSave = async () => {
        setState(prevState => ({
            ...prevState,
            openBackdrop: true
        }))
        if (state.fromSiteValue.org_id === "") {
            setState(prevState => ({
                ...prevState,
                alertMsg: "please select From site",
                openSnackbar: true
            }))
            return;
        }
      
        if (state.shipFromAddressValue.ship_from_org_id === "") {
            setState(prevState => ({
                ...prevState,
                alertMsg: "please select ship from address",
                openSnackbar: true
            }))
            return;
        }
    
        if (state.shippingMethod.shipping_method_code === "") {
            setState(prevState => ({
                ...prevState,
                alertMsg: "please select shipping method",
                openSnackbar: true
            }))
            return;
        }
    
        if (state.tracking === "") {
            setState(prevState => ({
                ...prevState,
                alertMsg: "please fill tracking number",
                openSnackbar: true
            }))
            return;
        }
    
        if (state.shippingType === "") {
            setState(prevState => ({
                ...prevState,
                alertMsg: "please select shipping type",
                openSnackbar: true
            }))
            return;
        }
    
        if (lineData.length === 0) {
            setState(prevState => ({
                ...prevState,
                alertMsg: "please provide Line",
                openSnackbar: true
            }))
            return;
        }
    
        setState(prevState => ({
            ...prevState,
            alertMsg: "",
        }))
      
        let headers_data = await axios.post(
        "https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/saveHeaders",
        {
            fromSiteValue: state.fromSiteValue,
            shipFromAddressValue: state.shipFromAddressValue,
            toRad: state.toRad,
            toRadID: state.toRadID,
            shipTo: state.shipTo,
            shipToID: state.shipToID,
            typeValue: state.typeValue,
            reasonValue: state.reasonValue,
            commentValue: state.commentValue,
            status: state.status,
            createdBy: props.userId,
            creationDate: state.creationDate,
            shippingMethod: state.shippingMethod,
            shippingType: state.shippingType,
            userId: props.userId,
            loginId: 1234,
            userName: props.userName,
            requestedphoneNumber: state.requestedphoneNumber,
            shippingEmail: state.shippingEmail,
            lines: lineData,
        }
        );
        setState(prevState => ({
            ...prevState,
            returnReqValue: headers_data.data.curr_val_header[0][0],
            openBackdrop: false
        }))
    }

    React.useEffect(() => {
        if (state.fromSiteTextValue.length >= 3) {
          setState(prevState => ({
            ...prevState,
            openBackdrop: true
          }))
          axios
            .post("https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/fromSite", {
              operatingNumber: props.operatingUnitNumber,
              search_string: state.fromSiteTextValue.toUpperCase(),
            })
            .then((response) => {
              console.log(response.data.data);
              setState(prevState => ({
                ...prevState,
                shipFromSite: response.data.data,
                openBackdrop: false
              }))
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      }, [state.fromSiteTextValue]);
    
      React.useEffect(() => {
        if (state.fromSiteValue && state.fromSiteValue !== "") {
            setState(prevState => ({
                ...prevState,
                orgId: state.fromSiteValue.org_id,
                orgValue: state.fromSiteValue.org_value
            }))
        }
      }, [state.fromSiteValue]);
    
      React.useEffect(() => {
        if (state.orgId && state.orgId !== "") {
            setState(prevState => ({
                ...prevState,
                openBackdrop: true
            }))
          let org_name = state.orgValue.split("(");
          axios
            .post("https://fzafkcdsd7.execute-api.us-east-1.amazonaws.com/dev/amazonpoc/returns/shipFromAddress", {
              org_id: state.orgId,
              operatingUnitNumber: props.operatingUnitNumber,
              org_name: org_name[0],
            })
            .then((response) => {
              console.log(response);
              setState(prevState => ({
                ...prevState,
                shipFromAddresses: response.data.addresses,
                shipTo: response.data.shipTo,
                shipToId: response.data.shipToID,
                toRad: response.data.toRad,
                toRadId: response.data.toRadId,
                shipmentMethods: response.data.shipping_methods,
                openBackdrop: false
              }))
            })
            .catch((err) => {
              console.log("error", err);
            });
        }
      }, [state.orgId]);


  return (
    <Box sx={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}>
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
            {state.alertMsg}
          </Alert>
        </Snackbar>
        <Box 
            sx={{ 
                height: '20%', 
                width: '100%', 
                background: '#131921',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around' 
            }}
        >
            <Stack>
                <Typography fontFamily='Gilroy' color='white'>From Site</Typography>
                <Autocomplete
                    freeSolo
                    sx={{
                        width: '320px',
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                        "&.Mui-focused .MuiOutlinedInput-root": {
                            paddingRight: "10px!important",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FFBB5C",
                        }
                    }}
                    options={state.shipFromSite}
                    size='small'
                    getOptionLabel={(shipFromSite) => shipFromSite.org_value}
                    value={state.fromSiteValue}
                    onChange={(event, newValue) => {
                        setState(prevState => ({
                            ...prevState,
                            fromSiteValue: newValue
                        }))
                    }}
                    inputValue={state.fromSiteTextValue}
                    onInputChange={(event, newInputValue) => {
                        setState(prevState => ({
                            ...prevState,
                            fromSiteTextValue: newInputValue
                        }))
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
                            value={state.fromSiteTextValue}
                            name='fromSiteTextValue'
                            onChange={(e) => handleChange(e)}
                        />
                    )}
                />
            </Stack>
            <Stack>
                <Typography fontFamily='Gilroy' color='white'>Ship From Address</Typography>
                <Autocomplete
                    freeSolo
                    sx={{
                        width: "320px",
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                        "&.Mui-focused .MuiOutlinedInput-root": {
                            paddingRight: "10px!important",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FFBB5C",
                        }
                    }}
                    options={state.shipFromAddresses}
                    size='small'
                    getOptionLabel={(shipFromAddresses) =>
                        shipFromAddresses.ship_from_org_value
                    }
                    value={state.shipFromAddressValue}
                    onChange={(event, newValue) => {
                        setState(prevState => ({
                            ...prevState,
                            shipFromAddressValue: newValue
                        }))
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
            </Stack>
            <Stack direction='row' alignItems='center' width='25%' justifyContent='space-around'>
                <Typography fontFamily='Gilroy' color='white'>Equipments Return to RAD</Typography>
                <Box sx={{ background: '#FFBB5C', padding: '1%', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px' }}>
                    <Typography fontFamily='Gilroy' color='#131921' fontWeight='1000'>Draft</Typography>
                </Box>
            </Stack>
        </Box>
        <Stack direction='row' width='100%' justifyContent='space-around' marginTop='2%'>
            <Paper sx={{ width: '45%', padding: '1%'}}>
                <Grid container columnSpacing={2} rowSpacing={2} xs={12}>
                    <Grid item xs={12}>
                        <RadioGroup
                            row
                            label='Type'
                            value={state.typeValue}
                            name='typeValue'
                            onChange={(e) => handleChange(e)}
                        >
                            <FormControlLabel
                                value="return"
                                control={<Radio size='small' />}
                                label={<Typography fontFamily='Gilroy' fontSize='0.9rem' fontWeight='1000'>Return</Typography>}
                            />
                            <FormControlLabel
                                value="repair"
                                control={<Radio size='small' />}
                                label={<Typography fontFamily='Gilroy' fontSize='0.9rem' fontWeight='1000'>Repair</Typography>}
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={{
                                input: { color: "#373839" },
                                "& fieldset": { border: "none" },
                                width: "100%",
                            }}
                            size='small'
                            InputLabelProps={{
                                style: {
                                    color: "#7B7E94",
                                    fontWeight: "500",
                                },
                            }}
                            variant="outlined"
                            value={state.toRad}
                            name='toRad'
                            label="To RAD *"
                            InputProps={{
                                style: {
                                    fontWeight: "700",
                                    fontFamily: "Gilroy",
                                    fontSize: '0.9rem'
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={{
                                input: { color: "#373839" },
                                "& fieldset": { border: "none" },
                                width: "100%",
                            }}
                            size='small'
                            InputLabelProps={{
                                style: {
                                    color: "#7B7E94",
                                    fontWeight: "500",
                                },
                            }}
                            variant="outlined"
                            value={state.shipTo}
                            name='shipTo'
                            label="Ship to Address *"
                            InputProps={{
                                style: {
                                    fontWeight: "600",
                                    fontFamily: "Gilroy",
                                    fontSize: '0.9rem'
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} marginTop='2%'>
                        <TextField
                            sx={{
                                input: { color: "#373839" },
                                "& fieldset": { border: "none" },
                                width: "100%",
                            }}
                            size='small'
                            InputLabelProps={{
                                style: {
                                    color: "#7B7E94",
                                    fontWeight: "500",
                                },
                            }}
                            variant="outlined"
                            value={state.returnReqValue}
                            name='returnReqValue'
                            label="Request Number"
                            InputProps={{
                                style: {
                                    fontWeight: "700",
                                    fontFamily: "Gilroy",
                                    fontSize: '0.9rem'
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} marginTop='2%'>
                        <TextField
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
                            size='small'
                            label="Created by"
                            value={state.createdBy}
                            name='createdBy'
                            InputProps={{
                                style: {
                                    fontWeight: "700",
                                    fontFamily: "Gilroy",
                                    fontSize: '0.9rem'
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} marginTop='2%'>
                        <TextField
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
                            size='small'
                            variant="outlined"
                            label="Creation Date"
                            value={state.creationDate}
                            name='creationDate'
                            InputProps={{
                                style: {
                                    fontWeight: "700",
                                    fontFamily: "Gilroy",
                                    fontSize: '0.9rem'
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            value={state.reasonValue}
                            name='reasonValue'
                            placeholder="Reason"
                            size='small'
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => handleChange(e)}
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected === "") {
                                  return <Typography color='GrayText'>Reason</Typography>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="Excess Equipment Return">Excess Equipment Return</MenuItem>
                            <MenuItem value="Return">Return</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            placeholder="Comment"
                            variant="outlined"
                            value={state.commentValue}
                            name='commentValue'
                            size='small'
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
                </Grid>
            </Paper>
            <Paper sx={{ width: '45%', padding: '1%' }}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                    <Grid item xs={12} marginBottom='1%'>
                        <Typography fontFamily='Gilroy'> Shipment Details</Typography>
                        <Divider sx={{ paddingTop: "10px" }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            freeSolo
                            sx={{
                                backgroundColor: "#ffffff",
                                borderRadius: "5px",
                                "&.Mui-focused .MuiOutlinedInput-root": {
                                    paddingRight: "10px!important",
                                },
                            }}
                            size='small'
                            options={state.shipmentMethods}
                            getOptionLabel={(shipmentMethods) =>
                                shipmentMethods.shipping_method
                            }
                            value={state.shippingMethod}
                            onChange={(event, newValue) => {
                                setState(prevState => ({
                                    ...prevState,
                                    shippingMethod: newValue
                                }))
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
                                    placeholder="Shipping Method"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            placeholder="Tracking"
                            variant="outlined"
                            size='small'
                            value={state.tracking}
                            name='tracking'
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
                    <Grid item xs={6}>
                        <Select
                            value={state.shippingType}
                            name='shippingType'
                            InputLabelProps={{ shrink: true }}
                            size='small'
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected === "") {
                                  return <Typography color='GrayText'>Shipping Type</Typography>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="Parcel">Parcel</MenuItem>
                            <MenuItem value="Pallet">Pallet</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Requested Phone Number"
                            variant="outlined"
                            size='small'
                            value={state.requestedphoneNumber}
                            name='requestedphoneNumber'
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
                    <Grid item xs={6}>
                        <TextField
                            label="Requested Email"
                            variant="outlined"
                            size='small'
                            value={state.shippingEmail}
                            name='shippingEmail'
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
            </Paper>
        </Stack>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%', marginBottom: '2%' }}>
            <Paper sx={{ width: '97%', padding: '1%' }}>
                <Stack>
                    <Typography fontFamily='Gilroy'> Line Details</Typography>
                    <Divider sx={{ paddingTop: "10px" }} />
                </Stack>
                <Button
                    variant="contained"
                    sx={{
                        background: "#FFBB5C",
                        marginTop: '1%',
                        '&:hover': {
                            background: "#FFBB5C",
                        },
                        color: '#131921'
                    }}
                    onClick={handleAddNewLine}
                >
                    + Add Line
                </Button>
                <ClickAwayListener onClickAway={() => handleExit()}>
                    <TableContainer component={Paper} sx={{ height: "320px", marginTop: '2%', marginBottom: '2%' }}>
                        <Table stickyHeader>
                            <TableHead stickyHeader sx={{ fontFamily: "Gilroy" }}>
                                <TableRow>
                                    <TableCell
                                        width="25%"
                                        sx={{
                                            color: "#7B7E94",
                                            fontWeight: "550",
                                            fontFamily: 'Gilroy',
                                            background: '#F6F5FA'
                                        }}
                                    >
                                        Serial
                                    </TableCell>
                                    <TableCell
                                        width="25%"
                                        sx={{
                                            color: "#7B7E94",
                                            fontFamily: 'Gilroy',
                                            fontWeight: "550",
                                            background: '#F6F5FA'
                                        }}
                                    >
                                        Asset
                                    </TableCell>
                                    <TableCell
                                        width="25%"
                                        sx={{
                                            color: "#7B7E94",
                                            fontFamily: 'Gilroy',
                                            fontWeight: "550",
                                            background: '#F6F5FA'
                                        }}
                                    >
                                        Comment
                                    </TableCell>
                                    <TableCell
                                        width="25%"
                                        sx={{
                                            color: "#7B7E94",
                                            fontFamily: 'Gilroy',
                                            fontWeight: "550",
                                            background: '#F6F5FA'
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
                                                setState(prevState => ({
                                                    ...prevState,
                                                    rowIndex: index,
                                                    columnIndex: 0
                                                }))
                                            }}
                                            sx={{
                                                color: "#373839",
                                                fontFamily: 'Gilroy',
                                                fontWeight: "550",
                                            }}
                                        >
                                            {state.rowIndex === index && state.columnIndex === 0 ? (
                                                <TextField
                                                    defaultValue={row.serial_number}
                                                    fullWidth
                                                    onChange={(event) =>handleSerialChange(index, "serial_number", event.target.value)}
                                                />
                                            ) : (row.serial_number)}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => {
                                                setState(prevState => ({
                                                    ...prevState,
                                                    rowIndex: index,
                                                    columnIndex: 1
                                                }))
                                            }}
                                            sx={{
                                                color: "#373839",
                                                fontWeight: "550",
                                                fontFamily: 'Gilroy'
                                            }}
                                        >
                                            {state.rowIndex === index && state.columnIndex === 1 ? (
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
                                                    onChange={(event) => handleAssetChange(index, "asset_number", event.target.value)}
                                                />
                                            ) : (row.asset_number)}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => {
                                                setState(prevState => ({
                                                    ...prevState,
                                                    rowIndex: index,
                                                    columnIndex: 2
                                                }))
                                            }}
                                            sx={{
                                                color: "#373839",
                                                fontWeight: "550",
                                                fontFamily: 'Gilroy'
                                            }}
                                        >
                                            {state.rowIndex === index && state.columnIndex === 2 ? (
                                            <TextField
                                                defaultValue={row.comments}
                                                fullWidth
                                                onChange={(event) => handleCommentChange(index, "comments", event.target.value)}
                                            />
                                            ) : (row.comments)}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: "#373839",
                                                fontWeight: "550",
                                            }}
                                        >
                                            <DeleteIcon
                                                onClick={() => { 
                                                    setLineData(lineData.filter((line, indexx) => indexx !== index))
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ClickAwayListener>
            </Paper>
        </Box>
        <Stack justifyContent='flex-end' direction='row' paddingRight='1%' marginBottom='1%'>
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
  )
}

export default ReturnForm