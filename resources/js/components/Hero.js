import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";

export default function Hero() {
    return (
        <Container sx={{ display: { mobile: "none", laptop: "block" }, mt: 3 }}>
            <Carousel indicators={true} swipe={false} height={310}>
                <div className="hero">
                    <Box
                        sx={{ borderRadius: 1, width: "100%" }}
                        component="img"
                        src="../images/hero.png"
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: { laptop: "2rem", desktop: "1rem" },
                            left: {
                                laptop: "3rem",
                                laptop: "7rem",
                                desktop: "2rem",
                            },
                        }}
                    >
                        <Typography
                            fontWeight={"medium"}
                            fontSize={{
                                tablet: 50,
                                mobile: 13.8,
                                laptop: 35,
                                desktop: 40,
                            }}
                        >
                            Batik Cakhra 1.1
                        </Typography>
                        <Typography
                            fontWeight={600}
                            color="subtitle"
                            fontSize={{
                                tablet: 15,
                                mobile: 8.28,
                                laptop: 15,
                                desktop: 20,
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur
                            <br /> adipiscing elit.{" "}
                        </Typography>
                    </Box>
                </div>
                <div className="hero">
                    <Box
                        sx={{ borderRadius: 1, width: "100%" }}
                        component="img"
                        src="../images/hero-2.png"
                    />
                </div>
            </Carousel>
        </Container>
    );
}
