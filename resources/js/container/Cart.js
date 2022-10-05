import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import ButtonBeli from "../components/ButtonBeli";
import CartItem from "../components/CartItem";

export default function Cart() {
    const [size, setSize] = React.useState("S");
    const [sizes, setSizes] = React.useState({
        XS: "0",
        S: "0",
        M: "0",
        L: "0",
        XL: "0",
        XXL: "0",
    });
    const [cart, setCart] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    let isMounted = true;
    const { productId } = useParams();
    const history = useNavigate();
    // const catalog = JSON.parse(JSON.stringify(require("../catalog.json")));
    if (!localStorage.getItem("auth_token")) {
        history.push("/");
        swal("Warning", "Login untuk melihat keranjang belanja", "error");
    }
    React.useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            try {
                axios.get(`api/cart`).then((res) => {
                    if (res.data.status === 200) {
                        setCart(res.data.cart);
                        console.log(res.data.size);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
        isMounted = false;
    }, [history]);

    if (loading) {
        return <Typography>Loading....</Typography>;
    } else {
        var currentProduct = "";
        currentProduct = cart.filter((item) => item.id == productId);
        console.log(currentProduct);
    }

    const handleQtyChange = (event) => {
        if (event.target.value < 0) {
            event.target.value = 0;
            setQuantity(event.target.value);
        } else {
            event.target.value;
            setQuantity(event.target.value);
        }
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
        console.log(size);
    };
    return (
        <Grid paddingX={10} container spacing={2}>
            <Grid item laptop={6}>
                <Box
                    sx={{
                        border: "1px solid #BABABA",
                        borderRadius: 1,
                        pt: 1,
                        pb: 2,
                    }}
                >
                    <Typography mx={2} fontWeight="500" fontSize={24}>
                        Keranjang Belanja
                    </Typography>
                    <CartItem
                        name="Barang 1"
                        price="599000"
                        {...sizes}
                        qty={quantity}
                        onQtyChange={handleQtyChange}
                        onSizeChange={handleSizeChange}
                        value={size}
                    />
                    {cart.map((item) => {
                        return (
                            <CartItem
                                name={item.product_name}
                                price="599000"
                                qty={quantity}
                                onQtyChange={handleQtyChange}
                                onSizeChange={handleSizeChange}
                                value={size}
                            />
                        );
                    })}
                </Box>
            </Grid>
            <Grid item laptop={6}>
                <Box sx={{ border: "1px solid #BABABA", borderRadius: 1 }}>
                    <Box px={2} pt={1}>
                        <Typography mx={2} fontWeight="500" fontSize={24}>
                            Total belanjaan
                        </Typography>
                        <hr />
                        <Typography mx={2} fontWeight="500" fontSize={36}>
                            RP. 2.396.000
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2 }}
                        >
                            <Typography color={"white"}>
                                Lanjutkan ke pembayaran
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
