import React from 'react'
import Container from '@mui/material/Container';
import { spacing } from '@mui/system';

export default function Navbar({openSidebar}) {
    const login = true;
    function isLogin() {
        if(login) {
            return(
                <div className="nav-right">
                    <a href="#" className="bx bx-search"></a>
                    <a href="#" className="bx bx-heart"></a>
                    <a href="#" className="bx bx-shopping-bag"></a>
                    <a href="#" className="bx bx-user"></a>
                </div>
        )} else {
            return(
            <div className="nav-right">
                <a href="#">Login</a>
            </div>
            )
        }
    }
    return(
        <Container sx={{ my: 2 }}>
            <div className="d-flex justify-content-between align-items-center">
                <i onClick={openSidebar} className="pointer bx bx-menu d-md-none d-flex"></i>
                <div className="nav-left d-flex d-none d-md-flex">
                    <a id="Home" className="active" href="#" >Home</a>
                    <a href="#">Article</a>
                    <a href="#">Profile</a>
                    <a href="#">Contact Us</a>
                </div>
                {isLogin()}
            </div>
        </Container>
    )
}
