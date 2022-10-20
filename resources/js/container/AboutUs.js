import { Box, Container, Typography } from "@mui/material";
import React from "react";

function AboutUs() {
    return (
        <Container sx={{ px: 15 }}>
            <Typography
                sx={{ mt: 3, mb: 3 }}
                color={"primary.main"}
                fontWeight="600"
                fontSize={32}
            >
                Tentang Kekean
                <br />
                Wastra Gallery
            </Typography>
            <Box
                sx={{
                    width: "100%",
                }}
                component="img"
                src={`../images/aboutUs.png`}
            />
            <Typography sx={{mt: 3}} fontSize={20} align={'justify'}>
                Kekean Wastra Gallery is a business that carries local
                Indonesian cultural values. This business was established in
                Bali on December 2, 2014. Kekean Wastra Gallery focuses on
                sustainable fashion with Batik, Weaving, and Embroidery. With a
                sustainable spirit, Kekean also empowers young people from
                vocational schools and women in remote areas who need jobs. This
                business that carries environmentally friendly products by
                reducing "waste water" as well as using natural fibers and dyes
                as the basic ingredients for making wastra implements an open
                trade that provides welfare to its craftsmen. Kekean has
                received various national and international achievements, even
                Kekean Wastra Gallery has collaborated with international
                fashion brand Christian Dior.
            </Typography>
        </Container>
    );
}

export default AboutUs;
