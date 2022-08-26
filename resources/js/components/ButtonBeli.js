import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ButtonBeli() {
    return (
        <Box component={Link} to={'/payment'} sx={{textDecoration: 'none'}}>
            <Button
                sx={{
                    display: {
                        mobile: "none",
                        laptop: "block",
                    },
                    px: 1,
                    mt: 3,
                }}
                variant="contained"
                color="primary"
                disableElevation
            >
                <Typography
                    fontSize={{ desktop: 15 }}
                    variant="button"
                    color="white"
                    sx={{textDecoration: 'none'}}
                >
                    Beli Sekarang
                </Typography>
                <Typography
                    pl={0.5}
                    fontSize={{ desktop: 17, laptop: 14 }}
                    color="white"
                    className="bx bx-shopping-bag"
                ></Typography>
            </Button>
        </Box>
    );
}
