import {React, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesDetail, getActivities } from "../../redux/actions";
import img from "../Images/home.png"
import style from "../CountryDetail/CountryDetail.module.css"


export default function CountryDetail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id //Guardo el ID del pais al que se ingreso
    const country = useSelector((state) => state.detail) //Guardo los detalles
    const activity = useSelector((state) => state.activities)//Guardo las actividades
    const history = useHistory()
    const activityFilter = activity.filter(e => e.id == id);//Filtro las actividades segun el ID

    //Se renderizan los detalles y las actividades del pais correspondiente
    useEffect(() => {
        dispatch(getCountriesDetail(id))
        dispatch(getActivities(id))
    },[dispatch, id])

    function handleClick(e){
        e.preventDefault();
        history.push("/home")
        
    }

    //Luego al renderizar se mapea toda la informacion necesaria
    return (
        <div className={style.back}>
        <div className={style.prindiv}>

            <div className={style.bar}>
            <Link to= "/home"><img className={style.bothome} onClick={(e) => handleClick(e)} src={img} alt="logo"></img></Link>
            </div>

            <div className={style.cardd}>

                <div className={style.conpais} >
                <h2 className={style.titulod}>Detalles del País</h2>
            {
                country ?
                <div >
                    <img className={style.banderad} src={country.flags} alt="Imagen no disponible" />
                    <h2 className={style.nombred}>{country.name}</h2>
                    <h4 className={style.continented}>{country.continents}</h4>
                    <h4 className={style.codigo}>{country.id}</h4>
                    <h4 className={style.detalle}>Capital: {country.capital}</h4>
                    <h4 className={style.detalle}>Región: {country.subregion}</h4>
                    <h4 className={style.detalle}>Área: {country.area} km²</h4>
                    <h4 className={style.detalle}>Población: {country.population} Hab.</h4>
                </div> : <p>Loading ...</p>
            }
                </div>

            <div className={style.conact}>
            <h3 className={style.titulod}>Actividades del País</h3>
            { 
                activityFilter.map(e => { 
                return (
                        <div>
                            <h4 className={style.nombreact}>{e.name}</h4>
                            <p className={style.detalle}>Dificultad: {e.difficulty}</p>
                            <p className={style.detalle}>Duración: {e.duration} horas</p>
                            <p className={style.detalle}>Temporada: {e.season}</p>
                        </div>
                        
                    ) 
                }) 
            }
            {/*Boton para crear una nueva actividad*/ }
             <Link to="/activity"><button className={style.botactd}>Crear Actividad</button></Link>               
            </div>
            </div>
        </div>
        </div>
    )
};