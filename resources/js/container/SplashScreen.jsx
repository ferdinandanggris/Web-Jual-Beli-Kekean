import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import React from "react";
import { HashLoader } from "react-spinners";

function SplashScreen() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}
        >
            <Stack direction={'column'} spacing={1} alignItems='center' mb={10}>
                <Stack spacing={1} direction={"row"}>
                    {[1, 2, 3].map((item, index) => (
                        <Box
                            component="img"
                            width={"5vw"}
                            src={`../images/SplashLogo/LogoSponsor${item}.png`}
                        />
                    ))}
                </Stack>
                <Stack spacing={1} direction={"row"}>
                    {[4, 5, 6].map((item, index) => (
                        <Box
                            component="img"
                            width={"5vw"}
                            src={`../images/SplashLogo/LogoSponsor${item}.png`}
                        />
                    ))}
                </Stack>
                <Stack spacing={1} direction={"row"}>
                    {[7, 8].map((item, index) => (
                        <Box
                            component="img"
                            width={"5vw"}
                            src={`../images/SplashLogo/LogoSponsor${item}.png`}
                        />
                    ))}
                </Stack>
            </Stack>
            <HashLoader
                color="#E18043"
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Box>
    );
}

export default SplashScreen;
