import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import {
    SwipeableDrawer,
    Typography,
    IconButton,
    AppBar,
    Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Navbar() {
    const history = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_firstName");
                localStorage.removeItem("auth_lastName");
                localStorage.removeItem("auth_email");
                swal("Success", res.data.message, "Logout Successfully");
                history("/");
            }
        });
    };
    function IsLogin() {
        if (localStorage.getItem("auth_token")) {
            return (
                <>
                    <Box
                        className="nav-right"
                        sx={{ display: { mobile: "none", laptop: "block" } }}
                    >
                        <Button color="inherit">
                            <Typography href="#" className="bx bx-search" />
                        </Button>
                        <Button color="inherit">
                            <Typography href="#" className="bx bx-heart" />
                        </Button>
                        <Button color="inherit">
                            <Typography href="#" className="bx bx-cart" />
                        </Button>
                        <Button color="inherit">
                            <Typography href="#" className="bx bx-user" />
                        </Button>
                        <Button onClick={logoutSubmit} color="inherit">
                            <Typography
                                href="#"
                                className="bx bx-log-out-circle"
                            />
                        </Button>
                    </Box>
                </>
            );
        } else {
            return (
                <Box
                    className="nav-right"
                    sx={{ display: { mobile: "none", laptop: "block" } }}
                >
                    <Typography
                        sx={{
                            "&:hover": {
                                borderBottom: "1px solid black",
                            },
                        }}
                        color={"black"}
                        px={2}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                            to={`/login`}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            );
        }
    }
    const [drawerState, setDrawerState] = React.useState(false);
    return (
        <>
            <SwipeableDrawer
                anchor="left"
                open={drawerState}
                onClose={() => setDrawerState(false)}
                onOpen={() => setDrawerState(true)}
            >
                <Box p={2} width="250px" textAlign="center">
                    <Typography>Side Panel</Typography>
                </Box>
            </SwipeableDrawer>
            <AppBar
                sx={{
                    display: { mobile: "block", laptop: "none" },
                    bgcolor: "white",
                    boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.17)",
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setDrawerState(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        sx={{ flexGrow: 1 }}
                        textAlign={"center"}
                        color={"black"}
                    >
                        Kekean
                    </Typography>
                    <Button color="inherit">
                        <Typography
                            fontSize={20}
                            href="#"
                            className="bx bx-cart"
                        ></Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Container
                sx={{
                    justifyContent: "center",
                    height: 60,
                    display: { mobile: "none", laptop: "block" },
                }}
            >
                <AppBar
                    elevation={0}
                    sx={{
                        bgcolor: "white",
                        px: 7,
                    }}
                >
                    <Toolbar>
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                            <Typography
                                color={"black"}
                                px={2}
                                sx={{
                                    "&:hover": {
                                        borderBottom: "1px solid black",
                                    },
                                }}
                            >
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                    to={`/`}
                                >
                                    Shop
                                </Link>
                            </Typography>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        borderBottom: "1px solid black",
                                    },
                                }}
                                color={"black"}
                                px={2}
                            >
                                Article
                            </Typography>
                            <Typography
                                sx={{
                                    "&:hover": {
                                        borderBottom: "1px solid black",
                                    },
                                }}
                                color={"black"}
                                px={2}
                            >
                                Contact Us
                            </Typography>
                        </Box>
                        <IsLogin />
                    </Toolbar>
                </AppBar>
            </Container>
        </>
    );
}
