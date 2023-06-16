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

    const [alamat, setAlamat] = React.useState({
            id : 0,
            nama_penerima: 'Ferdinand Anggris',
            label : 'Rumah',
            alamat: 'Jl. Raya Cipadung No. 9',
            kecamatan: 'Cibiru',
            m_kota_id: 0,
            m_provinsi_id: 0,
            kode_pos: '40614',
            no_hp: '081234567890',
            catatan : 'Tidak ada catatan'
    });

    const [orderId, setOrderId] = React.useState("");
    const [dataPembayaran, setDataPembayaran] = React.useState({
        pengiriman: '',
        total : 300000,
        ongkir : 20000,
        total_bayar : 320000,
        id_transaksi : 'TRX-20211001-0001',
        id : '',
        status : 'Menunggu Pembayaran'
    });

    const [ongkir,setOngkir] = React.useState(0);
    const [productCheckout, setProductCheckout] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [cart, setCart] = React.useState([]);
    const [quantity, setQuantity] = React.useState(0);
    const [listPengiriman, setListPengiriman] = React.useState([]);
    let isMounted = true;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
      setOpen(true);
      getOrderById(id);
      getAlamatUtama();
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const getOrderById = async (id) => {
        await axios.get('sanctum/csrf-cookie').then(response => {
            axios.get(`api/order/${id}`).then(res => {
                setDataPembayaran({...dataPembayaran, id_transaksi: res.data.data.id_transaksi, total: res.data.data.order.total_harga_produk, ongkir: res.data.data.order.ongkir, total_bayar: res.data.data.order.total_harga_produk + res.data.data.order.ongkir, id: res.data.data.order.id, status: res.data.data.order.status});
                setProductCheckout(res.data.data.detail);
                console.log(res.data.data);
            })
        })
    }

    const getAlamatUtama = async () => {
        await axios.get('sanctum/csrf-cookie').then(response => {
        axios.get('api/profil/address/utama').then(res => {
                axios.post('api/ongkir',{m_provinsi_id : res.data.data.m_provinsi_id, m_kota_id: res.data.data.m_kota_id}).then(responseOngkir => {
                    setAlamat(res.data.data);
                    setListPengiriman(responseOngkir.data.data[0].costs);
                    // console.log(responseOngkir.data.data[0].cost);

                })
            })
        })
    }


    const getHargaOngkir = async () => {
        await axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/ongkir', {pengiriman: dataPembayaran.pengiriman,m_provinsi_id : dataPembayaran.alamat.m_provinsi_id, m_kota_id: dataPembayaran.alamat.m_kota_id}).then(res => {
                // setDataPembayaran({...dataPembayaran, ongkir: res.data.ongkir});
                console.log(res.data.data);
            })
        })
    }

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

    useEffect(() => {
        total = cart.reduce((acc, tot) => {
            return acc + (tot.checked == true ? tot.product.price * tot.qty : 0);
        }, 0);
        console.log(total);
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

    const [pengiriman, setPengiriman] = React.useState('');

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

    const selectPengiriman = (event) => {
        // setPengiriman(event.target.value);
        setDataPembayaran({...dataPembayaran, pengiriman: event.target.value});
        
      };
    
    const checkout = async ({dataPembayaran,ongkir,user_address_id}) => {
        axios.get("sanctum/csrf-cookie").then(async (response) => {
            await axios
                .post("api/order/checkout", {
                    user_address_id : user_address_id,
                    ongkir : ongkir,
                    tipe_pengiriman : dataPembayaran.pengiriman,
                    order_id : orderId,
                }).then((res) => {  
                    console.log(res.data);
                    if (res.data.status == 200) {
                        snap.pay(res.data.data.snap_token,{
                            // Optional
                            onSuccess: function(result) {
                                /* You may add your own js here, this is just example */
                                // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                                console.log({'success' : result})
                                updateStatusOrder(result);

                            },
                            // Optional
                            onPending: function(result) {
                                /* You may add your own js here, this is just example */
                                // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                                console.log({pending : result})
                                updateStatusOrder(result);
                            },
                            // Optional
                            onError: function(result) {
                                /* You may add your own js here, this is just example */
                                // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
                                console.log({error : result})
                                updateStatusOrder(result);
                            }
                        });
                    } else {
                        swal("Error", "Checkout Gagal", "error");
                    }
                })
        });
    };

    const updateStatusOrder = async (order) => {
        axios.get("sanctum/csrf-cookie").then(async (response) => {
            await axios
                .post("api/order/update-status", {
                    transaksi_id : order.order_id,
                    status_pemesanan : order.transaction_status,
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.status == 200) {
                        // swal("Success", "Status berhasil diupdate", "success");
                        // fetchData();
                        navigate('/');
                    } else {
                        swal("Error", "Status gagal diupdate", "error");
                    }
                })
        });
    }

    const orderProduct = async () => {
        
        axios.get("sanctum/csrf-cookie").then(async (response) => {
            await axios
                .post("api/order", {
                    cart: cart.filter((item)=> item.checked == true),
                    total_price: totalPrice,
                })
                .then((res) => {
                    console.log(res.data);
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

    const setHargaPengiriman = (params) => {
        setDataPembayaran({...dataPembayaran, ongkir: params});
        setOngkir(params);
        console.log({ongkir : params});
    }

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
        
        <div className='mt-4 mx-3'>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Card hidden={!open}>
        <CardHeader title="Detail Pembayaran"/>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item laptop={6}>
                        <div style={{height : "400px",overflowY : "scroll"}}>
                    <DialogContentText style={{marginRight : 10,marginLeft : 10}}>
                            <Typography variant="h6" gutterBottom>
                                Alamat Pembayaran
                            </Typography>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14,fontWeight:"normal" }}  gutterBottom>
                                    {alamat.nama_penerima} ({alamat.label})
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                    {alamat.no_hp}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {alamat.alamat} {alamat.kode_pos} ({alamat.catatan})
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Tambah Alamat</Button>
                                    <Button size="small">Alamat Lain</Button>
                                </CardActions>
                            </Card>

                            <Typography variant="h6" gutterBottom>
                                Pengiriman
                            </Typography>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                <FormControl id='select-pengiriman' sx={{ m: 1, minWidth: 120,marginTop : '3px' }}>
                                    <Select variant="outlined"
                                    value={dataPembayaran.pengiriman}
                                    IconComponent={KeyboardArrowDownIcon}
                                    onChange={selectPengiriman}
                                    displayEmpty
                                    underlineColor='transparent'
                                    mode='outlined'
                                    style={{backgroundColor : '#edcbcb',color : 'white !important',	border: 0,outline: 0,'&:focus': {border: 0,outline: 0}, '&:before': {border: 0,outline: 0}, '&:after': {border: 0,outline: 0}}}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                {listPengiriman && listPengiriman.map((item) => {
                                    return (
                                        <MenuItem value={item.service} onClick={()=>{setHargaPengiriman(item.cost[0].value)}}>
                                            <Grid container spacing={2}>
                                                <Grid item >
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        {item.service}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Estimasi tiba {item.cost[0].etd} Jun
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        {item.cost[0].value}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            
                                        </MenuItem>
                                    )
                                })}
                                    </Select>
                                    
                                </FormControl>
                                </CardContent>
                            </Card>

                            <Typography variant="h6" gutterBottom>
                                Produk Yang Dibeli
                            </Typography>
                            <Card sx={{ minWidth: 275 }} style={{marginBottom : '3px'}}>
                                <CardContent >
                                    {productCheckout.map((item,i) => {
                                        return (
                                            <>
                                            <Grid container spacing={3}>
                                                <Grid item laptop={3}>
                                                        <Box
                                                            sx={{
                                                                width: { laptop: 90, desktop: 110 },
                                                                height: { laptop: 90, desktop: 110 },
                                                                aspectRatio: 1 / 1,
                                                                objectFit: "cover",
                                                                borderRadius: 0.5,
                                                                ml: 2,
                                                            }}
                                                            component="img"
                                                            src={`./storage/${item.gambar}`}
                                                        />
                                                    </Grid>
                                                    <Grid item laptop={8}>
                                                        <Stack
                                                            maxWidth={360}
                                                            direction={"row"}
                                                            justifyContent={"space-between"}
                                                        >
                                                            <Box>
                                                                <Typography fontSize={20}>{item.nama}</Typography>
                                                                <Stack
                                                                    alignItems={"center"}
                                                                    mt={{ desktop: 2 }}
                                                                    spacing={2}
                                                                    direction={"row"}
                                                                >
                                                                    <Typography>Size: {item.size}</Typography>
                                                                    <Typography> Jumlah: {item.qty}</Typography>
                                                                </Stack>
                                                                <Typography fontSize={18} style={{fontWeight : '700'}}>
                                                                    {item.harga.toLocaleString()}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        

                                                    </Grid>
                                            </Grid>
                                            <hr hidden={(productCheckout.length -1 <= i)}/>
                                            </>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                    </DialogContentText>
                        </div>
                </Grid>
                <Grid item laptop={6}>
                <DialogContentText>
                        <Card sx={{ minWidth: 275,marginTop : '3px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 18,fontWeight: 'normal' }} gutterBottom>
                                Ringkasan Pembayaran
                                </Typography>
                                
                                <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                <Typography variant="body2">
                                Total Harga ({productCheckout.length} Produk)
                                </Typography>
                                <Typography variant="body2">
                                Rp{(parseInt(dataPembayaran.total)).toLocaleString()}
                                </Typography>
                                </Stack>
                                
                                <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                <Typography variant="body2">
                                Ongkos Kirim
                                </Typography>
                                <Typography variant="body2">
                                Rp{(parseInt(ongkir)).toLocaleString()}
                                </Typography>
                                </Stack>
                                <hr />
                                <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                <Typography sx={{ fontSize: 18,fontWeight: 'normal' }} gutterBottom>
                                Total Pembayaran
                                </Typography>
                                <Typography sx={{ fontSize: 18,fontWeight: 'normal' }} gutterBottom>
                                Rp{(parseInt(dataPembayaran.total) + parseInt(ongkir)).toLocaleString()}
                                </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </DialogContentText>
                </Grid>
            </Grid>

        </CardContent>
        <DialogActions>
        <Button
            variant="contained"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2,backgroundColor : 'white','&:hover>p' : {color : 'white !important'} }}
            disabled={isLoading}
            onClick={handleClose}
        >
            <Typography color="primary" >
                Cancel
            </Typography>
        </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2 }}
            disabled={isLoading || !alamat || !dataPembayaran.pengiriman}
            onClick={() => checkout({dataPembayaran : dataPembayaran,ongkir : ongkir,user_address_id : alamat.id})}
        >
            <Typography color={"white"}>
                Bayar
            </Typography>
        </Button>
        </DialogActions>
      </Card>
      {/* <Dialog fullWidth='lg' open={open} onClose={handleClose}>
        <DialogTitle>Detail Pembayaran</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item laptop={6}>
                        <div style={{height : "400px",overflowY : "scroll"}}>
                    <DialogContentText style={{marginRight : 10,marginLeft : 10}}>
                            <Typography variant="h6" gutterBottom>
                                Alamat Pembayaran
                            </Typography>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14,fontWeight:"normal" }}  gutterBottom>
                                    {dataPembayaran.alamat.nama_penerima} ({dataPembayaran.alamat.label})
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                    {dataPembayaran.alamat.no_hp}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {dataPembayaran.alamat.alamat} {dataPembayaran.alamat.kecamatan} {dataPembayaran.alamat.kabupaten} {dataPembayaran.alamat.provinsi} {dataPembayaran.alamat.kode_pos}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Tambah Alamat</Button>
                                    <Button size="small">Alamat Lain</Button>
                                </CardActions>
                            </Card>

                            <Typography variant="h6" gutterBottom>
                                Pengiriman
                            </Typography>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                <FormControl id='select-pengiriman' sx={{ m: 1, minWidth: 120,marginTop : '3px' }}>
                                    <Select variant="outlined"
                                    value={dataPembayaran.pengiriman}
                                    IconComponent={KeyboardArrowDownIcon}
                                    onChange={selectPengiriman}
                                    displayEmpty
                                    underlineColor='transparent'
                                    mode='outlined'
                                    style={{backgroundColor : '#edcbcb',color : 'white !important',	border: 0,outline: 0,'&:focus': {border: 0,outline: 0}, '&:before': {border: 0,outline: 0}, '&:after': {border: 0,outline: 0}}}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'JNE'}>
                                        <Grid container spacing={2}>
                                            <Grid item >
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    Regular
                                                </Typography>
                                                <Typography variant="body2">
                                                    Estimasi tiba 13 - 15 Jun
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    Rp23.000
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        
                                    </MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    
                                </FormControl>
                                </CardContent>
                            </Card>

                            <Typography variant="h6" gutterBottom>
                                Produk Yang Dibeli
                            </Typography>
                            <Card sx={{ minWidth: 275 }} style={{marginBottom : '3px'}}>
                                <CardContent >
                                    {dataPembayaran.product.map((item,i) => {
                                        return (
                                            <>
                                            <Grid container spacing={3}>
                                                <Grid item laptop={3}>
                                                        <Box
                                                            sx={{
                                                                width: { laptop: 90, desktop: 110 },
                                                                height: { laptop: 90, desktop: 110 },
                                                                aspectRatio: 1 / 1,
                                                                objectFit: "cover",
                                                                borderRadius: 0.5,
                                                                ml: 2,
                                                            }}
                                                            component="img"
                                                            src={`../images/logo-bca.png`}
                                                        />
                                                    </Grid>
                                                    <Grid item laptop={8}>
                                                        <Stack
                                                            maxWidth={360}
                                                            direction={"row"}
                                                            justifyContent={"space-between"}
                                                        >
                                                            <Box>
                                                                <Typography fontSize={20}>Batik Murni</Typography>
                                                                <Stack
                                                                    alignItems={"center"}
                                                                    mt={{ desktop: 2 }}
                                                                    spacing={2}
                                                                    direction={"row"}
                                                                >
                                                                    <Typography>Size: XL</Typography>
                                                                    <Typography> Jumlah: 10</Typography>
                                                                </Stack>
                                                                <Typography fontSize={18} style={{fontWeight : '700'}}>
                                                                    {`Rp. 20.000`}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                        

                                                    </Grid>
                                            </Grid>
                                            <hr hidden={(dataPembayaran.product.length -1 <= i)}/>
                                            </>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                    </DialogContentText>
                        </div>
                </Grid>
                <Grid item laptop={6}>
                <DialogContentText>
                        <Card sx={{ minWidth: 275,marginTop : '3px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 18,fontWeight: 'normal' }} gutterBottom>
                                Ringkasan Pembayaran
                                </Typography>
                                
                                <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                <Typography variant="body2">
                                Total Harga ({dataPembayaran.product.length} Produk)
                                </Typography>
                                <Typography variant="body2">
                                Rp{dataPembayaran.total}
                                </Typography>
                                </Stack>
                                
                                <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                <Typography variant="body2">
                                Ongkos Kirim
                                </Typography>
                                <Typography variant="body2">
                                Rp{dataPembayaran.ongkir}
                                </Typography>
                                </Stack>
                                <hr />
                                <Stack direction="row" useFlexGap flexWrap="wrap" justifyContent="space-between">
                                <Typography sx={{ fontSize: 18,fontWeight: 'normal' }} gutterBottom>
                                Total Pembayaran
                                </Typography>
                                <Typography sx={{ fontSize: 18,fontWeight: 'normal' }} gutterBottom>
                                Rp{dataPembayaran.total_bayar}
                                </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </DialogContentText>
                </Grid>
            </Grid>

        </DialogContent>
        <DialogActions>
        <Button
            variant="contained"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2,backgroundColor : 'white','&:hover>p' : {color : 'white !important'} }}
            disabled={isLoading}
            onClick={handleClose}
        >
            <Typography color="primary" >
                Cancel
            </Typography>
        </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2 }}
            disabled={isLoading}
            onClick={() => checkout(dataPembayaran)}
        >
            <Typography color={"white"}>
                Bayar
            </Typography>
        </Button>
        </DialogActions>
      </Dialog> */}
    </div>
        </>
    );
}
