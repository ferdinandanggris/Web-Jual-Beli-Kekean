import { Box, Button, Card, CardActions, CardContent, CardHeader, DialogActions, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import Checkout from "../components/Checkout";

export default function HistoryTransaction(){

  useEffect(()=>{
    getTransactionByUser();
  },[])

  const [listTransaction,setListTransaction] = React.useState([]);
  const [orderId,setOrderId] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOrderId(id);
    setOpen(true);
  };

  const updateStatusOrder = async (id) => {
    axios.get("sanctum/csrf-cookie").then(async (response) => {
        await axios
            .post("api/order/update-status-batal", {
                id : id,
                status_pemesanan : 'batal',
            }).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    // swal("Success", "Status berhasil diupdate", "success");
                    // fetchData();
                    getTransactionByUser();
                } else {
                    swal("Error", "Status gagal diupdate", "error");
                }
            })
    });
}

  const getTransactionByUser = async() => {
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.get(`/api/profil/transaction`).then(res => {
        if(res.data.status === 200){
          setListTransaction(res.data.data);
         console.log(res.data.data);
        }
      })
    });
  }

  const sendData = (data)=>{
    setOpen(data);
  }

  return (
    <>
    <div className="mx-auto" hidden={open} style={{minHeight : "50vh",maxWidth : "1000px"}}>
      <Card sx={{maxWidth : "1000px"}} >
        <CardHeader sx={{fontWeight : "bold", fontSize : "12px"}} title="Riwayat Pesanan"/>
        <hr style={{marginTop: 0}}/>
        <CardContent style={{height : "60vh",overflowY:"scroll"}}>
            {listTransaction.map((element)=>{
              let status = "";
              let color = "";
              if (element.status_pemesanan == 'pending') {
                status = "Menunggu pembayaran";
                color = "#FFA41B";
              }else if(element.status_pemesanan == 'settlement'){
                if (element.status_approval == "pending") {
                  status = "Menunggu persetujuan dari admin"
                  color = "#F86F03";
                }else if(element.status_approval == "approve"){
                  status = "Barang dalam proses pengiriman"
                  color = "#1C6758";
                  if (element.status_pengiriman == "dikemas") {
                    status = "Barang sedang dikemas"
                    color = "#1C6758";
                    
                  }else if(element.status_pengiriman == "pengiriman"){
                    status = "Barang sedang dikirim"
                    color = "#1C6758";
                }else{
                  status = "Barang sudah sampai"
                  color = "#1C6758";
                }
              }
            }else if(element.status_pemesanan == 'batal'){
              status = "Pesanan dibatalkan"
              color = "#FF6464";
            }else{
              status = "Pembayaran sudah expired";
              color = "#FF6464";
            }

              return (
                <Card sx={{ minWidth: 275 }} style={{marginTop : 14,marginBottom : 14}}>
                  <CardContent>
                  <Grid container justifyContent={"space-between"} spacing={2}>
                    <Grid item>
                      <Typography style={{fontSize:"12px"}}>{element.id_transaksi}  <span style={{padding : "2px 4px",backgroundColor: color,borderRadius : "4px",fontSize:"12px",fontWeight : "normal",color : "white"}}>{status}</span></Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{fontSize:"12px"}} >{element.waktu}</Typography>
                    </Grid>
                  </Grid>
                  <Typography hidden={element.status_pemesanan != 'settlement' && (element.status_pengiriman != 'pengiriman' || element.status_pengiriman != 'selesai')} style={{fontSize:"12px",fontWeight : 'normal',marginTop: '5px'}} ><span style={{fontWeight: 'bold'}}>Resi</span> : {element.resi ?? '-'}</Typography>
                    <hr style={{marginLeft : 2,marginRight : 2}}/>
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
                                  src={`../storage/${element.order_detail_with_product[0].product.image[0].path}`}
                              />
                          </Grid>
                          <Grid item laptop={8}>
                            <Grid container alignContent={"center"} spacing={3}>
                              <Grid item laptop={9} >
                              <Stack
                                  maxWidth={360}
                                  direction={"row"}
                                  justifyContent={"space-between"}
                              >
                                  <Box>
                                      <Typography fontSize={14}>{element.order_detail_with_product[0].product.product_name}</Typography>
                                      <Stack
                                          alignItems={"center"}
                                          mt={{ desktop: 1 }}
                                          spacing={2}
                                          direction={"row"}
                                      >
                                          <Typography fontSize={12}>Jumlah : {element.order_detail_with_product[0].qty}</Typography>
                                      </Stack>
                                      <Typography fontSize={15} style={{fontWeight : '400',color : 'gray'}}>
                                          Rp.{(element.order_detail_with_product[0].harga).toLocaleString()}
                                      </Typography>
                                  </Box>
                              </Stack>
                              </Grid>
                              <Grid item laptop={3} style={{margin : "auto"}}>
                                  <Typography style={{fontSize: "16px"}}>Total Belanja</Typography>
                                  <Typography fontSize={20} style={{fontWeight : '700'}}>Rp.{(Number(element.total_harga_produk) + Number(element.biaya_pengiriman)).toLocaleString()}</Typography>
                              </Grid>
                            </Grid>
    
                          </Grid>
                          <DialogActions  style={{width : "100%"}}>
                          <hr style={{marginLeft : 2,marginRight : 2}}/>
                            <Grid container justifyContent={"end"} style={{width : "100%"}}>
                              <Grid item>
                            <Button hidden={element.status_pemesanan == 'settlement' || element.status_pemesanan == 'batal' ? true :false }
                                variant="contained"
                                sx={{ py: 1, px: 2,marginRight : "10px",backgroundColor : 'white','&:hover>p' : {color : 'white !important',}}}  
                                onClick={()=>{updateStatusOrder(element.id)}}                    
                            >
                                <Typography style={{fontSize: "14px"}} color="primary">
                                    Batalkan 
                                </Typography>
                            </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ py: 1, px: 2,}}  
                                onClick={()=>{handleClickOpen(element.id)}}                    
                            >
                                <Typography style={{fontSize: "14px"}} color={"white"}>
                                    Detail
                                </Typography>
                            </Button>
                              </Grid>
                            </Grid>
                          </DialogActions>
                  </Grid>
                  </CardContent>
                </Card>
              )
            })}
           

        </CardContent>
    </Card>

    </div>
    <div className="mx-3" style={{marginTop:"30px"}}>
      {open ? (
                  <Checkout sendData={sendData} orderId={orderId} />
              ) : ''}

    </div>
    </>
  )
}