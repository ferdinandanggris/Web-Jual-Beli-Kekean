import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import SelectAddress from './selectAddress';
function Checkout(props) {
  const navigate = useNavigate();
  useEffect(()=>{
    getOrderById(props.orderId);
    getAlamatUtama();
  },[])

  const [alamat, setAlamat] = React.useState({
    id : 0,
    nama_penerima: '-',
    label : '-',
    alamat: '-',
    kecamatan: '',
    kota: '',
    provinsi: '',
    m_kota_id: 0,
    m_provinsi_id: 0,
    kode_pos: '-',
    no_hp: '-',
    catatan : 'Tidak ada catatan',
});

const [isLoading,setIsloading] = React.useState(false);
const [orderId, setOrderId] = React.useState("");
const [dataPembayaran, setDataPembayaran] = React.useState({
    pengiriman: '',
    total : 0,
    ongkir : 0,
    total_bayar : 0,
    id_transaksi : 'TRX-20211001-0001',
    id : '',
    status_pembayaran : 'pending',
    status_pemesanan : 'pending',
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
    navigate('/user/transaction')
  if (props?.sendData) {
      props.sendData(false);
  }
};

const getOrderById = async (id) => {
    await axios.get('sanctum/csrf-cookie').then(response => {
        axios.get(`api/order/${id}`).then(res => {
          setProductCheckout(res.data.data.detail);
            setDataPembayaran({...dataPembayaran, id_transaksi: res.data.data.id_transaksi, total: res.data.data.order.total_harga_produk, ongkir: res.data.data.order.biaya_pengiriman, total_bayar: res.data.data.order.total_harga_produk + res.data.data.order.ongkir, id: res.data.data.order.id, status: res.data.data.order.status_pembayaran,pengiriman : res.data.data.order.tipe_pengiriman,status_pemesanan : res.data.data.order.status_pemesanan});
            setOngkir(res.data.data.order.biaya_pengiriman);
            setAlamat({
              id : res.data.data.order.user_address.id,
              nama_penerima : res.data.data.order.user_address.nama,
              label : res.data.data.order.user_address.label_alamat,
              alamat : res.data.data.order.user_address.alamat_lengkap,
              m_kota_id : res.data.data.order.user_address.m_kota_id,
              m_provinsi_id : res.data.data.order.user_address.m_provinsi_id,
              kode_pos : res.data.data.order.user_address.kode_pos,
              catatan : res.data.data.order.user_address.catatan
            });
            console.log(res.data.data);
        })
    })
}

const getAlamatUtama = async () => {
    await axios.get('sanctum/csrf-cookie').then(response => {
    axios.get('api/profil/address/utama').then(res => {
            axios.post('api/ongkir',{m_provinsi_id : res.data.data.m_provinsi_id, m_kota_id: res.data.data.m_kota_id}).then(responseOngkir => {
                console.log({alamatId : alamat.id});
                if (alamat.id == 0) {
                  setAlamat(res.data.data);
                  
                }
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

const [pengiriman, setPengiriman] = React.useState('');

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
                order_id : props.orderId,
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
                    if (props.sendData) {
                        props.sendData(false);
                    }
                    navigate('/user/transaction');
                } else {
                    swal("Error", "Status gagal diupdate", "error");
                }
            })
    });
}

const setHargaPengiriman = (params) => {
    setDataPembayaran({...dataPembayaran, ongkir: params});
    setOngkir(params);
    console.log({ongkir : params});
}

const [openAlamat, setOpenAlamat] = React.useState(false);

const handleClickOpenAlamat = () => {
  setOpenAlamat(true);
};

const handleCloseAlamat = (value) => {
  setOpenAlamat(false);
  setAlamat(value);
  axios.post('api/ongkir',{m_provinsi_id : value.m_provinsi_id, m_kota_id: value.m_kota_id}).then(responseOngkir => {
    setListPengiriman(responseOngkir.data.data[0].costs);
    setOngkir(0);
    setDataPembayaran({...dataPembayaran, ongkir: 0});
    setDataPembayaran({...dataPembayaran, pengiriman: ''});
    // console.log(responseOngkir.data.data[0].cost);
})
};

const [selectedAlamat, setSelectedAlamat] = React.useState({});



  return (
    <>
      <Card>
        <CardHeader title="Detail Pembayaran"/>
        <hr style={{marginTop : 0}} />
        <CardContent>
            <Grid container spacing={2}>
                <Grid item laptop={6}>
                        <div style={{height : "400px",overflowY : "scroll"}}>
                    <DialogContentText style={{marginRight : 10,marginLeft : 10}}>
                        <div className='my-2'>
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
                                    {alamat.alamat} {alamat.kota} {alamat.provinsi} {alamat.kode_pos} ({alamat.catatan})
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* <Button size="small" onClick={()=>{navigate("/user/address")}}>Alamat Baru</Button> */}
                                    <Button size="small" onClick={handleClickOpenAlamat}>Ubah Alamat</Button>
                                </CardActions>
                            </Card>
                        </div>
                        <div className='my-2'>
                            <Typography variant="h6" gutterBottom>
                                Pengiriman
                            </Typography>
                            <Card sx={{ minWidth: 275 }}>
                              {()=>{console.log(datePembayaran.pengiriman)}}
                                <CardContent>
                                <FormControl id='select-pengiriman' sx={{ m: 1,marginTop : '3px' }} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Pilih Pengiriman</InputLabel>
                                    <Select variant="standard"
                                    value={dataPembayaran.pengiriman}
                                    IconComponent={KeyboardArrowDownIcon}
                                    onChange={selectPengiriman}
                                    displayEmpty
                                    underlineColor='transparent'
                                    label="Pilih Pengiriman"
                                    style={{border: 0,outline: 0,'&:focus': {border: 0,outline: 0}, '&:before': {border: 0,outline: 0}, '&:after': {border: 0,outline: 0}}}
                                    >
                                {listPengiriman && listPengiriman.map((item) => {
                                    return (
                                        <MenuItem value={item.service} onClick={()=>{setHargaPengiriman(item.cost[0].value)}}>
                                            <Grid container spacing={2}>
                                                <Grid item >
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        JNE - {item.service}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Estimasi tiba {item.cost[0].etd} hari
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
                        </div>
                        <div className='my-2'>
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
                                                              maxWidth : "100px",
                                                                height: { laptop: 90, desktop: 110 },
                                                                objectFit: "cover",
                                                                borderRadius: 0.5,
                                                                ml: 2,
                                                            }}
                                                            component="img"
                                                            src={`../storage/${item.gambar}`}
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
                        </div>
                    </DialogContentText>
                        </div>
                </Grid>
                <Grid item laptop={6} style={{width : "100%"}}>
                <DialogContentText>
                        <Card sx={{ minWidth: 275,marginTop : '3px' , width : '100%'}}>
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
            <hr />
        <DialogActions style={{height : "50px"}}>
        <Button
            variant="contained"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 1, mb: 2,backgroundColor : 'white','&:hover>p' : {color : 'white !important'} }}
            disabled={isLoading}
            onClick={handleClose}
        >
            <Typography color="primary" >
                Kembali
            </Typography>
        </Button>
        {()=>{console.log(dataPembayaran)}}
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 1, mb: 2 }}
            hidden= {dataPembayaran.status_pemesanan == 'settlement' || dataPembayaran.status_pemesanan == 'failure' || dataPembayaran.status_pemesanan == 'batal'|| dataPembayaran.status_pemesanan == 'expire'}
            disabled={isLoading || !alamat || !dataPembayaran.pengiriman }
            onClick={() => checkout({dataPembayaran : dataPembayaran,ongkir : ongkir,user_address_id : alamat.id})}
        >
            <Typography color={"white"}>
                Bayar
            </Typography>
        </Button>
        </DialogActions>
      </Card>

      <SelectAddress 
        open={openAlamat}
        selectedValue={alamat}
        onClose={handleCloseAlamat}
      />
    </>
  )
}
export default Checkout;