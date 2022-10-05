import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CatalogItem(props) {
    return (
        <>
        
            <Grid
                mobile={props.catalogPage ? 6 : 4}
                laptop={3}
                item
                px="0px"
                pt="10px"
            >
                <Box
                    sx={{
                        textDecoration: "none",
                    }}
                    component={Link}
                    to={`/products/${props.id}`}
                >
                    <Box
                        sx={{ width: "100%", maxHeight: '132px', objectFit: "cover" }}
                        component="img"
                        src={`../catalog/${props.image}`}
                    />
                    <Container
                        sx={{
                            border: "1px solid #D9D9D9",
                            borderTop: "none",
                            borderRadius: "0px 0px 10px 10px",
                            px: { mobile: 1, laptop: 2 },
                            textDecoration: "none",
                        }}
                    >
                        <Typography
                            sx={{ borderBottom: "0.5px solid #B0B0B0" }}
                            fontSize={{ mobile: 7, laptop: 12, desktop: 14 }}
                            pt={1}
                            pb={0.5}
                            fontWeight="500"
                            color={"#000000"}
                        >
                            {props.nama}
                        </Typography>
                        <Typography
                            fontWeight="500"
                            fontSize={{ mobile: 7, laptop: 12, desktop: 14 }}
                            pt={0.5}
                            pb={0.5}
                            color={"#000000"}
                        >{`Rp. ${Number(props.harga.toLocaleString('en-US'))}`}</Typography>
                        <Typography
                            fontWeight="500"
                            sx={{ color: "rgb(0,0,0,41%)" }}
                            pb={1}
                            fontSize={{ mobile: 7, laptop: 10, desktop: 15 }}
                        >
                            {props.description}
                        </Typography>
                    </Container>
                </Box>
            </Grid>
        </>
    );
}
