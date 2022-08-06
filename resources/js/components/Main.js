import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar'

function Main() {
    return (
        <div>
            <Navbar/>
        </div>
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main/>, document.getElementById('example'));
}
