import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import axios from "axios";

export default function Payment() {
    const checkboxColor = {
        color: "#FF674D",
        "&.Mui-checked": {
            color: "#FF674D",
        },
    };

    const AccordionStyle = {
        boxShadow: "none",
        backgroundColor: "#00000000",
        "&:before": {
            display: "none",
        },
    };

    const getInvoice = () => {
        axios.get('/api/get-invoice')
    }
    return (
        <Container sx={{ px: 50 }}>
            <Accordion
                sx={{
                    AccordionStyle,
                    border: "1px solid #BABABA",
                    borderBottom: "none",
                }}
                disableGutters={true}
                defaultExpanded={true}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        fontSize={{ laptop: 15, desktop: 17 }}
                        fontWeight={"regular"}
                    >
                        Rekening Bank
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container alignItems="center" spacing={5}>
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "131px" }}
                                component="img"
                                src="../images/logo-bca.png"
                            />
                        </Grid>
                        <Grid item mobile={6}>
                            <Typography fontSize={20}>912949301</Typography>
                        </Grid>
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "131px" }}
                                component="img"
                                src="../images/logo-mandiri.png"
                            />
                        </Grid>
                        <Grid item mobile={6}>
                            <Typography fontSize={20}>
                                00000000029384739923
                            </Typography>
                        </Grid>
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "131px" }}
                                component="img"
                                src="../images/logo-bni.png"
                            />
                        </Grid>
                        <Grid item mobile={6}>
                            <Typography fontSize={20}>29348210213</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    AccordionStyle,
                    border: "1px solid #BABABA",
                    borderBottom: "none",
                    borderTop: "none",
                }}
                disableGutters={true}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        fontSize={{ laptop: 15, desktop: 17 }}
                        fontWeight={"regular"}
                    >
                        E-Wallet
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container alignItems="center" spacing={5}>
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "131px" }}
                                component="img"
                                src="../images/logo-bca.png"
                            />
                        </Grid>
                        <Grid item mobile={6}>
                            <Typography fontSize={20}>912949301</Typography>
                        </Grid>
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "131px" }}
                                component="img"
                                src="../images/logo-mandiri.png"
                            />
                        </Grid>
                        <Grid item mobile={6}>
                            <Typography fontSize={20}>
                                00000000029384739923
                            </Typography>
                        </Grid>
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "131px" }}
                                component="img"
                                src="../images/logo-bni.png"
                            />
                        </Grid>
                        <Grid item mobile={6}>
                            <Typography fontSize={20}>29348210213</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    AccordionStyle,
                    border: "1px solid #BABABA",
                    borderTop: "none",
                }}
                disableGutters={true}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        fontSize={{ laptop: 15, desktop: 17 }}
                        fontWeight={"regular"}
                    >
                        Qris
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        justifyContent={"center"}
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "250px" }}
                                component="img"
                                src="../images/qris.jpeg"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Stack direction={"row"} spacing={2}>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            borderRadius: 1,
                            backgroundColor: "#009E93",
                            ":hover": {
                                backgroundColor: "#00637A",
                            },
                        }}
                        onClick={getInvoice}
                    >
                        <Typography mr={1} color="white">
                            Download Invoice
                        </Typography>
                        <ReceiptIcon sx={{ color: "#FFFFFF", fontSize: 25 }} />
                    </Button>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            borderRadius: 1,
                            backgroundColor: "#25D366",
                            ":hover": {
                                backgroundColor: "#1AA04C",
                            },
                        }}
                    >
                        <Typography mr={1} color="white">
                            Konfirmasi Pembayaran
                        </Typography>
                        <WhatsAppIcon sx={{ color: "#FFFFFF", fontSize: 25 }} />
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}
