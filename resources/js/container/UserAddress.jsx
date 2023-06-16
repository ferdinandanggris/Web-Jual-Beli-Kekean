import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography, FilledInput, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from "react";
import { get } from "lodash";

    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
          title: 'The Lord of the Rings: The Return of the King',
          year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          year: 2001,
        },
        {
          title: 'Star Wars: Episode V - The Empire Strikes Back',
          year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
          title: 'The Lord of the Rings: The Two Towers',
          year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
          title: 'Star Wars: Episode IV - A New Hope',
          year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        {
          title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
          year: 1964,
        },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        {
          title: 'Star Wars: Episode VI - Return of the Jedi',
          year: 1983,
        },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        {
          title: 'Eternal Sunshine of the Spotless Mind',
          year: 2004,
        },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
      ];
    


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
        console.log(event);
        setHighlightedInput({ name: option });
        console.log(option);
        console.log('On input change triggered');
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
              Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data berhasil disimpan',
                showConfirmButton: false,
                timer: 1500
              })
              setOpen(false);
            }
          })
        });
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
                                                  <Button size="small">Ubah Alamat</Button>
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