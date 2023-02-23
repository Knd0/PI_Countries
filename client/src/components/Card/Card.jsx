import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"

//Estas CARD se van a mostrar en el HOME, contiene un boton para ver detalladamente la informacion de cada pais
export default function Card({flags, name, continents, id, fifa}) {
    return (
        <div className={style.card}>
            <div><img className={style.bandera} src={flags} alt="Imagen no disponible" /></div>
            <h3 className={style.titulo}>{name}</h3>
            <h5 className={style.continents}>{continents}</h5>
            <h5>{fifa}</h5>
            <Link to={`/countries/${id}`}><button className={style.boton}>Ver Más</button></Link>        
        </div>
    );
}