import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import ArticleItem from "../components/ArticleItem";

function ArticlePage() {
    const [articles, setArticles] = React.useState({});
    React.useEffect(() => {
        axios.get("/api/article/").then((res) => {
            setArticles(res);
        });
    }, []);
    return (
        <Grid container sx={{ px: 17.5, mt: 10 }}>
            <Grid item laptop={12}>
                <Grid container spacing={5} alignItems={"center"}>
                    <Grid item laptop={4}>
                        <Box
                            sx={{ borderRadius: 1, width: "100%" }}
                            component="img"
                            src="../images/templateArtikel.png"
                        />
                    </Grid>
                    <Grid item laptop={8}>
                        <Typography
                            fontSize={12}
                            color={"primary"}
                            width={"fit-content"}
                            sx={{
                                border: 1,
                                borderColor: "primary.main",
                                borderRadius: 5,
                                px: 4,
                                py: 0.5,
                                mb: 2,
                            }}
                        >
                            20 July 2022
                        </Typography>
                        <Box>
                            <Typography
                                width={400}
                                mb={2}
                                variant="h3"
                                fontWeight={"medium"}
                            >
                                Batik Terbaru di Katalog Kami
                            </Typography>
                            <Typography width={600}>
                                akdsapdkjfnvhdrlsg sjrsrghkwghoughe
                                iluughuigybqe uilfqhf
                                riyfggsarlifhsayferiysarufhqhrifhsrfi
                                sayilfgaryif erro8gtdsfovifdvy ovyd9uv heupgyevu
                                dhyevhd vdtyvosbtsrv78 avfyivte yuv
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 5 }}>
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
                <ArticleItem
                    item={1}
                    tanggal="20 Juli 2020"
                    nama="Ngga tau"
                    deskripsi="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec porttitor lacus."
                />
            </Grid>
        </Grid>
    );
}

export default ArticlePage;
