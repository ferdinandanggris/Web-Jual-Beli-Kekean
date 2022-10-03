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
} from "@mui/material";
import React from "react";
import ButtonBeli from "../components/ButtonBeli";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function ProductPage(props) {
    const [size, setSize] = React.useState("");
    const [sizes, setSizes] = React.useState({
        S: '',
        M: '',
        ML: '',
        L: '',
        XL: '',
        XXL: '',

    });
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let isMounted = true;
    const { productId } = useParams();
    // const catalog = JSON.parse(JSON.stringify(require("../catalog.json")));
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                axios.get(`api/products/${productId}`).then((res) => {
                    if (res.data.status === 200) {
                        setProduct(res.data.products);
                        setSizes(res.data.size);
                        console.log(res.data.size)
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
        isMounted = false;
    }, []);

    if (loading) {
        return <Typography>Loading....</Typography>;
    } else {
        var currentProduct = "";
        currentProduct = product.filter((item) => item.id == productId);
        console.log(currentProduct);
    }

    const handleChange = (event) => {
        setSize(event.target.value);
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
                        {/* <Box
                            sx={{ width: "100%" }}
                            component="img"
                            src={`../images/catalog-1.png`}
                        /> */}
                        {!!Number(currentProduct[0].has_3d) ? (
                            <div className="sketchfab-embed-wrapper">
                                <iframe
                                    title="Horse free download"
                                    frameBorder="0"
                                    allowFullScreen
                                    mozAllowFullscreen="true"
                                    webkitAllowFullscreen="true"
                                    allow="autoplay; fullscreen; xr-spatial-tracking"
                                    xrSpecialTracking
                                    executionWhileOutOfViewPort
                                    executionWhileNotRendered
                                    webShare
                                    width={"512px"}
                                    height={"400px"}
                                    src={currentProduct[0].model_3d}
                                >
                                </iframe>
                            </div>
                        ) : (
                            <Box
                                sx={{
                                    width: "538px",
                                    height: "400px",
                                    objectFit: "cover",
                                }}
                                component="img"
                                src={`../catalog/${currentProduct[0].image_detail1}`} 
                            />
                        )}
                        <Box my={5}>
                            <Typography fontSize={36} fontWeight={"medium"}>
                                Deskripsi
                            </Typography>
                            <Typography>
                                {currentProduct[0].description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item laptop={6}>
                    <Box
                        sx={{ border: "1px solid #D9D9D9", borderRadius: 1 }}
                        p={2}
                    >
                        <Box>
                            <Typography fontSize={30} fontWeight="medium">
                                {currentProduct[0].product_name}
                            </Typography>
                            <Typography fontSize={20}>
                                Rp {currentProduct[0].price}
                            </Typography>
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
                                    {!!Number(sizes.S)?<MenuItem value='S'>S</MenuItem>:''}
                                    {!!Number(sizes.M)?<MenuItem value='M'>M</MenuItem>:''}
                                    {!!Number(sizes.ML)?<MenuItem value='ML'>ML</MenuItem>:''}
                                    {!!Number(sizes.L)?<MenuItem value='L'>L</MenuItem>:''}
                                    {!!Number(sizes.XL)?<MenuItem value='XL'>XL</MenuItem>:''}
                                    {!!Number(sizes.XXL)?<MenuItem value='XXL'>XXL</MenuItem>:''}
                                    
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
                            <ButtonBeli />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
