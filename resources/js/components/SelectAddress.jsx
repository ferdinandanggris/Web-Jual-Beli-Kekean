import { Avatar, CardContent, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';


export default function SelectAddress(props) {
  const { onClose, selectedValue, open } = props;
  const [listAddress, setListAddress] = React.useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    getAddress();
  },[])

  const getAddress = async () => {
    await axios.get('sanctum/csrf-cookie').then(response => {
      axios.get('/api/profil/getAddressByUser').then(res => {
        setListAddress(res.data.data);
      })
    })
  }



  const emails = ['username@gmail.com', 'user02@gmail.com'];

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pilih Alamat</DialogTitle>
      <List sx={{ pt: 0 }}>
        {listAddress.map((alamat) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(alamat)} key={alamat.id}>
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
            </ListItemButton>
          </ListItem>
        ))}
{/* 
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Dialog>
  );
}