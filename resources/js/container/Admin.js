import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "product_name", headerName: "Nama Barang", width: 130 },
        { field: "description", headerName: "Deskripsi Barang", width: 130 },
        {
            field: "price",
            headerName: "Harga barang",
            type: "number",
            width: 90,
        },
        {
            field: "has_3d",
            headerName: "Apakah ada 3D?",
            description: "This column has a value getter and is not sortable.",
            type: 'boolean',
            width: 160,
            valueGetter: (params) =>
                `${params.getValue(params.id, "firstName") || ""} ${
                    params.getValue(params.id, "lastName") || ""
                }`,
        },
        { field: "image_detail1", headerName: "Gambar 1", width: 130 },
        { field: "image_detail2", headerName: "Gambar 2", width: 130 },
        { field: "image_detail3", headerName: "Gambar 3", width: 130 },
        { field: "3d_model", headerName: "Model 3D", width: 130 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 160,
            renderCell: (params) => {
                const onClick = (e) => {
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

                    return alert(JSON.stringify(thisRow, null, 4));
                };

                return (
                    <>
                    <Button onClick={onClick}>Click</Button>
                    <Button onClick={onClick}>Click</Button>
                    </>
                );
            },
        },
    ];
 
    const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    ];
    return (
        <Container sx={{ px: 10 }}>
            <Paper elevation={3}>
                <Container sx={{ px: 6, pt: 6, pb: 4 }}>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography fontWeight={"medium"}>
                            Daftar barang
                        </Typography>

                        <Link to={'/admin/addProduct'} style={{textDecoration: 'none'}}>
                            <Button>
                                    <Typography fontWeight={"medium"}>
                                        Tambahkan Barang
                                    </Typography>
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
}
