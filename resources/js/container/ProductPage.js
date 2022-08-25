import {
    Container,
    Grid,
    Box,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    Button
} from "@mui/material";
import React from "react";
import ButtonBeli from "../components/ButtonBeli";
import { useParams } from "react-router";

export default function ProductPage(props) {
    const [size, setSize] = React.useState("");
    const {productId} = useParams()
    const id = productId - 1
    const catalog = JSON.parse(JSON.stringify(require('../catalog.json')))
    console.log(catalog)

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Container sx={{ px: 10 }}>
            <Grid
                spacing={15}
                container
                display={{ mobile: "none", laptop: "flex" }}
            >
                <Grid item laptop={6}>
                    <Box>
                        <Box
                            sx={{ width: "100%" }}
                            component="img"
                            src={`../images/catalog-1.png`}
                        />
                        <Box my={5}>
                            <Typography fontSize={36} fontWeight={"medium"}>
                                Deskripsi
                            </Typography>
                            <Typography>
                                {catalog[id].deskripsi}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item laptop={6}>
                    <Box sx={{ border: "1px solid #D9D9D9", borderRadius: 1 }} p={2}>
                        <Box>
                            <Typography fontSize={30} fontWeight="medium">
                                {catalog[id].nama}
                            </Typography>
                            <Typography fontSize={20}>Rp {catalog[id].harga}</Typography>
                        </Box>
                        <Box pt={3}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="demo-simple-select-label">
                                    Pilih Ukuran
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="ukuran"
                                    value={size}
                                    label="Pilih Ukuran"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                onChange={(event) =>
                                    event.target.value < 0
                                        ? (event.target.value = 0)
                                        : event.target.value
                                }
                                id="jumlah-barang"
                                label="Quantity"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                sx={{ mt: 3 }}
                            />
                            <ButtonBeli/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
