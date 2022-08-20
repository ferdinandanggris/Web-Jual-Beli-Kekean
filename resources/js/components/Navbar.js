import React from "react";
import Container from "@mui/material/Container";
import { spacing } from "@mui/system";
import { Box } from "@mui/system";
import { Drawer, Typography, IconButton } from "@mui/material";

export default function Navbar() {
    const login = true;
    function isLogin() {
        if (login) {
            return (
                <>
                    <Box
                        className="nav-right"
                        sx={{ display: { mobile: "none", laptop: "block" } }}
                    >
                        <a href="#" className="bx bx-search"></a>
                        <a href="#" className="bx bx-heart"></a>
                        <a href="#" className="bx bx-shopping-bag"></a>
                        <a href="#" className="bx bx-user"></a>
                    </Box>

                    <Box
                        className="nav-right"
                        sx={{ display: { mobile: "block", laptop: "none" } }}
                    >
                        <a href="#" className="fs-3 bx bx-cart"></a>
                    </Box>
                </>
            );
        } else {
            return (
                <div className="nav-right">
                    <a href="#">Login</a>
                </div>
            );
        }
    }

    const [drawerState, setDrawerState] = React.useState(false)
    return (
        <>
        <Drawer anchor="left" open={drawerState} onClose={() => setDrawerState(false)}>
            <Box display={{mobile: 'block', laptop: 'none'}} p={2} width='250px' textAlign='center'>
                <Typography>
                    Side Panel
                </Typography>
            </Box>
        </Drawer>
            <Container
                sx={{
                    justifyContent: "center",
                    height: 60,
                    boxShadow: {
                        mobile: "0px 1px 10px rgba(0, 0, 0, 0.17);",
                        laptop: "none",
                    },
                    my: { mobile: 0, laptop: 2 },
                    mb: { mobile: -4 },
                }}
            >
                <div className="pt-3 d-flex justify-content-between align-items-center">
                    <Typography
                        onClick={() => setDrawerState(true)}
                        display={{ laptop: "none" }}
                        className="fs-3 pointer bx bx-menu"
                    ></Typography>
                    <Typography display={{ laptop: "none" }} fontWeight={"light"}>
                        KEKEAN
                    </Typography>
                    <Box
                        display={{ laptop: "flex", mobile: "none" }}
                        className="nav-left"
                    >
                        <a id="Home" className="active" href="#">
                            Home
                        </a>
                        <a href="#">Article</a>
                        <a href="#">Profile</a>
                        <a href="#">Contact Us</a>
                    </Box>
                    {isLogin()}
                </div>
            </Container>
        </>
    );
}
