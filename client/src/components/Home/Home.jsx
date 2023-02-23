import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCountries, filterByContinent, orderByName, orderByPopulation, getActivities, cleanState } from "../../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css"


export default function Home (){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)//Guardo todos los paises en esta constante

    const [searchError, setSearchError] = useState(false);
    const [orden, setOrden]= useState("") //Para modificar el STATE cuando se utiliza algun filtro

    const [currentPage, setCurrentPage] = useState(1) //Asignar la pagina actual
    let [countriesPerPage, setCountriesPerPage] = useState(10) //Cantidad de paises por pagina

    //Datos para el paginado
    const indexOfLastCountrie = currentPage * countriesPerPage //Guarda el index del ultimo pais, en la primera pagina seria el [10]..
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage //Gurdo el index del primer pais por pagina
    const currentCountries = allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie) // Guardo los paises que se utlilizaran en la pagina actual

    //Funcion para asignar la pagina que se este utilizando
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //Pimero limpio el State para evitar errores y luego ejecuto las funciones para inicializar vairables
    useEffect(() => {
        dispatch(cleanState());
        dispatch(getCountries())
        dispatch(getActivities());
      }, [dispatch]);
      
    //Filtro segun continente
    function handleFilteredCountrie(e){
        dispatch(filterByContinent(e.target.value))
    };
    //Filtro segun el nombre
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)//Vuelve a la pagina 1 con los paises ya filtrados
        setOrden(`Ordenado ${e.target.value}`)//Asigno el valor que tiene el value
    };
    //Filtro segun la poblacion
    function handleSortPop(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    return (
        <div className={style.prindiv}>
            
            <div><NavBar
            setCurrentPage={setCurrentPage}
            /></div>
            {/*FILTROS*/}
            <div className={style.filtros}>
            <div>
                Orden Alfabético:    
            <select className={style.select} onChange={e => handleSort(e)}>
                <option value="all">Todos</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
            </div>
            <div>
                Cantidad de Habitantes:
            <select className={style.select} onChange={e => handleSortPop(e)}>
                <option value="all">Todos</option>
                <option value="mayp">Menor a Mayor</option>
                <option value="menp">Mayor a Menor</option>
            </select>
            </div>
            <div>
                Busca por Continentes:
            <select className={style.select} onChange={e => handleFilteredCountrie(e)}>
                <option value="All">Todos</option>
                <option value="South America">Sudamérica</option>
                <option value="North America">Norteamérica</option>
                <option value="Africa">África</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceanía</option>
                <option value="Antarctica">Antárctica</option>
            </select>
            </div>
            </div>
                <div className={style.contenedorCards}>
                {currentCountries.length ? 
                    currentCountries.map((e) => {
                        return (
                        <div className={style.Card}>
                            <Card
                            flags={e.flags}
                            name={e.name}
                            continents={e.continents}
                            fifa={e.fifa}
                            key={e.id}
                            id={e.id}
                            />
                        </div>
                        );
                    })
                     
                :   
                    <h1>No hay paises</h1>
                }
                </div>
            <div className={style.paginado}>
            <Paginado
            countriesPerPage = {countriesPerPage} //Datos dados anteriormente, lo cual permite generar los botones
            allCountries = {allCountries.length}
            paginado = {paginado}
            /> 
            </div>
        </div>
    )
}