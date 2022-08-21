import React from "react";
import { Typography, Grid, Container } from "@mui/material/";
import CatalogItem from "../components/CatalogItem";

export default function CatalogPage() {
    return(
        <Container>
            <Grid pt={7} container alignItems="center" justifyContent="center">
                        <Grid item mobile={12}>
                            <Typography
                                display={{ mobile: "block", laptop: "none" }}
                                fontWeight={"light"}
                                fontSize={18}
                                py={2}
                            >
                                Our Collection
                            </Typography>
                        </Grid>
                        <Grid item mobile={12}>
                            <Grid
                                container
                                spacing={1}
                                sx={{
                                    display: { mobile: "flex", laptop: "none" },
                                }}
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
                            {/* <Button
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
                            </Button> */}
                        </Grid>
                    </Grid>
        </Container>
    )
}