import React from 'react'
import { Grid, Typography } from "@mui/material";
import ArticleItem from "../components/ArticleItem";
import {Link} from 'react-router-dom'


export default function ArticleCollection() {
    return(
        <Grid item>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item mobile={6}>
                    <Typography
                        display={{ mobile: "block", laptop: "none" }}
                        fontWeight={"light"}
                        fontSize={18}
                        py={2}
                    >
                        Article
                    </Typography>
                </Grid>

                <Grid item mobile={6}>
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
                </Grid>
                <Grid item mobile={12}>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            display: { mobile: "flex", laptop: "none" },
                        }}
                    >
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
            </Grid>
        </Grid>
    )
}