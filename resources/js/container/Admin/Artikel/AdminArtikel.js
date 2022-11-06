import { Box, Button, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router";
import AdminHeader from "../../../components/AdminHeader";
import striptags from "striptags";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";

export default function AdminArtikel() {
    const history = useNavigate();
    const queryClient = useQueryClient();
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Judul Artikel", width: 200 },
        { field: "isi", headerName: "Isi artikel", width: 300 },
        {
            field: "featured",
            headerName: "featured?",
            type: "number",
            width: 130,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 160,
            renderCell: (params) => {
                const handleEdit = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) =>
                                (thisRow[c.field] = params.getValue(
                                    params.id,
                                    c.field
                                ))
                        );
                    history(`/admin/editArtikel/${thisRow.id}`);
                };
                const handleDelete = async (e) => {
                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) =>
                                (thisRow[c.field] = params.getValue(
                                    params.id,
                                    c.field
                                ))
                        );
                    return await axios.delete(`/api/article/${thisRow.id}`);
                };

                const deleteMutationArticle = useMutation(handleDelete, {
                    onSuccess: () => {
                        queryClient.invalidateQueries("article");
                    },
                });

                return (
                    <>
                        <Button onClick={handleEdit}>Edit</Button>
                        <LoadingButton
                            loading={
                                deleteMutationArticle.isLoading ? true : false
                            }
                            onClick={() => deleteMutationArticle.mutate()}
                        >
                            Delete
                        </LoadingButton>
                    </>
                );
            },
        },
    ];

    const fetchData = async () => {
        const res = await axios.get("/api/article");
        res.data.data.map((d) => {
            d.isi = striptags(d.isi);
        });
        return res.data.data;
    };

    const {
        isLoading,
        isError,
        error,
        data: rows,
    } = useQuery({
        queryKey: ["articles"],
        queryFn: fetchData,
    });

    return (
        <Container sx={{ px: 10, my: 5 }}>
            <Paper elevation={3}>
                <Container sx={{ px: 6, pt: 6, pb: 4 }}>
                    <AdminHeader
                        daftar="Artikel"
                        tambahkan="Artikel"
                        adminPage="addArtikel"
                    />
                    <Box sx={{ height: 800, width: "100%" }}>
                        {isLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={"100%"}
                                animation={"wave"}
                                sx={{ borderRadius: 1 }}
                            />
                        ) : (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={15}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        )}
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
}
