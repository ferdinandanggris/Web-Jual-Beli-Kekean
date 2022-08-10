import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar'
import Hero from './Hero'
import MobileNav from './MobileNav'
import Backdrop from './backdrop';

function Main() {
    const [sidebar, setSidebar] = React.useState(false)

    const toggleSidebar = () => {
        setSidebar(prevState => !prevState)
    }
    return (
        <div>
            <MobileNav sidebar={sidebar}/>
            <Backdrop sidebar={sidebar}/>
            <Navbar openSidebar={toggleSidebar}/>
            <Hero/>
        </div>
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main/>, document.getElementById('example'));
}
