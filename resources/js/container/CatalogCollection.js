import React from 'react'
import { Grid, Typography } from "@mui/material";
import CatalogItem from "../components/CatalogItem";
import {Link} from 'react-router-dom'


export default function CatalogCollection() {
    const catalog = JSON.parse(JSON.stringify(require('../catalog.json')))
    const catalogs = catalog.slice(0,3).map((item) => 
        <CatalogItem key={item.id} id={item.id} nama={item.nama} item={item.item} harga={item.harga} have3d={item.have3d} model={item.model} />
    )
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
                        {catalogs}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}