import React from "react";
import Container from "@mui/material/Container";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ReceiptIcon from '@mui/icons-material/Receipt';
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
    Card,
    CardActionArea,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import axios from "axios";
import swal from "sweetalert";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useQuery } from "@tanstack/react-query";

export default function Navbar(props) {
    const navigate = useNavigate();
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
                localStorage.removeItem("first_name");
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
                            {/* <MenuItem>
                                <Avatar /> My account
                            </MenuItem> */}
                            <Divider />
                            <MenuItem onClick={()=>{navigate('/user/address')}}>
                                <ListItemIcon>
                                    <PersonPinIcon fontSize="small" />
                                </ListItemIcon>
                                Alamat
                            </MenuItem>
                            <MenuItem onClick={()=>{navigate('/user/transaction')}}>
                                <ListItemIcon>
                                    <ReceiptIcon fontSize="small" />
                                </ListItemIcon>
                                Riwayat Pembelian
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
                            "&:hover":  {
                                borderBottom: `1px solid ${theme.borderColor}`,
                            },
                        }}
                        color={"black"}
                        px={2}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                                color: theme.textColor,
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
                <Box width="250px">
                    <Card sx={{ backgroundColor: '#FF9C8B', borderRadius: 0, boxShadow: 'none' }}>
                        <CardActionArea disabled={localStorage.getItem("auth_token")} sx={{ display: 'flex',  backgroundColor: '#FF9C8B', alignItems: 'center', p: 1.5 }} onClick={() => history("/login")}>
                            <AccountCircleOutlinedIcon sx={{ fontSize: '3rem' }} />
                            <Box ml={2}>
                                
                                <Typography fontWeight={'600'}>
                                    {/* {localStorage.getItem('first_name')} */}
                                    Akun Saya
                                </Typography>
                                {localStorage.getItem('auth_token') ?? (
                                    <Typography  fontSize={9} fontWeight={'400'}>
                                    Sign in / Register
                                </Typography>
                                )}
                                {/* <Typography  fontSize={9} fontWeight={'400'}>
                                    Sign in / Register
                                </Typography> */}
                            </Box>
                        </CardActionArea>
                    </Card>

                    <CardActionArea sx={{ p: 2 }} onClick={() => history("/user/address")}>
                        <Typography fontWeight={'light'}>
                            ALAMAT
                        </Typography>
                    </CardActionArea>
                    <CardActionArea sx={{ p: 2 }} onClick={() => history("/user/transaction")}>
                        <Typography fontWeight={'light'}>
                            RIWAYAT PEMBELIAN
                        </Typography>
                    </CardActionArea>
                    <hr/>
                    <CardActionArea sx={{ p: 2 }} onClick={() => history("/")}>
                        <Typography fontWeight={'light'}>
                            KATALOG
                        </Typography>
                    </CardActionArea>
                    <CardActionArea sx={{ p: 2 }} onClick={() => history("/artikel")}>
                        <Typography fontWeight={'light'}>
                            ARTIKEL
                        </Typography>
                    </CardActionArea>
                    <CardActionArea sx={{ p: 2 }} onClick={() => history("/about")}>
                        <Typography fontWeight={'light'}>
                            TENTANG KAMI
                        </Typography>
                    </CardActionArea>
                    <hr/>
                    <CardActionArea sx={{ p: 2 }} onClick={logoutSubmit}>
                        <Typography fontWeight={'light'}>
                                Logout <Logout fontSize="small" color={"#000000de"}/>
                        </Typography>
                    </CardActionArea>
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
                        aria-label="menu"
                        sx={{ mr: 2, color: theme.textColor }}
                        onClick={() => setDrawerState(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={`/`} style={{ textDecoration: 'none', textAlign: 'center', flexGrow: 1 }}>
                        <Typography
                            color={"black"}
                        >
                            KEKEAN
                        </Typography>
                    </Link>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ color: theme.textColor }}
                        onClick={() => history("/cart")}
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
                            bgcolor: "primary.background.default",
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
                                <Link
                                    to={'/artikel'}
                                    style={{ color: theme.textColor, textDecoration: 'none' }}
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
                                </Link>
                                <Link
                                    to={'/about'}
                                    style={{ color: theme.textColor, textDecoration: 'none' }}
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
                                </Link>
                                {/* <Link to={'/customize'}
                                    style={{ color: theme.textColor, textDecoration: 'none' }}
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
                                        Buat produkmu sendiri
                                    </Typography>
                                </Link> */}
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
