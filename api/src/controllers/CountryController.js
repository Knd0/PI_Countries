const { Country, Activity  } = require ('../db');
const axios = require ('axios');

// Recolecto la informacion que necesito de la API, asignandole el nombre que yo quiera
const getApiCountries = async() => { 
    const apiInfo = await axios.get(`https://restcountries.com/v3/all`);
    const apiCountries = apiInfo.data?.map(country => {
        return {
            id: country.cca3,
            name: country.name.common,
            flags: country.flags[1],
            continents: country.continents[0],
            capital: country.capital ? country.capital[0] : "",
            subregion: country.subregion,
            area: country.area,
            population: country.population,
            fifa: country.fifa ? country.fifa : ""
        }
    })
    return apiCountries;
}
// Antes de guardar la informacion de los paises en la base de datos, corroboro que la base de datos este vacia, si esta vacia guardo la informacion que obtuve antes de la API
const saveCountriesDB = async () => { 
    const countries = await Country.findAll();
    if (countries.length === 0) {
        const info = await getApiCountries();
        await Country.bulkCreate(info); //Crear en cantidad
    } else {
        return ('No se pudo copiar la info a la base de datos');
    }
}
// Esto me permite requerir todos los datos de los paises, contando con sus respectivas actividades
const getCountries = async () => {
    await saveCountriesDB();
    const result = await Country.findAll({
        include: {
            model: Activity,
            atributes: ['name', 'difficulty', 'duration', 'season'],
            through: { atributes: [] },
        }, 
    });
    return result;
}
// Obtengo toda las actividades que tengo guardadas en la base de datos
const getActivities = async () => {
    try {
        const activities = await Activity.findAll()
        if (activities) {
            activities.filter(e => e.mane)
            res.json(activities)
        } else {
            res.status(404).send("Activity not found")
        }
    } catch (error) {
        res.status(404).json(error)
    }
}
// Guardo la informacion que se manda del front en la base de datos
const postActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body
        if (name && difficulty && duration && season && countries) {
            const [activity] = await Activity.findOrCreate({ //Como dice el nombre, primero busca si ya existe la   
                where: {                                     // actividad, de lo contrario crea una nueva
                    id: countries[0],
                    name: name,
                    difficulty: difficulty,
                    duration: duration,
                    season: season,
                },
            });
            return res.send('Activity created');
        } else {
            return res.status(422).json('Activity not created');
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    getActivities,
    getCountries,
    postActivity,
}