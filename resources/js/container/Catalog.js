import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CatalogItem from "../components/CatalogItem";

export default function Catalog() {
    return (
        <Box>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item>
                    <Typography
                        display={{ mobile: "block", laptop: "none" }}
                        fontWeight={"light"}
                        fontSize={18}
                        py={2}
                    >
                        Our Collection
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        spacing={1}
                        sx={{ display: { mobile: "flex", laptop: "none" } }}
                    >
                        <CatalogItem
                            nama="Batik Duwo"
                            item="1"
                            harga={599000}
                        />
                        <CatalogItem
                            nama="Batik Duwo"
                            item="1"
                            harga={599000}
                        />
                        <CatalogItem
                            nama="Batik Duwo"
                            item="1"
                            harga={599000}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        sx={{
                            display: { mobile: "block", laptop: "none" },
                            px: 1,
                            mt: { laptop: 8, mobile: 3 },
                        }}
                        variant="contained"
                        color="primary"
                        disableElevation
                    >
                        <Typography variant="button" color="white">
                            Lihat Selengkapnya
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid
                sx={{ display: { mobile: "none", laptop: "flex" } }}
                container
                spacing={2}
            >
                <CatalogItem nama="Batik Duwo" item="1" harga={599000} />
                <CatalogItem nama="Chakra" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
                <CatalogItem nama="Ngga tau" item="1" harga={599000} />
            </Grid>
        </Box>
    );
}
