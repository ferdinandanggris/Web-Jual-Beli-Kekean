import React from "react";
import {
    Box,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    IconButton,
    Checkbox,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

export default function CartItem({
    name,
    price,
    img,
    qty,
    onQtyChange,
    value,
    onDeleteClick,
    sx,
    max,
    onCheckedChange,
}) {
    const handleChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <Box sx={sx} pt={2} id="CartItem">
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
                        src={`../storage/${img}`}
                    />
                </Grid>
                <Grid item laptop={8}>
                    <Stack
                        maxWidth={360}
                        direction={"row"}
                        justifyContent={"space-between"}
                    >
                        <Box>
                            <Typography fontSize={20}>{name}</Typography>
                            <Typography color={"#7D7D7D"}>
                                {`Rp. ${Number(price).toLocaleString()}`}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={onDeleteClick} color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Stack>
                    <Stack
                        alignItems={"center"}
                        mt={{ desktop: 2 }}
                        spacing={2}
                        direction={"row"}
                    >
                        <Typography>Size: {value}</Typography>
                        <Typography> Jumlah: </Typography>
                        <TextField
                            onChange={onQtyChange}
                            size="small"
                            id="jumlah-barang"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{ 
                                style: { fontSize: 15 },
                                inputProps: { 
                                    max:max, min: 1 
                                } }}
                            sx={{
                                "& legend": { display: "none" },
                                "& fieldset": { top: 0 },
                                width: 75,
                            }}
                            variant="outlined"
                            value={qty}
                        />
                    </Stack>

                </Grid>
                <Grid item laptop={1} justifyItems={"center"} justifyContent={"center"}>
                        <Box justifyContent={"start"} justifyItems={"center"}>
                            <Checkbox onChange={onCheckedChange} />
                        </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
