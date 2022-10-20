import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Main from './container/Main'
import CatalogPage from './container/CatalogPage';
import Navbar from './components/Navbar'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ProductPage from './container/ProductPage';
import Payment from './container/Payment';
import LoginPage from './container/LoginPage';
import RegisterPage from './container/RegisterPage';
import axios from 'axios';
import Admin from './container/Admin';
import AddProduct from './container/AddProduct';
import AdminPayment from './container/AdminPayment';
import EditProduct from './container/EditProduct';
import NavAdmin from './components/NavAdmin';
import AdminPrivateRoute from './AdminPrivateRoute';
import Cart from './container/Cart';
import AddPayment from './container/AddPayment';
import ArticlePage from './container/ArticlePage';
import ArticleDetailPage from './container/ArticleDetailPage';
import AboutUs from './container/AboutUs';
function Navs() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#CC6143"
            },
            secondary: {
                main: "#7776BC"
            },
            subtitle : "rgb(0, 0, 0, 31%)"
        },
        typography: {
            "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500,
            button: {
                textTransform: 'none'
            }
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
    
    })    
    axios.defaults.baseURL = "https://kekean.pusproset.site/";
    // axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.headers.post['Accept'] = "application/json";
    axios.defaults.headers.post['Content-Type'] = "application/json";

    axios.defaults.withCredentials = true; 
    axios.interceptors.request.use(function(config) {
            const token = localStorage.getItem('auth_token');
            config.headers.Authorization = token ? `Bearer ${token}`:'';
            return config;
        }
    )
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline/>
            <Router basename={'/'}>
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Main/>}/>
                    <Route path="/catalog" element={<CatalogPage/>}/>
                    <Route path='/products/:productId' element={<ProductPage/>}/>
                    <Route path='/products/' element={<CatalogPage/>}/>
                    <Route path='/payment' element={<Payment/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/artikel' element={<ArticlePage/>}/>
                    <Route path='/artikel/:id' element={<ArticleDetailPage/>}/>
                    <Route path='/about' element={<AboutUs/>}/>
                    {/* Admin Routes */}
                    <Route path='/admin' name='Admin' element={<AdminPrivateRoute comp={Admin}/>}/>
                    <Route path='/admin/addProduct' name='Admin' element={<AdminPrivateRoute comp={AddProduct}/>}/>
                    <Route path='/admin/editProduct/:id' name='Admin' element={<AdminPrivateRoute comp={EditProduct}/>}/>
                    <Route path='/admin/payment' name='Admin' element={<AdminPrivateRoute comp={AdminPayment}/>}/>
                    <Route path='/admin/addPayment' name='Admin' element={<AdminPrivateRoute comp={AddPayment}/>}/>
                </Routes>
            </Router>
    </ThemeProvider>
    );
}

export default Navs;

if (document.getElementById('app')) {
    ReactDOM.render(<Navs/>, document.getElementById('app'));
}
