import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar'

function Main() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Navbar/>, document.getElementById('example'));
}
