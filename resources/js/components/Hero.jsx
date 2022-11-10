import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";

export default function Hero() {
    return (
        <Container sx={{ display: { mobile: "none", laptop: "block" }, mt: 3 }}>
            <Carousel indicators={true} swipe={false} height={275}>
                <div className="hero">
                    <Box
                        sx={{ borderRadius: 1, width: "100%" }}
                        component="img"
                        src="../images/hero-1.png"
                    />
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
