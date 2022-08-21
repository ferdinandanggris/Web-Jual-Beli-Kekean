import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './container/Main'
import CatalogPage from './container/CatalogPage';
import Navbar from './components/Navbar'

function Navs() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" exact element={<Main/>}/>
                <Route path="/catalog" element={<CatalogPage/>}/>
            </Routes>
        </Router>
    );
}

export default Navs;

if (document.getElementById('app')) {
    ReactDOM.render(<Navs/>, document.getElementById('app'));
}
