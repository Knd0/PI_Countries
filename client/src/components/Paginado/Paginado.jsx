import React from "react";
import s from "./Paginado.module.css"

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = [] //En este array se van a ir guardando la cantidad de paginas que voy a utilizar

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) { //Este for depende de la cantidad de      
        pageNumbers.push(i)                                               // paises que yo quiera por pagina, 
    }                                                                     // dividiendo asi los paises por pagina

    return(
        <nav className={s.contpag}>
            <ul>
                {
                    pageNumbers && 
                    pageNumbers.map(number => (
                        // Mapeo un boton para cada pagina creada con su respetivo numero(arrancando por 1)
                        <button className={s.boton} key={number} onClick={() => paginado(number)}>{number}</button>
                    ))
                }
            </ul>
        </nav>
    )
}