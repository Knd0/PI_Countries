import { React } from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCountries, getCountriesByName, setCurrentPage } from "../../redux/actions";
import style from "../NavBar/NavBar.module.css"

export default function NavBar({setCurrentPage}){

const dispatch = useDispatch()
const [name, setName] = useState("")
 
// Cada vez que renderiza voy a tener los paises listos para usar
useEffect(() => {
    dispatch(getCountries())
}, [dispatch])


//Esta funcion esta pendiente de los cambios q se realizan y modifica el STATE
function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
}
//Con esta funcion encuentro el pais buscado o los paises que contengan las siglas ingresadas
function handleSubmit(e){
    e.preventDefault();
    dispatch(getCountriesByName(name));
    setCurrentPage(1)
    setName("");
}
//Con esta funcion vuelvo a mostrar todos los paises
function handleClick() {
    dispatch(getCountries())
}

//Luego asigne las funciones
return (
    <div className={style.navbar}>
    <div className={style.contSearch}>
    <div className={style.search}>
        <div className={style.searchtitle}>Encuentra Tu Próximo Destino</div>    
           <input className={style.searchinp} value={name} type = "text" placeholder = "Qué país deseas visitar..."
            onChange = {e => handleInputChange(e)} />
            <button className={style.boton} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
        <button className={style.reset} onClick={(e) => handleClick(e)}>Reset</button>
    </div>
    </div>   
)}