import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Main from "./container/Main";
import CatalogPage from "./container/CatalogPage";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductPage from "./container/ProductPage";
import Payment from "./container/Payment";
import LoginPage from "./container/LoginPage";
import RegisterPage from "./container/RegisterPage";
import axios from "axios";
import Admin from "./container/Admin/Admin";
import AddProduct from "./container/Admin/Product/AddProduct";
import AdminPayment from "./container/Admin/Payment/AdminPayment";
import EditProduct from "./container/Admin/Product/EditProduct";
import NavAdmin from "./components/NavAdmin";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Cart from "./container/Cart";
import AddPayment from "./container/Admin/Payment/AddPayment";
import ArticlePage from "./container/Artikel/ArticlePage";
import ArticleDetailPage from "./container/Artikel/ArticleDetailPage";
import AboutUs from "./container/AboutUs";
import Footer from "./container/Footer";
import EditPayment from "./container/Admin/Payment/EditPayment";
import AdminArtikel from "./container/Admin/Artikel/AdminArtikel";
import AddArtikel from "./container/Admin/Artikel/AddArtikel";
import EditArtikel from "./container/Admin/Artikel/EditArtikel";
import ScrollToTop from "./ScrollToTop";
import CaraPengembalian from "./container/Bantuan/CaraPengembalian";
import Bantuan from "./container/Bantuan/Bantuan";
import KonfirmasiTransfer from "./container/Bantuan/KonfirmasiTransfer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

function Navs() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#CC6143",
            },
            secondary: {
                main: "#7776BC",
            },
            subtitle: "rgb(0, 0, 0, 31%)",
        },
        typography: {
            fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            button: {
                textTransform: "none",
            },
        },
        shape: {
            borderRadius: 12,
        },
        breakpoints: {
            values: {
                mobile: 0,
                tablet: 640,
                laptop: 1024,
                desktop: 1200,
            },
        },
    });
    axios.defaults.baseURL = "https://kekean.id/";
    // axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.headers.post["Accept"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios.defaults.withCredentials = true;
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("auth_token");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    const queryClient = new QueryClient()
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router basename={"/"}>
                        <Navbar />
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" exact element={<Main />} />
                            <Route path="/catalog" element={<CatalogPage />} />
                            <Route
                                path="/products/:productId"
                                element={<ProductPage />}
                            />
                            <Route
                                path="/products/"
                                element={<CatalogPage />}
                            />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/artikel" element={<ArticlePage />} />
                            <Route
                                path="/artikel/:id"
                                element={<ArticleDetailPage />}
                            />
                            <Route path="/about" element={<AboutUs />} />
                            <Route
                                path="/cara-pengembalian"
                                element={<CaraPengembalian />}
                            />
                            <Route path="/bantuan" element={<Bantuan />} />
                            <Route
                                path="/konfirmasi-transfer"
                                element={<KonfirmasiTransfer />}
                            />
                            {/* Admin Routes */}
                            <Route
                                path="/admin"
                                name="Admin"
                                element={<AdminPrivateRoute comp={Admin} />}
                            />
                            <Route
                                path="/admin/addProduct"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={AddProduct} />
                                }
                            />
                            <Route
                                path="/admin/editProduct/:id"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={EditProduct} />
                                }
                            />
                            <Route
                                path="/admin/payment"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={AdminPayment} />
                                }
                            />
                            <Route
                                path="/admin/addPayment"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={AddPayment} />
                                }
                            />
                            <Route
                                path="/admin/editPayment/:id"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={EditPayment} />
                                }
                            />
                            <Route
                                path="/admin/artikel"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={AdminArtikel} />
                                }
                            />
                            <Route
                                path="/admin/addArtikel"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={AddArtikel} />
                                }
                            />
                            <Route
                                path="/admin/editArtikel/:id"
                                name="Admin"
                                element={
                                    <AdminPrivateRoute comp={EditArtikel} />
                                }
                            />
                        </Routes>
                        <Footer />
                    </Router>
                </ThemeProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
}

export default Navs;

if (document.getElementById("app")) {
    ReactDOM.render(<Navs />, document.getElementById("app"));
}
