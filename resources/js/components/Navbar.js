import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import {
    SwipeableDrawer,
    Typography,
    IconButton,
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Avatar,
    Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
    const [drawerState, setDrawerState] = React.useState(false);
    const history = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_firstName");
                localStorage.removeItem("auth_lastName");
                localStorage.removeItem("auth_email");
                swal("Berhasil Logout", res.data.message, "success");
                history("/");
            }
        });
    };

    const fetchCart = async () => {
        const res = await axios.get('api/cart')
        return res.data.cart.length
    }

    const {
        isLoading, 
        isError, 
        error, 
        data: cartLength
    } = useQuery({
        queryKey: ['cartLength'],
        queryFn: fetchCart
    })
    function IsLogin() {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const openMenu = (e) => setAnchorEl(e.currentTarget);
        const closeMenu = () => setAnchorEl(null);
        if (localStorage.getItem("auth_token")) {
            return (
                <>
                    <Box sx={{ display: { mobile: "none", laptop: "block" } }}>
                        {/* <Button color="inherit">
                            <Typography href="#" className="bx bx-search" />
                        </Button> */}
                        {/* <Button color="inherit">
                            <Typography href="#" className="bx bx-heart" />
                        </Button> */}
                        <IconButton
                            size="small"
                            onClick={() => history("/cart")}
                            color="inherit"
                            sx={{ color: "white", mr: 2 }}
                        >
                            <Badge badgeContent={isLoading ? 0 : cartLength} color="primary">
                            <ShoppingCartIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        {/* <Button color="inherit">
                            <Typography href="#" className="bx bx-user" />
                        </Button> */}
                        <IconButton
                            onClick={openMenu}
                            color="inherit"
                            sx={{ color: "white" }}
                            size="small"
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <AccountCircleIcon fontSize="small" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={closeMenu}
                            onClick={closeMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform:
                                            "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                            }}
                        >
                            <MenuItem>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={logoutSubmit}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </>
            );
        } else {
            return (
                <Box sx={{ display: { mobile: "none", laptop: "block" } }}>
                    <Typography
                        sx={{
                            "&:hover": {
                                borderBottom: "1px solid white",
                            },
                        }}
                        color={"black"}
                        px={2}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "white",
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
                        bgcolor: "#3C2317",
                        px: 7,
                    }}
                >
                    <Toolbar>
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                            <Button
                                color="inherit"
                                onClick={() => history("/")}
                            >
                                <Typography
                                    sx={{
                                        "&:hover": {
                                            borderBottom: "1px solid white",
                                        },
                                    }}
                                    color="white"
                                    px={1}
                                >
                                    Shop
                                </Typography>
                            </Button>
                            <Button
                                onClick={() => history("/artikel")}
                                color="inherit"
                            >
                                <Typography
                                    sx={{
                                        "&:hover": {
                                            borderBottom: "1px solid white",
                                        },
                                    }}
                                    color={"white"}
                                    px={1}
                                >
                                    Article
                                </Typography>
                            </Button>
                            <Button
                                onClick={() => history("/about")}
                                color="inherit"
                            >
                                <Typography
                                    sx={{
                                        "&:hover": {
                                            borderBottom: "1px solid white",
                                        },
                                    }}
                                    color={"white"}
                                    px={2}
                                >
                                    About Us
                                </Typography>
                            </Button>
                        </Box>
                        <IsLogin />
                    </Toolbar>
                </AppBar>
            </Container>
        </>
    );
}
