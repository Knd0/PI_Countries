import { GET_COUNTRIES, CLEAN_STATE, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP, GET_COUNTRY_DETAIL, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES_BY_NAME, POST_ACTIVITIES } from "./actions-types";

//Estados iniciales que voy a necesitar
const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: {}
};

function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_COUNTRIES:
            return{ //Guardo todos los paises en ambos arrays
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case FILTER_BY_CONTINENT: //Filtro por continente y los guardo en el array de "countries"
            let allCountries = [...state.allCountries]
            let filteredContinents = action.payload === "All" ? allCountries : allCountries.filter((e) => e.continents === action.payload)
            return {
                ...state,
                countries: filteredContinents
            }
        case ORDER_COUNTRIES_ALF: //Ordenar los paises de A-Z y Z-A
            let sortedArr = action.payload === "asc" ?
            state.countries.sort(function (a, b) { //Con el metodo Sort voy movienod los paises dentro del array, 
                if(a.name > b.name) {              //cambiandoles su lugar dentro del mismo
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function (a, b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })    
            return { //Luego retorno el array ordenado..
                ...state,
                countries: sortedArr
            }
        case ORDER_COUNTRIES_POP://Ordeno dependiendo la cantidad de habitantes, mismo metodo que antes
                let sortedArrPop = action.payload === "mayp" ?
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return 1
                    }
                    if(b.population > a.population) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function (a, b) {
                    if(a.population > b.population) {
                        return -1
                    }
                    if(b.population > a.population) {
                        return 1
                    }
                    return 0
                })    
                return {
                    ...state,
                    countries: sortedArrPop
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                countries: action.payload,
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        case CLEAN_STATE:
            return {
                ...state,
                detail: {}
            }
        case POST_ACTIVITIES:
            return {
                ...state,
                activities: [...state.activities, action.payload]
            };
        default:
            return state;
    
    }

}

export default rootReducer;