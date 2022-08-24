import React from "react";
import { Button, Typography } from "@mui/material";

export default function ButtonBeli() {
    return (
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
    );
}
