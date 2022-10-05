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
} from "@mui/material";

export default function CartItem({name, price, XS, S, M, L, XL, XXL, qty, onSizeChange, onQtyChange, value}) {

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <Box pt={2}>
            <Grid container spacing={3}>
                <Grid item laptop={3}>
                    <Box
                        sx={{
                            width: 110,
                            height: 150,
                            objectFit: "cover",
                            borderRadius: 0.5,
                            ml: 2,
                        }}
                        component="img"
                        src={`../images/catalog-1.png`}
                    />
                </Grid>
                <Grid item laptop={9}>
                    <Typography fontSize={20}>{name}</Typography>
                    <Typography color={'#7D7D7D'}>
                        {`Rp. ${price}`}
                    </Typography>
                    <Grid pt={3} container spacing={2}>
                        <Grid item laptop={6}>
                            <FormControl
                                sx={{
                                    width: 200,
                                    "& .MuiSelect-outlined": {
                                        fontSize: 15,
                                    },
                                }}
                                size="small"
                            >
                                <InputLabel
                                    sx={{ fontSize: 15 }}
                                    id="demo-simple-select-label"
                                ></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="ukuran"
                                    value={value}
                                    label="Pilih Ukuran"
                                    onChange={onSizeChange}
                                    sx={{
                                        "& legend": { display: "none" },
                                        "& fieldset": { top: 0 },
                                    }}
                                    disabled
                                >
                                    <MenuItem
                                        // disabled={!Number(XS)}
                                        value={"XS"}
                                    >
                                        Xtra Small (XS)
                                    </MenuItem>
                                    <MenuItem
                                        // disabled={!Number(S)}
                                        value={"S"}
                                    >
                                        Small
                                    </MenuItem>
                                    <MenuItem
                                        // disabled={!Number(M)}
                                        value={"M"}
                                    >
                                        Medium
                                    </MenuItem>
                                    <MenuItem
                                        // disabled={!Number(L)}
                                        value={"L"}
                                    >
                                        Large
                                    </MenuItem>
                                    <MenuItem
                                        // disabled={!Number(XL)}
                                        value={"XL"}
                                    >
                                        Xtra Large (XL)
                                    </MenuItem>
                                    <MenuItem
                                        // disabled={!Number(XXL)}
                                        value={"XXL"}
                                    >
                                        Xtra Xtra Large (XXL)
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item laptop={6}>
                            <TextField
                                onChange={onQtyChange}
                                size="small"
                                id="jumlah-barang"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ style: { fontSize: 15 } }}
                                sx={{
                                    "& legend": { display: "none" },
                                    "& fieldset": { top: 0 },
                                    width: 75,
                                }}
                                variant="outlined"
                                value={qty}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
