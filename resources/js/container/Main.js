import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MobileNav from '../components/MobileNav'
import Backdrop from '../components/backdrop';
import Filter from '../components/Filter';

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

            <div className='container mt-5'>
                <Filter/>
            </div>
        </div>
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main/>, document.getElementById('example'));
}
