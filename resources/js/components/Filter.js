import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { TextField, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function Filter() {
    const checkboxColor = {
        color: '#FF674D',
        '&.Mui-checked': {
        color: '#FF674D',
        }
    }

    const width = '30px'

    const AccordionStyle = {
        boxShadow: "none",
            '&:before': {
                display: 'none',
            }
    }

    return(
        <div className="filter">
            {/* <Typography sx={{mb:1}} fontWeight="bolder ">Price</Typography>
            <TextField sx={{
                '& legend': {display: 'none'}, 
                '& fieldset': {top: 0},
                width: {width},
                mr: 2,
            }} variant="outlined" InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>
            }}></TextField>
            <TextField size="small" sx={{
                '& legend': {display: 'none'}, 
                '& fieldset': {top: 0},
                width: {width}
            }} variant="outlined" InputProps={{
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>
            }}></TextField>
            <hr></hr> */}
            <Accordion sx={AccordionStyle} disableGutters={true} defaultExpanded={true}>
                <AccordionSummary sx={{
                pl: "0px"
                }} expandIcon={<ExpandMoreIcon />}>
                    <Typography className='fw-bolder'>Tipe Motif</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Manis"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Chakra"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Bhirawa"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Mindhi"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Duwo"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Chentil"/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <hr></hr>
            <Accordion sx={AccordionStyle} disableGutters={true} defaultExpanded={true}>
                <AccordionSummary sx={{
                pl: "0px"
                }} expandIcon={<ExpandMoreIcon />}>
                    <Typography className='fw-bolder'>Ukuran</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="S"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="M"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="ML"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="XL"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="XXL"/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <hr></hr>

        </div>
    )
}
