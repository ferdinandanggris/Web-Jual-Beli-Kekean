import {
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router";
import AdminHeader from "../components/AdminHeader";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";

export default function Admin() {
    const history = useNavigate();
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "product_name", headerName: "Nama Barang", width: 130 },
        { field: "description", headerName: "Deskripsi Barang", width: 150 },
        {
            field: "price",
            headerName: "Harga barang",
            type: "number",
            width: 130,
        },
        {
            field: "has_3d",
            headerName: "Apakah ada 3D?",
            description: "This column has a value getter and is not sortable.",
            type: "boolean",
            width: 150,
        },
        { field: "image_detail1", headerName: "Gambar", width: 130 },
        { field: "model_3d", headerName: "Model 3D", width: 130 },
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

    const toggleDrawer = () => {
        setOpen(!open);
    };

    let products = [];

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: res } = await axios.get("/api/products");
                products = res.products;
                products.has_3d = res.products.map(
                    (u) => (u.has_3d = !!Number(u.has_3d))
                );
                setRows(products);
                console.log(products);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Container sx={{ px: 10, my: 5 }}>
            <Paper elevation={3}>
                <Container sx={{ px: 6, pt: 6, pb: 4 }}>
                    <AdminHeader
                        daftar="Barang"
                        tambahkan="Barang"
                        adminPage="addProduct"
                    />
                    <Box sx={{ height: 800, width: "100%" }}>
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
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        )}
                    </Box>
                </Container>
            </Paper>
        </Container>
    );
}
