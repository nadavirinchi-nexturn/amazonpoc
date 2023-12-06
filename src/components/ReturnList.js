import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ReturnList = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}>
        <Box sx={{ height: '30%', background: '#131921', width: '100%', paddingTop: '1%' }}>
          <Stack direction='row' alignItems='center' justifyContent='space-around'>
            <Typography fontFamily='Gilroy' color='white' fontWeight='1000'>Returns RAD</Typography>
            <TextField 
              placeholder="Request Number"
              variant="outlined"
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
                }
              }}
            />
            <TextField 
              placeholder="From Date"
              variant="outlined"
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
                }
              }}
            />
            <TextField 
              placeholder="To Date"
              variant="outlined"
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
                }
              }}
            />
            <TextField 
              placeholder="Created by"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                "&.Mui-focused .MuiOutlinedInput-root": {
                  paddingRight: "10px!important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFBB5C",
                }
              }}
            />
            <Button
              sx={{
                background: '#FFBB5C',
                textTransform: 'none',
                color: '#131921',
                "&:hover": {
                  background: '#FFBB5C'
                },
                height: '40px',
                width: '100px'
              }}
            >Search</Button>
          </Stack>
        </Box>
    </Box>
  )
}

export default ReturnList