import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {
    TextField,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Filter() {
    const checkboxColor = {
        color: "primary.main",
        "&.Mui-checked": {
            color: "primary",
        },
    };
    

    const width = "30px";

    const AccordionStyle = {
        boxShadow: "none",
        backgroundColor: "#00000000",
        "&:before": {
            display: "none",
        },
    };

    return (
        <Box>
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
            <Accordion
                elevation={0}
                sx={AccordionStyle}
                disableGutters={true}
                defaultExpanded={false}
            >
                <AccordionSummary
                    sx={{
                        pl: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography fontSize={{laptop: 15, desktop: 17}} className="fw-bolder">Tipe Motif</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox sx={checkboxColor} />}
                            label={<Typography fontSize={{laptop: 12, desktop: 17}}>Manis</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={checkboxColor} />}
                            label={<Typography fontSize={{laptop: 12, desktop: 17}}>Chakra</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={checkboxColor} />}
                            label={<Typography fontSize={{laptop: 12, desktop: 17}}>Bhirawa</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={checkboxColor} />}
                            label={<Typography fontSize={{laptop: 12, desktop: 17}}>Mindhi</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={checkboxColor} />}
                            label={<Typography fontSize={{laptop: 12, desktop: 17}}>Duwo</Typography>}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={checkboxColor} />}
                            label={<Typography fontSize={{laptop: 12, desktop: 17}}>Chentil</Typography>}
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <hr></hr>
            <Accordion
                sx={AccordionStyle}
                disableGutters={true}
                defaultExpanded={false}
            >
                <AccordionSummary
                    sx={{
                        pl: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography fontSize={{laptop: 15, desktop: 17}} className="fw-bolder">Ukuran</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                            <FormControlLabel
                                control={<Checkbox sx={checkboxColor} />}
                                label={<Typography fontSize={{laptop: 12, desktop: 17}}>S</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox sx={checkboxColor} />}
                                label={<Typography fontSize={{laptop: 12, desktop: 17}}>M</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox sx={checkboxColor} />}
                                label={<Typography fontSize={{laptop: 12, desktop: 17}}>ML</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox sx={checkboxColor} />}
                                label={<Typography fontSize={{laptop: 12, desktop: 17}}>XL</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox sx={checkboxColor} />}
                                label={<Typography fontSize={{laptop: 12, desktop: 17}}>XXL</Typography>}
                            />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <hr></hr>
        </Box>
    );
}
