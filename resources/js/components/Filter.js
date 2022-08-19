import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { TextField, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';



export default function Filter() {
    const checkboxColor = {
        color: '#FF674D',
        '&.Mui-checked': {
        color: '#FF674D',
        }
    }

    const width = '30px'

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
            <Accordion defaultExpanded="true">
                <AccordionSummary>
                    <Typography className='fw-bolder'>Tipe Motif</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Manis"/>
                        <FormControlLabel control={<Checkbox sx={checkboxColor}/>} label="Chakra"/>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters="true" defaultExpanded="true">
                <AccordionSummary>
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

        </div>
    )
}
