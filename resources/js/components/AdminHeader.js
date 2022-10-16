import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Stack,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link } from 'react-router-dom';

function AdminHeader(props) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Stack direction={"row"} alignItems="center">
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                    anchor={"left"}
                    open={open}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}
                >
                    <Box py={2} width="250px" textAlign="center">
                        <Typography>Admin Panel</Typography>
                        <Link
                            to={"/admin"}
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <Button
                                color="inherit"
                                startIcon={<InventoryIcon />}
                                sx={{
                                    py: 2,
                                    mt: 4,
                                    borderRadius: 0,
                                }}
                                fullWidth
                            >
                                Edit Catalog
                            </Button>
                        </Link>

                        <Link
                            to={"/admin/payment"}
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <Button
                                color="inherit"
                                startIcon={<PaymentIcon />}
                                sx={{ py: 2, borderRadius: 0 }}
                                fullWidth
                            >
                                Edit Payment
                            </Button>
                        </Link>
                    </Box>
                </SwipeableDrawer>
                <Typography fontWeight={"medium"}>Daftar {props.daftar}</Typography>
            </Stack>
            <Link to={`/admin/${props.adminPage}`} style={{ textDecoration: "none" }}>
                <Button>
                    <Typography fontWeight={"medium"}>
                        Tambahkan {props.tambahkan}
                    </Typography>
                </Button>
            </Link>
        </Box>
    );
}

export default AdminHeader;
