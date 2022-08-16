import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Filter() {
    return(
        <div className="filter">
            <p className='fw-bolder'>Price</p>
            <input placeholder="Rp" className='filter--input' type="text"></input>
            <input placeholder="Rp" className='filter--input ms-3' type="text"></input>
            <hr></hr>
            <p className='fw-bolder'>Tipe Motif</p>
            <FormGroup>
                <FormControlLabel control={<Checkbox sx={{
                                            color: '#FF674D',
                                            '&.Mui-checked': {
                                            color: '#FF674D',
                                            },
                                            }}/>} label="Manis"/>
                <FormControlLabel control={<Checkbox sx={{
                                            color: '#FF674D',
                                            '&.Mui-checked': {
                                            color: '#FF674D',
                                            },
                                            }}/>} label="Chakra"/>
            </FormGroup>

        </div>
    )
}
