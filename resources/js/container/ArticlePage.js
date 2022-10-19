import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import ArticleItem from "../components/ArticleItem";
import Carousel from "react-material-ui-carousel/dist/components/Carousel";
import LinesEllipsis from "react-lines-ellipsis";
import ArticleCarousel from "../components/ArticleCarousel";

function ArticlePage() {
    const [articles, setArticles] = React.useState([]);
    const [featured, setFeatured] = React.useState([])
    React.useEffect(() => {
        axios.get("/api/article").then((res) => {
            setArticles(res.data.data);
            setFeatured(res.data.data.filter((d) => (Number(d.featured) == 1)))
        });
    }, []);
    return (
        <Grid container sx={{ px: 17.5, mt: 10 }}>
            <Grid item laptop={12}>
                <Carousel height={235}>
                {featured.map((item, id) => (
                    <ArticleCarousel img={item.id} date={moment(item.date,"YYYY-MM-DD HH:mm:ss").format("DD MMMM YYYY")} title={item.title} body={item.isi} />
                ))}
                </Carousel>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 5 }}>
                {articles.map((item, id) => (
                    <ArticleItem
                    key={id}
                        id={item.id}
                        image={item.id}
                        tanggal={moment(
                            item.date,
                            "YYYY-MM-DD HH:mm:ss"
                        ).format("DD MMMM YYYY")}
                        nama={item.title}
                        deskripsi={item.isi}
                    />
                ))}
            </Grid>
        </Grid>
    );
}

export default ArticlePage;
