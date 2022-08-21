import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function CatalogItem(props) {
    return (
        <>
            <Grid mobile={4} laptop={3} item px="0px" pt="10px">
                <Box
                    sx={{ width: "100%" }}
                    component="img"
                    src={`../images/catalog-${props.item}.png`}
                />
                <Container
                    sx={{
                        border: "1px solid #D9D9D9",
                        borderTop: "none",
                        borderRadius: "0px 0px 10px 10px",
                        px: {mobile: 1, laptop: 3}
                    }}
                >
                    <Typography
                        sx={{ borderBottom: "0.5px solid #B0B0B0" }}
                        fontSize={{ mobile: 7, laptop: 18 }}
                        pt={1}
                        pb={0.5}
                        fontWeight="500"
                    >
                        {props.nama}
                    </Typography>
                    <Typography
                        fontWeight="500"
                        fontSize={{ mobile: 7, laptop: 18 }}
                        pt={0.5}
                        pb={1}
                    >{`Rp. ${props.harga.toLocaleString()}`}</Typography>
                    <Typography
                        fontWeight="500"
                        sx={{ color: "rgb(0,0,0,41%)" }}
                        pb={1}
                        fontSize={{ mobile: 5, laptop: 12, desktop: 15 }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        .
                    </Typography>
                </Container>
            </Grid>
        </>
    );
}
