import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../redux/actions";
import style from "../CreateActivity/CreateActivity.module.css"

function validate(input){
    let errors = {}//Donde se van a guardar los errores
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)

    if(!input.name) errors.name = "Campo Necesario"
    else if (/[^A-Za-z]+/g.test(input.name)) errors.name = 'Nombre no puede tener caracteres especiales o tildes'
        
    if(!input.difficulty) errors.difficulty = "Campo Necesario"
    else if (dif <= 0 || dif > 5) errors.difficulty = "Debe ser entre 1 y 5"
    
    if(!input.duration) errors.duration = "Campo Necesario"    
    else if (dur <= 0 || dur > 24) errors.duration = "Debe ser entre 1 y 24"
        
    if(!input.season || input.season === "vacio") errors.season = "Campo Necesario"
    
    if(!input.countries || input.countries.length === 0) errors.countries = "Campo Necesario"

    return errors;
}

export default function CreateActivity(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
       name:"",
       difficulty:"",
       duration:"",
       season:"",
       countries:[]

    })

    useEffect (() => {
        dispatch(getCountries());
    },[dispatch])

    //Pendiente de los cambios y va modificando el STATE
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    //Ingresa los paises en el Input
    const handleSelect = (e) => {
        setInput((estado) => {
            if(e.target.name === "countries") {
                return {
                    ...estado,
                    countries: [...estado.countries, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    [e.target.name]: e.target.value
                }
            }
    })}

    //Funcion para evitar que el formulario contenga errores y a su vez para guardarlo
    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
            return alert ('Complete correctamente el formulario antes de enviarlo')
        }

        dispatch(postActivity(input))
        alert("Actividad Creada Exitosamente")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countries:[]
        })
        history.push("/home")
    }
    //Te envia al Home
    function handleClick(e){
        e.preventDefault();
        history.push("/home")
        
    }

    return(
        <div className={style.prindiv}>
            <div className={style.bar}>
            <Link to= "/home"><img className={style.bothome} onClick={(e) => handleClick(e)}></img></Link>
            </div>
            <div className={style.contenedorform}>
                
                <form onSubmit={(e)=> handleSubmit(e)}>
                <div className={style.insidebox}>
                    <h2 className={style.titulof}>Crea tu Actividad Turística</h2>
                    <div>
                        <label className={style.campos}>Nombre de su actividad: </label>
                        <input className={style.inputs} type="text" value= {input.name} name= "name" onChange={(e)=> handleChange(e)}/>
                        {errors.name && (<p className={style.errors}>{errors.name}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Escoja el país para su actividad: </label>
                        <select className={style.inputs} name="countries" id="countries" onChange={(e) => handleSelect(e)}>
                                <option></option>                      
                            {countries.map((con) => (
                                <option value={con.id}>{con.name}</option>
                            ))}
                        </select>
                        {errors.countries && (<p className={style.errors}>{errors.countries}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Temporada: </label>
                        <select className={style.inputs} name="season" id="season" onChange={(e) => handleSelect(e)}>
                        <option value="vacio"> </option>
                                <option value={"Verano"}>Verano </option>
                                <option value={"Invierno"}>Invierno </option>
                                <option value={"Primavera"}>Primavera </option>
                                <option value={"Otoño"}>Otoño </option>
                        </select>
                        {errors.season && (<p className={style.errors}>{errors.season}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Dificultad: </label>
                        <input className={style.inputs} type="number" value= {input.difficulty} name= "difficulty" onChange={(e)=> handleChange(e)}/>
                        {errors.difficulty && (<p className={style.errors}>{errors.difficulty}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Duración en horas: </label>
                        <input className={style.inputs} type="number" value= {input.duration} name= "duration" onChange={(e)=> handleChange(e)}/>
                        
                        {errors.duration && (<p className={style.errors}>{errors.duration}</p>)}
                    </div>
                    <div>
                        {/*El boton se habilita solo si no hay errores, de lo contrario no se puede enviar el formulario*/ }
                        <button className={style.botsub} type="submit" disabled={Object.keys(errors).length === 0 ? false : true}>Añadir Actividad</button>
                    </div>
                </div>
                </form>
                </div>    
            </div>
    )
}
