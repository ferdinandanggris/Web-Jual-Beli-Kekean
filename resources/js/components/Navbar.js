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
    useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";

export default function Navbar(props) {
    const theme = {
        textColor: "black",
        borderColor: "black",
    };
    const [drawerState, setDrawerState] = React.useState(false);
    const history = useNavigate();

    function ElevationScroll(props) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 0,
            target: window ? window() : undefined,
        });

        return React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        });
    }

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
        const res = await axios.get("api/cart");
        return res.data.cart.length;
    };

    const {
        isLoading,
        isError,
        error,
        data: cartLength,
    } = useQuery({
        queryKey: ["cartLength"],
        queryFn: fetchCart,
    });
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
                            onClick={() => history("/cart")}
                            color="inherit"
                            sx={{ color: theme.textColor, mr: 1 }}
                        >
                            <Badge
                                badgeContent={isLoading ? 0 : cartLength}
                                color="primary"
                            >
                                <ShoppingCartOutlinedIcon
                                    sx={{ color: theme.textColor }}
                                    fontSize="medium"
                                />
                            </Badge>
                        </IconButton>
                        {/* <Button color="inherit">
                            <Typography href="#" className="bx bx-user" />
                        </Button> */}
                        <IconButton
                            onClick={openMenu}
                            color="inherit"
                            sx={{ color: theme.textColor }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <AccountCircleOutlinedIcon
                                sx={{ color: theme.textColor }}
                                fontSize="medium"
                            />
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
                <ElevationScroll {...props}>
                    <AppBar
                        elevation={4}
                        sx={{
                            bgcolor: "#F5F5F5",
                            px: 7,
                        }}
                    >
                        <Toolbar>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexGrow: 1,
                                    alignItems: "center",
                                }}
                            >
                                <Link to={'/'} style={{textDecoration: 'none'}}>
                                    <Typography
                                        color={"black"}
                                        fontSize={20}
                                        fontWeight={500}
                                        mr={4}
                                    >
                                        Kekean <Box component='span' sx={{color: 'primary.main'}}> Gallery</Box>
                                    </Typography>
                                </Link>
                                {/* <Button
                                    sx={{ color: theme.textColor }}
                                    onClick={() => history("/")}
                                >
                                    <Typography
                                        sx={{
                                            "&:hover": {
                                                borderBottom: `1px solid ${theme.borderColor}`,
                                            },
                                        }}
                                        color={theme.textColor}
                                        px={1}
                                    >
                                        Shop
                                    </Typography>
                                </Button> */}
                                <Button
                                    onClick={() => history("/artikel")}
                                    sx={{ color: theme.textColor }}
                                >
                                    <Typography
                                        sx={{
                                            "&:hover": {
                                                borderBottom: `1px solid ${theme.borderColor}`,
                                            },
                                        }}
                                        color={theme.textColor}
                                        px={1}
                                    >
                                        Article
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={() => history("/about")}
                                    sx={{ color: theme.textColor }}
                                >
                                    <Typography
                                        sx={{
                                            "&:hover": {
                                                borderBottom: `1px solid ${theme.borderColor}`,
                                            },
                                        }}
                                        color={theme.textColor}
                                        px={2}
                                    >
                                        About Us
                                    </Typography>
                                </Button>
                                {/* <Typography
                                    flexGrow={0.75}
                                    textAlign={"center"}
                                    color={"black"}
                                >
                                    Kekean
                                </Typography> */}
                            </Box>
                            <IsLogin />
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
            </Container>
        </>
    );
}
