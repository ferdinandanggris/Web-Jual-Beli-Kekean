import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography, FilledInput, IconButton, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { get } from "lodash";

const UserAddress = () => {
    //Hook
    const [listProvinsi, setListProvinsi] = React.useState([]);
    const [listKota, setListKota] = React.useState([]);
    const [listAddress, setListAddress] = React.useState([]);
    const [province, setProvince] = React.useState({});
    const [kota, setKota] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState({
      m_user_id : '',
      label_alamat : '',
      nama: '',
      telepon: '',
      alamat_lengkap: '',
      m_kota_id: null,
      m_provinsi_id: null,
      kode_pos : '',
      catatan : '',
      kode_pos : '',
      is_utama : 0,
    });
  

    useEffect(() => {
      getProvince();
      getAddress();
    },[])
    
    //get Data
    const getProvince = async () => {
      await axios.get('/api/getProvinsi')
      .then((res) => {
          setListProvinsi(res.data.data);
        })
      };
      
      const getAddress = async () => {
        await axios.get('sanctum/csrf-cookie').then(response => {
          axios.get('/api/profil/address').then(res => {
            setListAddress(res.data.data);
          })
        })
      }
    
    const getAddressById = async (id) => {
      await axios.get(`/api/profil/address/${id}`)
      .then((res) => {
        getProvince()
        getKota(res.data.data.m_provinsi_id)
        setInput(res.data.data);
        setKota({name : res.data.data.kota.name, id : res.data.data.m_kota_id})
        setProvince({name : res.data.data.provinsi.name, id : res.data.data.m_provinsi_id})
        setOpen(true);
      })
    }
      
      const getKota = async (id) => {
    console.log(id);
      await axios.get(`/api/getKotaByProvince/${id}`)
      .then((res) => {
          setListKota(res.data.data);
      })
  };
    //get Data

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInput = (e) => {
      console.log(e.target.value);
      setInput({
          ...input,
          [e.target.name]: e.target.value,
      });
      };

      const handleSetKota = (e) => {
        setInput({
            ...input,
            [e.name]: e.value,
        })
    };
      const handleSetProvinsi = (e) => {
        setInput({
            ...input,
            [e.name]: e.value,
        })
    };
  
    const defaultProps = {
        options:listProvinsi,
        getOptionLabel: (option) => option.name,
      };
      const flatProps = {
        options:listProvinsi.map((option) => option.name),
      };
      const [value, setValue] = React.useState(null);

      const handleInputChange = (event, option, reason) => {
        setHighlightedInput({ name: option });
      };

      const handleGetOptionsLabel = (option) => {
        return option.name;
      };

      const selectedProvince = (event,newValue) => {
        if (newValue === null) {
          handleSetKota({ name: 'm_kota_id', value: '' });
          setKota({ name: '' });
          setListKota([]);
          return;
        }
        setProvince({ name: newValue });
        handleSetProvinsi({ name: 'm_provinsi_id', value: newValue.id });
        getKota(newValue.province_id);
      }
      
      const selectedCity = (event,newValue) => {
        setKota({ name: newValue });
        handleSetKota({ name: 'm_kota_id', value: newValue.id });
      }

      const changeUtama = (m_user_address_id) => {
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post(`/api/profil/address/utama/${m_user_address_id}`).then(res => {
            if(res.data.status === 200){
              getAddress();
              Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Alamat utama berhasil diubah',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        });
      }

      const save = () => {
        console.log(input);
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post('/api/profil/address', input).then(res => {
            console.log(res);
            if(res.data.status === 200){
              swal("Berhasil", "Data berhasil disimpan", "success")
              setOpen(false);
              getAddress();
            }
          })
        });
      }

      const deleteAddress = (id) =>{
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.delete(`/api/profil/address/${id}`).then(res => {
            if(res.data.status === 200){
              getAddress();
              swal("Berhasil", "Data berhasil dihapus", "success")
            }
          })
        })
      }
      

    return (
        <div style={{minHeight: "50vh"}}>
            <div style={{ margin : "10px 80px"}}>
            <div style={{display: "flex",flexDirection: "row-reverse"}}>
                <Button variant="contained" color="primary" size="small" style={{marginBottom:"20px",}}  onClick={handleClickOpen}>
                  <AddIcon/> Tambah Alamat
                </Button>
            </div>
            <Grid container justifyContent="center" spacing={4}>
            {listAddress.map((item,index) => (
                      <Grid item xs={12} sm={12} style={{minWidth:400}}>
                    
                              <Card sx={{}}>
                                  <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                                      <Grid item xs={8} sm={8}>
                                              <CardContent>
                                                  <Typography sx={{ fontSize: 14,fontWeight:"normal" }}  gutterBottom>
                                                  {item.nama} ({item.label_alamat})
                                                  </Typography>
                                                  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                  {item.telepon}
                                                  </Typography>
                                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                  {item.alamat_lengkap} ({item.kode_pos})
                                                  </Typography>
                                              </CardContent>
                                              <CardActions>
                                                  <Button size="small" onClick={()=>{getAddressById(item.id)}}>Ubah Alamat</Button>
                                                  <IconButton onClick={()=>{deleteAddress(item.id)}} color="primary">
                                                    <DeleteIcon />
                                                </IconButton>
                                              </CardActions>
                                      </Grid>
                                      <Grid item xs={4} sm={4} style={{marginRight : "10px",width:100}}>
                                        {item.is_utama == 0 ? 
                                          <Button variant="contained" color="primary" onClick={()=> changeUtama(item.id)} size="small" style={{marginTop:"20px"}}>
                                          Pilih
                                          </Button>  
                                        :  <Grid item xs={4} sm={4} style={{marginRight : "10px",width:100}}>
                                              <CheckIcon color="primary"/>
                                          </Grid>
                                        }
                                          
                                      </Grid>
                                  </Grid>   
                              </Card>
                      </Grid>
            ))}
            </Grid>
            </div>


            <div>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Tambah Alamat</DialogTitle>
                    <DialogContent style={{minWidth : "400px"}}>
                  
                    {/* <TextField id="standard-multiline-flexible" variant="standard" onChange={handleInput} value={input.nama} label="Nama Penerima" name="name" style={{width : "100%"}} /> */}
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    <FormControl variant="standard" sx={{width : "100%"}}>
                      <InputLabel htmlFor="component-simple" variant="standard">Nama penerima</InputLabel>
                      <FilledInput id="component-simple"variant="standard" name="nama" onChange={handleInput} value={input.nama} defaultValue="Composed TextField" style={{}} />
                    </FormControl>
                    </div>
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    <FormControl variant="standard" sx={{width : "100%"}}>
                      <InputLabel htmlFor="component-simple" variant="standard">Label</InputLabel>
                      <FilledInput id="component-simple"variant="standard" name="label_alamat" onChange={handleInput} value={input.label_alamat} defaultValue="Composed TextField" style={{}} />
                    </FormControl>
                    </div>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                    <Autocomplete
                        {...defaultProps}
                        id="select-on-focus" 
                        onChange={selectedProvince}
                        options={listProvinsi}
                        isOptionEqualToValue={(option, value) => option.province_id === value.province_id}
                        getOptionLabel={handleGetOptionsLabel}
                        renderInput={(params) => (
                        <TextField {...params}  name="m_provinsi_id" label="Provinsi" variant="standard" />
                        )}
                    />
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                    <Autocomplete
                        {...defaultProps}
                        id="select-on-focus" 
                        onChange={selectedCity}
                        options={listKota}
                        isOptionEqualToValue={(option, value) => option.city_id === value.city_id}
                        getOptionLabel={handleGetOptionsLabel}
                        renderInput={(params) => (
                        <TextField {...params}  name="m_kota_id" label="Kota" variant="standard" />
                        )}
                    />
                    </FormControl>
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    {/* <TextField id="standard-multiline-flexible" value={input.alamat_lengkap} onChange={handleInput} name="alamat_lengkap" variant="standard" label="Alamat Lengkap"  multiline style={{width : "100%"}} /> */}
                    </div>
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    <FormControl variant="standard" sx={{width : "100%"}}>
                      <InputLabel htmlFor="component-simple" variant="standard">Alamat lengkap</InputLabel>
                      <FilledInput id="component-simple"variant="standard" name="alamat_lengkap" onChange={handleInput} value={input.alamat_lengkap} defaultValue="Composed TextField" style={{}} />
                    </FormControl>
                    </div>
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    <FormControl variant="standard" sx={{width : "100%"}}>
                      <InputLabel htmlFor="component-simple" variant="standard">Kode Pos</InputLabel>
                      <FilledInput id="component-simple"variant="standard" name="kode_pos" onChange={handleInput} value={input.kode_pos} defaultValue="Composed TextField" style={{}} />
                    </FormControl>
                    </div>
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    <FormControl variant="standard" sx={{width : "100%"}}>
                      <InputLabel htmlFor="component-simple" variant="standard">Catatan</InputLabel>
                      <FilledInput id="component-simple"variant="standard" name="catatan" onChange={handleInput} value={input.catatan} defaultValue="Composed TextField" style={{}} />
                    </FormControl>
                    </div>
                    <div style={{marginTop: 5,marginBottom : 5}}>
                    <FormControl variant="standard" sx={{width : "100%"}}>
                      <InputLabel htmlFor="component-simple" variant="standard">Telepon</InputLabel>
                      <FilledInput id="component-simple"variant="standard" name="telepon" onChange={handleInput} value={input.telepon} defaultValue="Composed TextField" style={{}} />
                    </FormControl>
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{ py: 1.5, px: 3, ml: 2, mt: 5, mb: 2,backgroundColor : 'white','&:hover>p' : {color : 'white !important'} }}
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
                        onClick={()=> save()}
                    >
                        <Typography color={"white"}>
                            Simpan
                        </Typography>
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default UserAddress;