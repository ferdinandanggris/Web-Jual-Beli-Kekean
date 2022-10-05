import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
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
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
        isMounted = false;
    }, []);
    var totalPrice;

    if (loading) {
        return <Typography>Loading....</Typography>;
    } else {
        totalPrice = cart.reduce((acc, tot) => {
            return acc + tot.product.price * tot.qty;
        }, 0);
    }

    const handleQtyChange = (event, cart_id) => {
        let promise = new Promise(function (Resolved) {
            setCart((cart) =>
                cart.map((item) =>
                    cart_id === item.id
                        ? {
                            ...item,
                            qty:
                                event.target.value < 1
                                    ? 1
                                    : event.target.value,
                        }
                        : item
                )
            );
            Resolved();
        });
        promise.then(() => {
            updateCartQuantity(cart_id, event.target.value)
        });
    };

    const updateCartQuantity = (cart_id, newQty) => {
        axios.put(`api/cart-update-quantity/${cart_id}`, newQty).then((res) => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
            }
        });
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
                    {cart.length > 0 ? (
                        cart.map((item) => {
                            return (
                                <CartItem
                                    key={item.product_id}
                                    name={item.product.product_name}
                                    price={item.product.price}
                                    qty={Number(item.qty)}
                                    value={item.size}
                                    img={item.product.item}
                                    onQtyChange={(event) =>
                                        handleQtyChange(event, item.id)
                                    }
                                />
                            );
                        })
                    ) : (
                        <Typography
                            textAlign={"center"}
                            color={"#BABABA"}
                            mx={2}
                            my={9.5}
                            fontWeight="500"
                            fontSize={16}
                        >
                            Keranjang anda kosong
                        </Typography>
                    )}
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
                            RP. {totalPrice.toLocaleString()}
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
