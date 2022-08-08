import React from 'react'

export default function Navbar() {
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

    const [hover, setHover] = React.useState({
        Home: true,
        Article: false,
        Profile: false,
        Contact: false,
    })

    function handleHover(event) {
        setHover(prevState => {
            return {
                ...prevState,
                [event.target.id]: !event.target.id
            }
        })
    }

    function handleClick() {

    }
    return(
        <nav className="container">
            <div className="d-flex justify-content-between align-items-center">
                <i onClick={handleClick} className="bx bx-menu d-md-none d-flex"></i>
                <div className="nav-left d-flex d-none d-md-flex">
                    <a
                    id="Home"
                    onMouseEnter={handleHover}
                    className={hover.Home? "active" : ""}
                    href="#" >Home</a>
                    <a href="#">Article</a>
                    <a href="#">Profile</a>
                    <a href="#">Contact Us</a>
                </div>
                {isLogin()}
            </div>
        </nav>
    )
}
