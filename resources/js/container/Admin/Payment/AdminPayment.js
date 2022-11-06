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
import AdminHeader from "../../../components/AdminHeader";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";

function AdminPayment() {
    const history = useNavigate();
    const queryClient = useQueryClient();
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "nama_bank", headerName: "Nama Bank", width: 430 },
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
                    history(`/admin/editPayment/${thisRow.id}`);
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
                    return await axios.delete(
                        `/api/delete-payment/${thisRow.id}`
                    );
                };

                const deleteMutationPayment = useMutation(handleDelete, {
                    onSuccess: () => {
                        queryClient.invalidateQueries("article");
                    },
                });

                return (
                    <>
                        <Button onClick={handleEdit}>Edit</Button>
                        <LoadingButton
                            loading={
                                deleteMutationPayment.isLoading ? true : false
                            }
                            onClick={() => deleteMutationPayment.mutate()}
                        >
                            Delete
                        </LoadingButton>
                    </>
                );
            },
        },
    ];

    const fetchRekening = async () => {
        const res = await axios.get("/api/payments");
        return res.data.payments.filter((d) => d.jenis == "1");
    };
    const fetchEwallet = async () => {
        const res = await axios.get("/api/payments");
        return res.data.payments.filter((d) => d.jenis == "2");
    };

    const rekening = useQuery({
        queryKey: ["rekening"],
        queryFn: fetchRekening,
    });

    const ewalet = useQuery({
        queryKey: ["ewalet"],
        queryFn: fetchEwallet,
    });

    return (
        <Container sx={{ px: 10, my: 5 }}>
            <Paper elevation={3}>
                <Container sx={{ px: 6, pt: 6, pb: 4 }}>
                    <AdminHeader
                        daftar="Nomor Rekening"
                        tambahkan="Rekening"
                        adminPage="addPayment"
                    />
                    <Box sx={{ height: 400, width: "100%" }}>
                        {rekening.isLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={"100%"}
                                animation={"wave"}
                                sx={{ borderRadius: 1 }}
                            />
                        ) : (
                            <DataGrid
                                rows={rekening.data}
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
                                to={"/admin/addPayment"}
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
                        {ewalet.isLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width={"100%"}
                                height={"100%"}
                                animation={"wave"}
                                sx={{ borderRadius: 1 }}
                            />
                        ) : (
                            <DataGrid
                                rows={ewalet.data}
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

export default AdminPayment;
