import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CatalogItem from "../components/CatalogItem";
import ArticleItem from "../components/ArticleItem";
import CatalogPage from "./CatalogPage"
import {Link} from 'react-router-dom'

export default function MainPage(props) {
    return (
        <Box>
            <Grid display={{mobile: 'flex', laptop: 'none'}} container alignItems="center" justifyContent="center" pt={4}>
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
                </Grid>
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
                </Grid>
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
                </Grid>
                <Grid item>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item mobile={6}>
                            <Typography
                                display={{ mobile: "block", laptop: "none" }}
                                fontWeight={"light"}
                                fontSize={18}
                                py={2}
                            >
                                Article
                            </Typography>
                        </Grid>

                        <Grid item mobile={6}>
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
                        </Grid>
                        <Grid item mobile={12}>
                            <Grid
                                container
                                spacing={1}
                                sx={{
                                    display: { mobile: "flex", laptop: "none" },
                                }}
                            >
                                <ArticleItem
                                    item={1}
                                    tanggal="20 Juli 2020"
                                    nama="Ngga tau"
                                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                                />
                                <ArticleItem
                                    item={1}
                                    tanggal="20 Juli 2020"
                                    nama="Ngga tau"
                                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                                />
                                <ArticleItem
                                    item={1}
                                    tanggal="20 Juli 2020"
                                    nama="Ngga tau"
                                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid item>
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
                        </Grid> */}
                    </Grid>
                </Grid>
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
