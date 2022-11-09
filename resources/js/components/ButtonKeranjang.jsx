import React from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";

export default function ButtonKeranjang({onClick, id}) {
    return (
            <Button
                id={id}
                onClick={onClick}
                sx={{
                    display: {
                        mobile: "none",
                        laptop: "flex",
                    },
                    px: 1,
                    mt: 3,
                    alignItems: 'center',
                }}
                variant="contained"
                color="secondary"
                disableElevation
            >
                <Typography
                    fontSize={{ desktop: 15 }}
                    variant="button"
                    color="white"
                    sx={{textDecoration: 'none'}}
                >
                    Tambahkan ke keranjang
                </Typography>
                <Typography
                    pl={0.5}
                    fontSize={{ desktop: 17, laptop: 14 }}
                    color="white"
                    className="bx bx-cart"
                ></Typography>
            </Button>
    );
}
