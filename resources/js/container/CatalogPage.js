import React from "react";
import { Typography, Grid, Container, Button, Icon } from "@mui/material/";
import CatalogItem from "../components/CatalogItem";
import FilterListIcon from '@mui/icons-material/FilterList';

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
                                textAlign={'center'}
                            >
                                Our Collection
                            </Typography>
                        </Grid>
                        <Grid item mobile={6}>
                            <Button variant='outlined'>
                                    <FilterListIcon sx={{fontSize: 7}}/>
                                <Typography  sx={{fontSize: 7}}>
                                    ajdfnsdjf
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item mobile={6}>
                            <Button variant='outlined'>
                                ajdfnsdjf
                            </Button>
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
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
                                />
                                <CatalogItem
                                    nama="Batik Duwo"
                                    item="1"
                                    harga={599000}
                                    catalogPage={true}
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