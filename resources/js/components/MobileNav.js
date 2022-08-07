import React from 'react'

export default function Main() {
    const login = true;
    function isLogin() {
        if(login) {
            return(
                <div className="nav-right">
                    <a href="#" className="bx bx-search"></a>
                    <a href="#" className="bx bx-heart"></a>
                    <a href="#" className="bx bx-shopping-bag"></a>
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
        <nav className="container">
            <div className="d-flex justify-content-between">
                
                {isLogin()}
            </div>
        </nav>
    )
}