import { Box, Button, Card, CardContent, CardHeader, DialogActions, DialogContentText, FilledInput, FormControl, Grid, InputLabel, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from "axios";

export default function EditOrder(props){

    const navigate = useNavigate();
    useEffect(()=>{
      setOrderId(props.orderId);
      getOrderById(props.orderId);
      getAlamatUtama();
    },[])

    const [alamat, setAlamat] = React.useState({
      id : 0,
      nama_penerima: 'Ferdinand Anggris',
      label : 'Rumah',
      alamat: 'Jl. Raya Cipadung No. 9',
      kecamatan: '',
      kota: '',
      provinsi: '',
      m_kota_id: 0,
      m_provinsi_id: 0,
      kode_pos: '40614',
      no_hp: '081234567890',
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
      status_pemesanan : 'pending',
      status_approval : 'pending',
      status_pengiriman : 'dikemas',
      resi : '',
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
    props.sendData(false);
    navigate('/admin/order')
  };

  const getOrderById = async (id) => {
      await axios.get('sanctum/csrf-cookie').then(response => {
          axios.get(`api/order/${id}`).then(res => {
            setProductCheckout(res.data.data.detail);
              setDataPembayaran({...dataPembayaran, id_transaksi: res.data.data.id_transaksi, total: res.data.data.order.total_harga_produk, ongkir: res.data.data.order.biaya_pengiriman, total_bayar: res.data.data.order.total_harga_produk + res.data.data.order.ongkir, id: res.data.data.order.id, status: res.data.data.order.status_pemesanan,pengiriman : res.data.data.order.tipe_pengiriman,status_approval : res.data.data.order.status_approval,status_pengiriman : res.data.data.order.status_pengiriman ?? 'dikemas',resi : res.data.data.order.resi,status_pemesanan : res.data.data.order.status_pemesanan});
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
              .post("api/order/update-status-batal", {
                  transaksi_id : order.order_id,
                  status_pemesanan : order.transaction_status,
              }).then((res) => {
                  console.log(res.data);
                  if (res.data.status == 200) {
                      // swal("Success", "Status berhasil diupdate", "success");
                      // fetchData();
                      props.sendData(false);
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

  const [alignment, setAlignment] = React.useState('web');

  const handleChangeStatusPemesanan = (event, newAlignment) => {
    setDataPembayaran({...dataPembayaran, status_pemesanan: newAlignment});
  };

  const handleChangeStatusPengiriman = (event, newAlignment) => {
    setDataPembayaran({...dataPembayaran, status_pengiriman: newAlignment});
  };

  const handleChangeStatusApproval = (event, newAlignment) => {
    setDataPembayaran({...dataPembayaran, status_approval: newAlignment});
  }

  const handleInput = (event) => {
    setDataPembayaran({...dataPembayaran, [event.target.name]: event.target.value});
  }

  const saveOrder = async (orderId) => {
    axios.get("sanctum/csrf-cookie").then(async (response) => {
      await axios.post("api/order/saveAdmin", {
        order_id : orderId,
        status_pemesanan : dataPembayaran.status_pemesanan,
        status_approval : dataPembayaran.status_approval,
        status_pengiriman : dataPembayaran.status_pengiriman,
        resi : dataPembayaran.resi,
      }).then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          swal("Success", "Status berhasil diupdate", "success");
          handleClose();
        } else {
          swal("Error", "Status gagal diupdate", "error");
        }
      })
    })
  }

  return (
    <>
    <Card>
      <CardHeader title="Detail Order"/>
      <hr style={{marginTop : 0}} />
      <CardContent>
          <Grid container spacing={2}>
              <Grid item laptop={6}>
                      <div style={{height : "400px",overflowY : "scroll"}}>
                  <DialogContentText style={{marginRight : 10,marginLeft : 10}}>
                      <div className='my-2'>
                          <Typography variant="h6" gutterBottom>
                              Alamat Pengiriman
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
                          </Card>
                      </div>
                      <div className='my-2'>
                          <Typography variant="h6" gutterBottom>
                              Pengiriman
                          </Typography>
                          <Card sx={{ minWidth: 275 }}>
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
                                  disabled={true}
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

                      <Grid container spacing={3} style={{marginTop : '3px'}} alignContent="center">
                          <Grid item laptop={4} style={{margin : 'auto'}}>
                          <Typography sx={{ fontSize: 14,fontWeight: 'normal' }} >
                                  Setujui Pembelian :
                            </Typography>
                            </Grid>
                          <Grid item laptop={8}>
                          <ToggleButtonGroup
                            color="primary"
                            value={dataPembayaran.status_approval}
                            exclusive
                            onChange={handleChangeStatusApproval}
                            aria-label="Platform"
                          >
                            <ToggleButton value="approve">Setujui</ToggleButton>
                            <ToggleButton value="pending">Pending</ToggleButton>
                            <ToggleButton value="decline">Tolak</ToggleButton>
                          </ToggleButtonGroup>
                            </Grid>
                          <Grid item laptop={4} style={{margin : 'auto'}}>
                          <Typography sx={{ fontSize: 14,fontWeight: 'normal' }} >
                                  Proses Pengiriman :
                            </Typography>
                            </Grid>
                          <Grid item laptop={8}>
                          <ToggleButtonGroup
                            color="primary"
                            value={dataPembayaran.status_pengiriman}
                            exclusive
                            onChange={handleChangeStatusPengiriman}
                            aria-label="Platform"
                          >
                            <ToggleButton value="dikemas">Dikemas</ToggleButton>
                            <ToggleButton value="pengiriman">Pengiriman</ToggleButton>
                            <ToggleButton value="selesai">Selesai</ToggleButton>
                          </ToggleButtonGroup>
                            </Grid>
                            <Grid item laptop={4} style={{margin : 'auto'}}>
                          <Typography sx={{ fontSize: 14,fontWeight: 'normal' }} >
                                  Status Pembayaran :
                            </Typography>
                            </Grid>
                          <Grid item laptop={8}>
                          <ToggleButtonGroup
                            color="primary"
                            value={dataPembayaran.status_pemesanan}
                            exclusive
                            onChange={handleChangeStatusPemesanan}
                            aria-label="Platform"
                          >
                            <ToggleButton value="pending">Pending</ToggleButton>
                            <ToggleButton value="settlement">Terbayar</ToggleButton>
                            <ToggleButton value="expire">Expire</ToggleButton>
                            <ToggleButton value="batal">Batal</ToggleButton>
                          </ToggleButtonGroup>
                            </Grid>
                            <Grid item laptop={4} style={{margin : 'auto'}}>
                          <Typography sx={{ fontSize: 14,fontWeight: 'normal' }} >
                                  No. Resi :
                            </Typography>
                            </Grid>
                          <Grid item laptop={8}>
                            <div style={{marginTop: 5,marginBottom : 5}}>
                            <FormControl variant="standard" sx={{width : "100%"}}>
                              <FilledInput id="component-simple"variant="standard" name="resi" onChange={handleInput} value={dataPembayaran.resi} placeholder="249729147" style={{}} />
                            </FormControl>
                            </div>
                          </Grid>

                        </Grid>
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
      <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ py: 1.5, px: 3, ml: 2, mt: 1, mb: 2 }}
            disabled={isLoading || !alamat || !dataPembayaran.pengiriman }
            onClick={() => saveOrder(orderId)}
        >
            <Typography color={"white"}>
                Simpan
            </Typography>
        </Button>
      </DialogActions>
    </Card>
  </>
  )
}