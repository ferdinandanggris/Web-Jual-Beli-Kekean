import React from 'react';
import BtnBeli from './BtnBeli';

export default function Hero() {
    return(
        <div className='container'>
            <div className="hero">
                {/* Todo: Crop gambar n Export gambar yg ada gradientnya */}
                <img src="../images/hero.png" className='img-fluid'></img>
                    <div className='hero--text'>
                        <h1 className="display-4">Batik Cakhra 1.1</h1>
                        <p className="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        <BtnBeli className="mt-5"/>
                    </div>
            </div>
        </div>
    )
}
