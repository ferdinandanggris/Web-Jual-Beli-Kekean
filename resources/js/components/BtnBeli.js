import React from 'react';

export default function BtnBeli(props) {
    return(
        <button className={"button beli " + props.className}>Beli sekarang!<i className='bx bx-shopping-bag px-1'></i></button>
    )
}
