import React from 'react'
import { Grid, Typography } from "@mui/material";
import CatalogItem from "../components/CatalogItem";
import {Link} from 'react-router-dom'


export default function CatalogCollection() {
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let isMounted = true;


    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(`api/products`).then((res) => {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            });
        };
        fetchData();
        isMounted = false;
    }, []);

    const products = product.slice(0, 3).map((item) =>
        <CatalogItem key={item.id}
            id={item.id}
            description={item.description}
            nama={item.product_name}
            image={item.imageUrl[0].path}
            harga={item.price}
            have3d={item.has_3d}
            model={item.model_3d} />
    )
    return (
        <Grid item>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item mobile={6}>
                    <Typography
                        display={{ mobile: "block", laptop: "none" }}
                        fontWeight={"light"}
                        fontSize={18}
                        py={2}
                    >
                        Our Collection
                    </Typography>
                </Grid>

                <Grid item mobile={6}>
                    <Link style={{ textDecoration: 'none' }} to={'/catalog'}>
                        <Typography
                            display={{ mobile: "block", laptop: "none" }}
                            fontWeight={"regular"}
                            fontSize={12}
                            py={2}
                            textAlign={"right"}
                            color={"#989898"}
                        >
                            Lihat Selengkapnya
                        </Typography>
                    </Link>
                </Grid>
                <Grid item mobile={12}>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            display: { mobile: "flex", laptop: "none" },
                        }}
                    >
                        {products}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}