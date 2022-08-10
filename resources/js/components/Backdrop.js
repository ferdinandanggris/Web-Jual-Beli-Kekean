import React from 'react';

export default function Backdrop({sidebar}) {
    return(
        <div className={sidebar?"backdrop backdrop--open":"backdrop"}>
            
        </div>
    )
}
