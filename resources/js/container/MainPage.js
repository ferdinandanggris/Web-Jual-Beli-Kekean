import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material/";
import CatalogItem from "../components/CatalogItem";
import ArticleItem from "../components/ArticleItem";
import {Link} from 'react-router-dom'
import CatalogCollection from "./CatalogCollection";
import ArticleCollection from './ArticleCollection'

export default function MainPage(props) {
    const catalog = JSON.parse(JSON.stringify(require('../catalog.json')))
    const catalogs = catalog.map((item) => 
        <CatalogItem key={item.id} id={item.id} nama={item.nama} item={item.item} harga={item.harga} have3d={item.have3d} model={item.model} />
    )

    
    return (
        <Box>
            <Grid display={{mobile: 'flex', laptop: 'none'}} container alignItems="center" justifyContent="center" pt={0}>
                <CatalogCollection/>
                <CatalogCollection/>
                <CatalogCollection/>
                <ArticleCollection/>
                <Grid item mobile={12}>
                    <Container>
                        <Typography
                            display={{ mobile: "block", laptop: "none" }}
                            fontWeight={"light"}
                            fontSize={18}
                            py={2}
                            textAlign={"center"}
                        >
                            About Us
                        </Typography>
                        <Box
                            sx={{ width: "100%" }}
                            component="img"
                            src={`../images/aboutUs.png`}
                        />
                        <Typography
                            fontSize={8.65}
                            mt={1}
                            fontWeight={'regular'}
                            mb={5}
                        >
                            Kekean Wastra Gallery is a business that carries
                            local Indonesian cultural values. This business was
                            established in Bali on December 2, 2014. Kekean
                            Wastra Gallery focuses on sustainable fashion with
                            Batik, Weaving, and Embroidery.
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
            <Grid
                sx={{ display: { mobile: "none", laptop: "flex" } }}
                container
                spacing={2}
            >
                {catalogs}
                
            </Grid>
        </Box>
    );
}
