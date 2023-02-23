import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css"
import landing from "./Globo.mp4"

export default function LandingPage(){
    return(
        <>
            <div className={style.conteiner}>
                <video className={style.video} autoPlay muted loop>
                    <source src={landing} type="video/mp4" />
                    <source src={landing} type="video/webm" />
                    <source src={landing} type="video/ogg" />
                    <img src="imagen.png" alt="Video no soportado" />
                    Su navegador no soporta contenido multimedia.
                </video>
                <div className={style.btncont}>
                    <Link to ="/home">
                        <button className={style.btn}>Ingresar</button>
                    </Link>
                </div>
            </div>
        </>
    )
}