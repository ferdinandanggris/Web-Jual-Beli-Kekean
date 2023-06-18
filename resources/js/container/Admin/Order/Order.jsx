import { Box, Button, Container, Paper } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import AdminHeader from "../../../components/AdminHeader";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditOrder from "./EditOrder";

export default function Order(){

  const [order,setOrder] = React.useState({});
  const [orderId,setOrderId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  
  const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "nama", headerName: "Nama Pembeli", width: 200 },
        { field: "total_harga_produk", headerName: "Total Harga Barang", width: 150 },
        { field: "biaya_pengiriman", headerName: "Biaya Pengiriman", width: 150 },
        { field: "status_approval", headerName: "Approval Admin", width: 200 },
        { field: "status_pemesanan", headerName: "Status Pemesanan", width: 200 },
        { field : "Show", renderCell : (params) => {
          return (
            <Button
              onClick={() => {showDetail(params.row.id)}}
            >
              <RemoveRedEyeIcon/>
            </Button>
          )
        }, width : 100}
  ];

  const fetchData = async () => {
    const res = await axios.get("/api/order");
    return res.data.order;
};

 const showDetail = async (id) => {
  setOrderId(id);
   setOpen(true);
    // axios.get('/sanctum/csrf-cookie').then(response => {
    //   await axios.get(`/api/order/${id}`).then(res => {
    //     if(res.data.status === 200){
    //       setOrder(res.data.order);
    //     }
    //   })
    // })

  }

  const sendData = (data)=>{
    setOpen(data);
  }

const {
  isLoading,
  isError,
  error,
  data: rows,
} = useQuery({
  queryKey: ["order"],
  queryFn: fetchData,
});

  return (
    <>
      <Container sx={{ px: 10, my: 5 }} hidden={open}>
        <Paper elevation={3}>
            <Container sx={{ px: 6, pt: 6, pb: 4 }}>
                <AdminHeader
                    daftar="Order"
                />
                <Box sx={{ height: 800, width: "100%" }}>
                    {isLoading  ? (
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

      <Container sx={{ px: 10, my: 5 }} hidden={!open}>
        {open ? (
                    <EditOrder sendData={sendData} orderId={orderId} />
                ) : ''}
      </Container>
    </>
  )
}