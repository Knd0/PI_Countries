import { GET_COUNTRIES, CLEAN_STATE, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP, GET_COUNTRY_DETAIL, FILTER_BY_CONTINENT, GET_COUNTRIES_BY_NAME, SET_PAGE, LOADING_ACTION, POST_ACTIVITIES, GET_ACTIVITIES } from "./actions-types";
import axios from "axios";

//Para hacer una req a la BD pidiendole toda la informacion de los paises
export function getCountries() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/countries`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_COUNTRIES, payload: response })
            })
            .catch(error => {
                console.log(error)
            })
    };
};

//Solicitar informacion especifica de cada pais
export function getCountriesDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/countries/" + id)
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

//Solicitar la informacion de todas las actividades
export function getActivities() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/activity/all`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_ACTIVITIES, payload: response })
            })
            .catch(error => console.log(error))
    };
};

//Guardar la informacion de una nueva actividad
export function postActivity(body) {
    return async function (dispatch) {
        try {
            var activity = await axios.post(`http://localhost:3001/activity`, body);
            return dispatch({
                type: POST_ACTIVITIES,
                payload: activity.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByPopulation(payload) {
    return {
      type: ORDER_COUNTRIES_POP,
      payload,
    };
}

export function orderByName(payload) {
    return {
      type: ORDER_COUNTRIES_ALF,
      payload,
    };
}

export function filterByContinent(payload) {
    return {
      type: FILTER_BY_CONTINENT,
      payload,
    };
}

//Solicitar la informacion de un pais que sea pedido por query
export function getCountriesByName (name) {
    return async function(dispatch){
        await axios.get(`http://localhost:3001/countries?name=` + name)
        .then(response => (dispatch({type: GET_COUNTRIES_BY_NAME, payload: response.data})))
    }
}

//Asignar pagina actual
export function setCurrentPage(page) {
    return { type: SET_PAGE, payload: page }
};

export function cleanState() {
    return {
        type: CLEAN_STATE
    }
}

export function loadingAction(status) {
    return {
        type: LOADING_ACTION,
        payload: status
    }
}