import React from 'react'
import { Grid, Typography } from "@mui/material";
import CatalogItem from "../components/CatalogItem";
import {Link} from 'react-router-dom'


export default function CatalogCollection() {
    return(
        <Grid item>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item mobile={6}>
                    <Typography
                        display={{ mobile: "block", laptop: "none" }}
                        fontWeight={"light"}
                        fontSize={18}
                        py={2}
                    >
                        Our Collection
                    </Typography>
                </Grid>

                <Grid item mobile={6}>
                    <Link style={{textDecoration: 'none'}} to={'/catalog'}>
                        <Typography
                            display={{ mobile: "block", laptop: "none" }}
                            fontWeight={"regular"}
                            fontSize={12}
                            py={2}
                            textAlign={"right"}
                            color={"#989898"}
                        >
                            Lihat Selengkapnya
                        </Typography>
                    </Link>
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
                            catalogPage={false}
                        />
                        <CatalogItem
                            nama="Batik Duwo"
                            item="1"
                            harga={599000}
                            catalogPage={false}
                        />
                        <CatalogItem
                            nama="Batik Duwo"
                            item="1"
                            harga={599000}
                            catalogPage={false}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}