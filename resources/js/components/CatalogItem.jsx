import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LazyLoad from "react-lazy-load";
import { Button, Grid, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";

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
                        border: "1px solid #D9D9D9",
                        borderRadius: "10px",
                        transition: "transform .3s, box-shadow .3s",
                        transitionTimingFunction: "ease-in-out",
                        "&:hover": {
                            transform: "scale(1.0) perspective(0px)",
                            boxShadow: "0 0 10px rgba(37, 60, 91, 0.5)",
                        },
                    }}
                >
                    <Box
                        sx={{
                            textDecoration: "none",
                        }}
                        component={Link}
                        to={`/products/${props.id}`}
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <LazyLoad height={"132px"}>
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                    borderBottom: "none",
                                }}
                                component="img"
                                src={`../storage/${props.image}`}
                            />
                        </LazyLoad>
                        <Container
                            sx={{
                                borderTop: "none",
                                px: { mobile: 1, laptop: 2 },
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                fontSize={{
                                    mobile: 7,
                                    laptop: 12,
                                    desktop: 14,
                                }}
                                pt={1}
                                fontWeight="500"
                                color={"#000000"}
                            >
                                {props.nama}
                            </Typography>
                            <Typography
                                fontWeight="500"
                                fontSize={{
                                    mobile: 7,
                                    laptop: 12,
                                    desktop: 14,
                                }}
                                pb={0.5}
                                color={"primary"}
                            >{`Rp. ${Number(
                                props.harga
                            ).toLocaleString()}`}</Typography>
                            <Typography
                                fontWeight="500"
                                sx={{
                                    color: "rgb(0,0,0,41%)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "150px",
                                    whiteSpace: "nowrap",
                                }}
                                pb={1}
                                fontSize={{
                                    mobile: 7,
                                    laptop: 10,
                                    desktop: 15,
                                }}
                            >
                                {props.description}
                            </Typography>
                        </Container>
                    </Box>
                    <Container>
                        {/* <Stack direction="row" my={1} mb={2}>
                            <Button
                                disableElevation
                                color="primary"
                                variant="contained"
                                sx={{ mr: 1, color: "white"}}
                            >
                                Beli Sekarang
                            </Button>
                            <Button
                                sx={{
                                    width: 40,
                                    height: 40,

                                    borderRadius: 1,
                                    minWidth: "3rem",
                                    "& .MuiButton-startIcon": { margin: 0 },
                                }}
                                disableElevation
                                size="small"
                                color="secondary"
                                variant="contained"
                            >
                                <AddShoppingCartIcon
                                    sx={{ color: "white" }}
                                    fontSize="small"
                                />
                            </Button>
                        </Stack> */}
                    </Container>
                </Box>
            </Grid>
        </>
    );
}
