import { Belakang } from "./.GLB/Belakang";
import { DepanKiri } from "./.GLB/DepanKiri";
import { DepanKanan } from "./.GLB/DepanKanan";
import { Kancing } from "./.GLB/Kancing";
import { Kerah } from "./.GLB/Kerah";
import { LenganKanan } from "./.GLB/LenganKanan";
import { LenganKiri } from "./.GLB/LenganKiri";
import React from 'react';


export default function Baju() {
    return(
        <>
            <Belakang/>
            <DepanKanan/>
            <DepanKiri/>
            <Kancing/>
            <Kerah/>
            <LenganKiri/>
            <LenganKanan/>


        </>
    )
}