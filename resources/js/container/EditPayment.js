import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router";

function EditPayment() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "nama_rekening", headerName: "Nama Bank", width: 430 },
        { field: "nomor_rekening", headerName: "Nomor Rekening", width: 432 },
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
                    history(`/admin/editProduct/${thisRow.id}`);
                };
                const handleDelete = async (e) => {
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
                    const res = await axios.delete(
                        `/api/delete-products/${thisRow.id}`
                    );
                    if (res.data.status === 200) {
                        swal("Success", res.data.message);
                        location.reload();
                    }
                };

                return (
                    <>
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </>
                );
            },
        },
    ];
    return ( 
        <Container sx={{ px: 10, my: 5 }}>
            <Paper elevation={3}>
                <Container sx={{ px: 6, pt: 6, pb: 4 }}>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography fontWeight={"medium"}>
                            Rekening Bank
                        </Typography>

                        <Stack direction={"row"}>
                            <Link
                                to={"/admin/addProduct"}
                                style={{ textDecoration: "none" }}
                            >
                                <Button>
                                    <Typography fontWeight={"medium"}>
                                        Tambahkan Rekening
                                    </Typography>
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                    <Box sx={{ height: 400, width: "100%" }}>
                        {loading ? (
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
                            />
                        )}
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        mt={3}
                    >
                        <Typography fontWeight={"medium"}>
                            Nomor E - Wallet
                        </Typography>

                        <Stack direction={"row"}>
                            <Link
                                to={"/admin/addProduct"}
                                style={{ textDecoration: "none" }}
                            >
                                <Button>
                                    <Typography fontWeight={"medium"}>
                                        Tambahkan E - Wallet
                                    </Typography>
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                    <Box sx={{ height: 400, width: "100%" }}>
                        {loading ? (
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
                            />
                        )}
                    </Box>
                </Container>
            </Paper>
        </Container>
     );
}

export default EditPayment;