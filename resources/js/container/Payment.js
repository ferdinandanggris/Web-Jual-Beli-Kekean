import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Stack,
} from "@mui/material";
import {
    PDFDownloadLink,
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    Image,
    PDFViewer,
} from "@react-pdf/renderer";
import {
    Table,
    TableBody,
    TableHeader,
    TableCell,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";
import { style, styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentItem from "../components/PaymentItem";
import axios from "axios";

export default function Payment() {
    const [cart, setCart] = React.useState([]);
    const [user, setUser] = React.useState({});
    const [rekening, setRekening] = React.useState([]);
    const [ewallet, setEwallet] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let isMounted = true;

    const fetchCart = async () => {
        setLoading(true);
        try {
            axios.get(`api/cart`).then((res) => {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setUser(res.data.user);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    };
    const fetchPayments = async () => {
        setLoading(true);
        try {
            axios.get(`api/payments`).then((res) => {
                if (res.data.status === 200) {
                    setRekening(res.data.payments.filter((d) => (d.jenis == '1')))
                    setEwallet(res.data.payments.filter((d) => (d.jenis == '2')))
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    React.useEffect(() => {
        fetchCart();
        fetchPayments();
        isMounted = false;
    }, []);

    const checkboxColor = {
        color: "#FF674D",
        "&.Mui-checked": {
            color: "#FF674D",
        },
    };

    const AccordionStyle = {
        boxShadow: "none",
        backgroundColor: "#00000000",
        "&:before": {
            display: "none",
        },
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            justifyContent: "center",
        },
        section: {
            margin: "50px",
        },
        logoStyle: {
            width: "100px",
            height: "50px",
            objectFit: "cover",
            bottom: "25px",
        },
    });

    var totalPrice;
    if (!loading) {
        totalPrice = cart.reduce((acc, tot) => {
            return acc + tot.product.price * tot.qty;
        }, 0);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    today ="Surabaya, " + dd + " " + monthNames[mm] + " " + yyyy;

    const Invoice = () => (
        <Document>
            <Page size="A4">
                <View
                    style={{
                        alignContents: "center",
                        marginHorizontal: "50px",
                        marginTop: "50px",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Invoice</Text>
                    <Image
                        style={styles.logoStyle}
                        src={"../images/logoKekean.jpg"}
                    />
                </View>
                <View style={styles.section}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Text style={{ fontSize: 12, marginBottom: "5px" }}>
                                Nama Pembeli:{" "}
                                {user.first_name + " " + user.last_name}
                            </Text>
                            <Text style={{ fontSize: 12, marginBottom: "5px" }}>
                                Alamat: {user.address}
                            </Text>
                            <Text style={{ fontSize: 12, marginBottom: "5px" }}>
                                Nomor Telepon: {user.number_phone}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    marginBottom: "5px",
                                    marginBottom: "50px",
                                }}
                            >
                                Email: {user.email}
                            </Text>
                        </View>

                        <View
                            style={{
                                marginBottom: "70px",
                                marginLeft: 200,
                                marginRight: 90,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "left",
                                    fontSize: 12,
                                    marginBottom: "5px",
                                }}
                            >
                                Invoice date:
                            </Text>
                            <Text
                                style={{
                                    textAlign: "left",
                                    fontSize: 12,
                                    marginBottom: "5px",
                                }}
                            >
                                Name: Kekean
                            </Text>
                            <Text
                                style={{
                                    textAlign: "left",
                                    fontSize: 12,
                                    marginBottom: "5px",
                                }}
                            >
                                Address: Kekean Wastra Gallery
                            </Text>
                            <Text
                                style={{
                                    textAlign: "left",
                                    fontSize: 12,
                                    marginBottom: "5px",
                                }}
                            >
                                Phone: 0274-2885822
                            </Text>
                            <Text
                                style={{
                                    textAlign: "left",
                                    fontSize: 12,
                                    marginBottom: "5px",
                                }}
                            >
                                Email: cs@niagahoster.co.id
                            </Text>
                        </View>
                    </View>

                    <Table data={cart}>
                        <TableHeader>
                            <TableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                            >
                                Nama barang
                            </TableCell>
                            <TableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                            >
                                Jumlah
                            </TableCell>
                            <TableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                            >
                                Ukuran
                            </TableCell>
                            <TableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                            >
                                Harga
                            </TableCell>
                        </TableHeader>
                        <TableBody>
                            <DataTableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                                getContent={(r) => r.product.product_name}
                            />
                            <DataTableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                                getContent={(r) => r.size}
                            />
                            <DataTableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                                getContent={(r) => r.qty}
                            />
                            <DataTableCell
                                style={{ fontSize: 12, marginLeft: "5px" }}
                                getContent={(r) =>
                                    (
                                        Number(r.product.price) * Number(r.qty)
                                    ).toLocaleString()
                                }
                            />
                        </TableBody>
                    </Table>
                    <Text style={{ textAlign: 'right', fontSize: 12, marginTop: "10px" }}>
                        Total : {"Rp. " + Number(totalPrice).toLocaleString()}
                    </Text>
                </View>
                <View style={{ marginTop: "250px", marginHorizontal: "50px" }}>
                    <Text style={{ fontSize: "12px" }}>{today}</Text>
                    <Image
                        style={{
                            marginTop: "20px",
                            width: "100px",
                            height: "50px",
                            objectFit: "cover",
                        }}
                        src={"../images/logoKekean.jpg"}
                    />
                    <Text style={{ marginTop: "20px", fontSize: "12px" }}>
                        Kekean Wastra Gallery
                    </Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <Container sx={{ px: 50 }}>
            <Accordion
                sx={{
                    AccordionStyle,
                    border: "1px solid #BABABA",
                    borderBottom: "none",
                }}
                disableGutters={true}
                defaultExpanded={true}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        fontSize={{ laptop: 15, desktop: 17 }}
                        fontWeight={"regular"}
                    >
                        Rekening Bank
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container alignItems="center" spacing={5}>
                        {rekening.map((item, key) => <PaymentItem key={key} img={item.nama_bank} rekening={item.nomor_rekening}/>)}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    AccordionStyle,
                    border: "1px solid #BABABA",
                    borderBottom: "none",
                    borderTop: "none",
                }}
                disableGutters={true}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        fontSize={{ laptop: 15, desktop: 17 }}
                        fontWeight={"regular"}
                    >
                        E-Wallet
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container alignItems="center" spacing={5}>
                    {ewallet.map((item, key) => <PaymentItem key={key} img={item.nama_bank} rekening={item.nomor_rekening}/>)}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    AccordionStyle,
                    border: "1px solid #BABABA",
                    borderTop: "none",
                }}
                disableGutters={true}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        fontSize={{ laptop: 15, desktop: 17 }}
                        fontWeight={"regular"}
                    >
                        Qris
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        justifyContent={"center"}
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item mobile={6}>
                            <Box
                                sx={{ width: "250px" }}
                                component="img"
                                src="../images/qris.jpeg"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Stack direction={"row"} spacing={2}>
                <Box>
                    <PDFDownloadLink
                        document={<Invoice />}
                        fileName="Invoice Pembelian.pdf"
                        style={{ textDecoration: "none", width: 0, height: 0 }}
                    >
                        <Button
                            disabled={loading}
                            variant="contained"
                            sx={{
                                mt: 2,
                                borderRadius: 1,
                                backgroundColor: "#009E93",
                                ":hover": {
                                    backgroundColor: "#00637A",
                                },
                            }}
                        >
                            <Typography mr={1} color="white">
                                Download Invoice
                            </Typography>
                            <ReceiptIcon
                                sx={{ color: "#FFFFFF", fontSize: 25 }}
                            />
                        </Button>
                    </PDFDownloadLink>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            borderRadius: 1,
                            backgroundColor: "#25D366",
                            ":hover": {
                                backgroundColor: "#1AA04C",
                            },
                        }}
                    >
                        <Typography mr={1} color="white">
                            Konfirmasi Pembayaran
                        </Typography>
                        <WhatsAppIcon sx={{ color: "#FFFFFF", fontSize: 25 }} />
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
}
