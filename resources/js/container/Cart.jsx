import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "../../css/checkout.css";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import CartItem from "../components/CartItem";
import CartItemLoading from "../components/CartItemLoading";
import Checkout from '../components/Checkout';

export default function Cart() {
    const navigate = useNavigate();
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

    const { productId } = useParams();
    const history = useNavigate();
    if (!localStorage.getItem("auth_token")) {
        history.push("/");
        swal("Warning", "Login untuk melihat keranjang belanja", "error");
    }
    const fetchData = async () => {
        const res = await axios.get(`api/cart`);
        setCart(res.data.cart.map((item) => {return {...item, checked: false}}));
    };
    const [margin,setMargin] = React.useState("30px");

    useEffect(() => {
        total = cart.reduce((acc, tot) => {
            return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
        }, 0);

        setTotalPrice(total);
    })

    const {
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["cartItem"],
        queryFn: fetchData,
    });

    var total;
    // if (!isLoading) {
    //     total = cart.reduce((acc, tot) => {
    //         return acc + (tot.product.checked ? tot.product.price * tot.qty : 0);
    //     }, 0);
    //     setTotalPrice(total);
    // }

    const handleQtyChange = async (event, cart_id) => {
        const newQty = { newQty: event.target.value == '' ? '0' : event.target.value };
        await updateCartQuantity({ cart_id: cart_id, newQty: newQty });
        await fetchData();
        total = cart.reduce((acc, tot) => {
            return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
        }, 0);
        console.log(total);
        setTotalPrice(total);
        // updateMutation.mutate({ cart_id: cart_id, newQty: newQty });
    };
    
    const handleCheckedChange = (event, cart_id) => {
        const newQty = { checked: event.target.checked };
        let tempCart = cart.map((item) => {
            if (item.id == cart_id) {
                return {...item, product: {...item.product},checked: event.target.checked};    
            }else{
                return {...item}
            }   
        });  

        setCart(tempCart);
        total = tempCart.reduce((acc, tot) => {
            return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
        }, 0);
        console.log(total);
        setTotalPrice(total);
        // updateMutation.mutate({ cart_id: cart_id, newQty: newQty });
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

    function checkStock(params){
        switch(params){
            case 'XS':
                return 'stock_xs';
                break;
            case 'S' :
                return 'stock_s';
                break;
            case 'M' :
                return 'stock_m';
                break;
            case 'L' :
                return 'stock_l';
                break;
            case 'XL':
                return 'stock_xxl';
                break;
            default :
                return '';
                break;
        }
    } 

    const orderProduct = async () => {
        
        axios.get("sanctum/csrf-cookie").then(async (response) => {
            await axios
                .post("api/order", {
                    cart: cart.filter((item)=> item.checked == true),
                    total_price: totalPrice,
                })
                .then((res) => {
                    setOrderId(res.data.data.id);
                    if (res.data.status == 200) {
                        // swal(
                        //     "Success",
                        //     "Pesanan berhasil dibuat, silahkan cek email anda secara berkala untuk melihat status pesanan",
                        //     "success"
                        //     );
                        handleClickOpen(res.data.data.id);
                            
                    } else {
                        swal("Error", "Pesanan gagal dibuat", "error");
                    }
                });
        })
    }


    const [orderId, setOrderId] = React.useState("");


    const [totalPrice, setTotalPrice] = React.useState(0);
    const [cart, setCart] = React.useState([]);
    let isMounted = true;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <>
        <Grid paddingX={10} mt={5} container spacing={2} hidden={open}>
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
                            console.log(item.product.size[checkStock(item.size ?? '')])
                            return (
                                <CartItem
                                    sx={{ mb: 2 }}
                                    key={item.product_id}
                                    name={item.product.product_name}
                                    price={item.product.price}
                                    qty={Number(item.qty)}
                                    value={item.size}
                                    img={item.product.image[0].path}
                                    max={item.product.size[checkStock(item.size ?? '')]}
                                    onCheckedChange={(e) => handleCheckedChange(e, item.id)}
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
                            disabled={isLoading || cart.length == 0}
                            onClick={() => orderProduct()}
                        >
                            <Typography color={"white"}>
                                Pembayaran
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        
        <div className='mx-3' style={{marginTop : '30px'}}>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
            {open ? (
                <Checkout orderId={orderId} />
            ) : ''}
        </div>
        </>
    );
}
