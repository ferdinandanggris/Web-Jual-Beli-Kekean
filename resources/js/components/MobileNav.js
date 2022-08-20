import React from 'react'

export default function MobileNav() {
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
            <div className={"position-absolute sidebar"}>
                <li>Home</li>
                <li>Article</li>
                <li>Profile</li>
                <li>Contact Us</li>
            </div>
    )
}