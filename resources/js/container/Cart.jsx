import {
    Box,
    Button,
    Divider,
    Grid,
    Skeleton,
    Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import CartItem from "../components/CartItem";
import CartItemLoading from "../components/CartItemLoading";

export default function Cart() {
    const queryClient = useQueryClient();
    const [size, setSize] = React.useState("S");
    const [sizes, setSizes] = React.useState({
        XS: "0",
        S: "0",
        M: "0",
        L: "0",
        XL: "0",
        XXL: "0",
    });
    const [quantity, setQuantity] = React.useState(0);
    let isMounted = true;
    const { productId } = useParams();
    const history = useNavigate();
    if (!localStorage.getItem("auth_token")) {
        history.push("/");
        swal("Warning", "Login untuk melihat keranjang belanja", "error");
    }
    const fetchData = async () => {
        const res = await axios.get(`api/cart`);
        return res.data.cart;
    };

    const {
        isLoading,
        isError,
        error,
        data: cart,
    } = useQuery({
        queryKey: ["cartItem"],
        queryFn: fetchData,
    });

    var totalPrice;
    if (!isLoading) {
        totalPrice = cart.reduce((acc, tot) => {
            return acc + tot.product.price * tot.qty;
        }, 0);
    }

    const handleQtyChange = (event, cart_id) => {
        const newQty = { newQty: event.target.value == '' ? '0' : event.target.value };
        updateMutation.mutate({ cart_id: cart_id, newQty: newQty });
    };

    const updateCartQuantity = async ({ cart_id, newQty }) => {
        return await axios.put(`api/cart-update-quantity/${cart_id}`, newQty);
    };

    const updateMutation = useMutation(updateCartQuantity, {
        onSuccess: () => {
            queryClient.invalidateQueries("cartItem");
        },
    });

    const deleteCartItem = async ({ e, cart_id }) => {
        return await axios.delete(`api/delete-cart-item/${cart_id}`);
    };

    const deleteMutation = useMutation(deleteCartItem, {
        onSuccess: () => {
            queryClient.invalidateQueries("cartItem");
        },
    });

    return (
        <Grid paddingX={10} mt={5} container spacing={2}>
            <Grid item laptop={6}>
                <Box
                    sx={{
                        border: "1px solid #BABABA",
                        borderRadius: 1,
                        pt: 1,
                        pb: 2,
                        px: 2,
                    }}
                >
                    <Typography mx={2} fontWeight="500" fontSize={24}>
                        Keranjang Belanja
                    </Typography>
                    <hr />
                    {isLoading ? (
                        <>
                            <CartItemLoading />
                            <CartItemLoading />
                            <CartItemLoading />
                        </>
                    ) : cart.length > 0 ? (
                        cart.map((item) => {
                            return (
                                <CartItem
                                    sx={{ mb: 2 }}
                                    key={item.product_id}
                                    name={item.product.product_name}
                                    price={item.product.price}
                                    qty={Number(item.qty)}
                                    value={item.size}
                                    img={item.product.image_detail1}
                                    onQtyChange={(event) =>
                                        handleQtyChange(event, item.id)
                                    }
                                    onDeleteClick={(e) =>
                                        deleteMutation.mutate({
                                            e: e,
                                            cart_id: item.id,
                                        })
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
                            {isLoading ? (
                                <Skeleton variant="text" />
                            ) : (
                                `RP. ${totalPrice.toLocaleString()}`
                            )}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2 }}
                            onClick={() => history("/payment")}
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
