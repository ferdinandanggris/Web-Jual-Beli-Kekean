import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar'
import Hero from './Hero'

function Main() {
    return (
        <div>
            <Navbar/>
            <Hero/>
        </div>
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main/>, document.getElementById('example'));
}
