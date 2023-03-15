import { Card, Container, Grid } from "@mui/material";
import React from "react";
import "../../css/ProductCustomize.css";

const ProductCustomize = () => {
    return (
        <Container sx={{ px: 10, mt: 5 }}>
            <div className="card rounded border " style={{border:'1px solid rgba(0, 0, 0, 0.32)',borderRadius:20}}>
                <div className="row m-4 pb-3">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-10 pe-0">
                                <canvas className="canvas"></canvas>
                            </div>
                            <div className="col ps-0">
                                <div style={{width:108,height:526,backgroundColor:'#F7F7F7',overflowY:'scroll',overflowX:'hidden'}}>
                                    <div className="title-color text-center pt-2" style={{fontWeight:500}}>
                                        COLOR
                                    <hr className="mx-3 mt-0" style={{border: '2px solid #EBE4E4'}} />
                                </div>
                                <div className="p-1 color" style={{cursor:'pointer',width:108,height:89}}>
                                    <div className="fill-color mx-auto" style={{marginTop : 13,height:46,width:46,borderRadius : '50%',backgroundColor : 'green'}}>
                                    </div>
                                    <p className="text-center mt-1" style={{fontSize: 12}}>Green</p>
                                </div>
                                <div className="p-1 color" style={{cursor:'pointer',width:108,height:89}}>
                                    <div className="fill-color mx-auto" style={{marginTop : 13,height:46,width:46,borderRadius : '50%',backgroundColor : '#7870D5'}}>
                                    </div>
                                    <p className="text-center mt-1" style={{fontSize: 12}}>Purple</p>
                                </div>
                                <div className="p-1 color" style={{cursor:'pointer',width:108,height:89}}>
                                    <div className="fill-color mx-auto" style={{marginTop : 13,height:46,width:46,borderRadius : '50%',backgroundColor : '#EAB3E8'}}>
                                    </div>
                                    <p className="text-center mt-1" style={{fontSize: 12}}>Pink</p>
                                </div>
                                <div className="p-1 color" style={{cursor:'pointer',width:108,height:89}}>
                                    <div className="fill-color mx-auto" style={{marginTop : 13,height:46,width:46,borderRadius : '50%',backgroundColor : '#FF7D7D'}}>
                                    </div>
                                    <p className="text-center mt-1" style={{fontSize: 12}}>Orange</p>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div style={{backgroundColor:'#F7F7F7',width : 'auto',height : 466,overflowY:'scroll',overflowX:'hidden'}}>
                            <div className="title-color pt-2 px-3" style={{fontWeight:500}}>
                                <span className="mx-3 ">MOTIF</span>
                                <hr className="mx-3 mt-0" style={{border: '2px solid #EBE4E4'}} />
                            </div>
                            <div className="row mx-3">
                                <div className="col-6">
                                    <div className="motif mx-auto text-center" style={{width:'auto',height:148,cursor:'pointer'}}>
                                        <img src="../images/motif-batik-dummy/kawung.webp" className="py-1 px-1" style={{borderRadius : '50%',objectFit:'cover',width:106,height:106}}></img>
                                        <p className="text-center mt-1" style={{fontSize: 12}}>Kawung</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="motif mx-auto text-center" style={{width:'auto',height:148,cursor:'pointer'}}>
                                        <img src="../images/motif-batik-dummy/parang.webp" className="py-1 px-1" style={{borderRadius : '50%',objectFit:'cover',width:106,height:106}}></img>
                                        <p className="text-center mt-1" style={{fontSize: 12}}>Parang</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="motif mx-auto text-center" style={{width:'auto',height:148,cursor:'pointer'}}>
                                        <img src="../images/motif-batik-dummy/mega-mendung.webp" className="py-1 px-1" style={{borderRadius : '50%',objectFit:'cover',width:106,height:106}}></img>
                                        <p className="text-center mt-1" style={{fontSize: 12}}>Mega Mendung</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="motif mx-auto text-center" style={{width:'auto',height:148,cursor:'pointer'}}>
                                        <img src="../images/motif-batik-dummy/sagon.webp" className="py-1 px-1" style={{borderRadius : '50%',objectFit:'cover',width:106,height:106}}></img>
                                        <p className="text-center mt-1" style={{fontSize: 12}}>Sagon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-100">
                            <button className="btn text-white mt-4 button-cart" style={{backgroundColor:'#FF8D24',borderRadius:20,width:'100%',}}>Add To Chart</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProductCustomize;