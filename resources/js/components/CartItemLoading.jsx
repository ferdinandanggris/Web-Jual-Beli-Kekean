import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    IconButton,
    Skeleton,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItemLoading() {
    const handleChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <Box pt={2} id="CartItem">
            <Grid container spacing={3}>
                <Grid item laptop={3}>
                    <Skeleton sx={{
                        width: { laptop: 90, desktop: 110 },
                        height: { laptop: 90, desktop: 110 },
                        ml: 2,
                    }} variant="rounded"/>
                </Grid>
                <Grid item laptop={9}>
                        <Box maxWidth={300}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                        </Box>
                        <Box mt={3} maxWidth={300}>
                            <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                        </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
