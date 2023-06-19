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
        axios.get(`api/cart`).then((res) => {
            setCart(res.data.cart.map((item) => {return {...item, checked: false}}));
        
        });

        setIsLoading(false);
    };

    const fetchingFirst = async () => {
        axios.get(`api/cart`).then((res) => {
            setSelectedCart(res.data.cart.map((item) => {return {...item, checked: false}}));
        });
    }

    const [margin,setMargin] = React.useState("30px");

    useEffect(() => {
        fetchData();
        fetchingFirst();
        // total = cart.reduce((acc, tot) => {
        //     return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
        // }, 0);

        // setTotalPrice(total);
        
    },[])

    // const {
    //     isLoading,
    //     isError,
    //     error,
    // } = useQuery({
    //     queryKey: ["cartItem"],
    //     queryFn: fetchData,
    // });
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState(null);
    var total;
    // if (!isLoading) {
    //     total = cart.reduce((acc, tot) => {
    //         return acc + (tot.product.checked ? tot.product.price * tot.qty : 0);
    //     }, 0);
    //     setTotalPrice(total);
    // }

    const handleQtyChange = async (event, cart_id) => {
        const newQty = { newQty: event.target.value == '' ? '0' : event.target.value };
        await updateCartQuantity({ cart_id: cart_id, newQty: newQty,event: event });
        await fetchData();
        
        // updateMutation.mutate({ cart_id: cart_id, newQty: newQty });
    };
    
    const handleCheckedChange = (event, cart_id) => {
        const newQty = { checked: event.target.checked };
        let tempCart = selectedCart.map((item) => {
            if (item.id == cart_id) {
                return {...item, product: {...item.product},checked: event.target.checked};    
            }else{
                return {...item}
            }   
        });  
        
        // setCart(tempCart);
        setSelectedCart(tempCart);
        let total = 0;
        total = tempCart.reduce((acc, tot) => {
            return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
        }, 0);
        setTotalPrice(total);
        // updateMutation.mutate({ cart_id: cart_id, newQty: newQty });
    };

    const updateCartQuantity = async ({ cart_id, newQty,event }) => {
        return await axios.put(`api/cart-update-quantity/${cart_id}`, newQty).then((res) => {
            let tempCart = selectedCart.map((item) => {
                if (item.id == cart_id) {
                    return {...item, product: {...item.product},qty: Number(newQty.newQty)};    
                }else{
                    return {...item}
                }   
            });  

            setSelectedCart(tempCart);
            // let total = 0;
            // console.log({cart : cart})
            total = tempCart.reduce((acc, tot) => {
                return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
            }, 0);
            setTotalPrice(total);
        });
    };

    const updateMutation = useMutation(updateCartQuantity, {
        onSuccess: () => {
            queryClient.invalidateQueries("cartItem");
        },
    });

    const deleteCartItem = async ({ e, cart_id }) => {
         axios.delete(`api/delete-cart-item/${cart_id}`).then((res) => {
            let tempCart = selectedCart.filter((item) => item.id != cart_id);  

            setSelectedCart(tempCart);
            // let total = 0;
            // console.log({cart : cart})
            total = tempCart.reduce((acc, tot) => {
                return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
            }, 0);
            setTotalPrice(total);

            fetchData();
         });

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
        await axios.get('sanctum/csrf-cookie').then(response => {
            axios.get('/api/profil/address').then(res => {
              if (res.data.data.length > 0) {
                let utama = res.data.data.filter((item) => item.is_utama ==1);
                if (utama.length > 0) {

                    if (selectedCart.length >0) {                        
                        axios.get("sanctum/csrf-cookie").then(async (response) => {
                            await axios
                                .post("api/order", {
                                    cart: selectedCart,
                                    total_price: totalPrice,
                                })
                                .then((res) => {
                                    setOrderId(res.data.data.id);
                                    if (res.data.status == 200) {
                                        handleClickOpen(res.data.data.id);
                                            
                                    } else {
                                        swal("Error", "Pesanan gagal dibuat", "error");
                                    }
                                });
                        })
                    }else{
                        swal({
                            title: "Warning",
                            text: "Anda belum memilih produk, silahkan pilih produk yang akan dipesan",
                            icon: "warning",
                            dangerMode: true,
                        });
                    }
                }else{
                    swal({
                        title: "Warning",
                        text: "Anda belum memiliki alamat utama, silahkan pilih alamat utama pada menu profil",
                        icon: "warning",
                        dangerMode: true,
                    });
                }
              }else{
                swal({
                    title: "Warning",
                    text: "Anda belum memiliki alamat, silahkan tambahkan alamat pada menu profil",
                    icon: "warning",
                    dangerMode: true,
                });
              }
            })
          })
       
    }


    const [orderId, setOrderId] = React.useState("");


    const [totalPrice, setTotalPrice] = React.useState(0);
    const [cart, setCart] = React.useState([]);
    const [selectedCart, setSelectedCart] = React.useState([]);
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
                                        deleteCartItem({e: e, cart_id: item.id})
                                        // deleteMutation.mutate({
                                        //     e: e,
                                        //     cart_id: item.id,
                                        // })
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
                                `RP. ${(parseInt(totalPrice)).toLocaleString()}`
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
