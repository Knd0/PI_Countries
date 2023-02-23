const { Router } = require('express');
const { Sequelize, Op } = require('sequelize')
const { Country, Activity } = require('../db')
const { getCountries, postActivity } = require('../controllers/CountryController')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Con esa ruta envio toda la informacion requerida de cada pais
router.get('/countries', async (req, res) => {
    const { name } = req.query;
    try {
        let countries = await getCountries();
        let countriesfilter = countries.map(country => {
            return {
                id: country.id,
                name: country.name,
                flags: country.flags,
                continents: country.continents,
                capital: country.capital,
                subregion: country.subregion,
                area: country.area,
                population: country.population,
                fifa: country.fifa
            }
        })
        // Si me mandan un nombre por query solo voy a mostrar el pais indicado o aquel pais que tenga una similitud con las letras ingresadas
        if (name) {
            let result = countriesfilter.filter(c => c.name.toLowerCase().includes(name.toString().toLowerCase()));
            if (result.length === 0) {
                return res.send({msg: "Country not found"})
            }else{
                return res.send(result);
            }

        }else {
            return res.send(countriesfilter);
        }
    } catch (error) {
        console.log(error);
    }
})

//En esta ruta envio la informacion del pais que concuerde con el ID solicitado
router.get('/countries/:id', async (req, res) => {
    const idPais = req.params.id.toUpperCase();//Corrigo el id si me lo mandan en mayus para evitar errores
    try {
        await getCountries();
        if (idPais) {
            let result = await Country.findByPk(idPais, { // busco en la BD el pais con el mismo ID
                include: {
                    model: Activity,
                    atributes: ['name', 'difficulty', 'duration', 'season'],
                    through: { atributes: [] },
                }
            });
            if (!result) {
                return res
                    .status(404)
                    .send("No se encuentran paises para ese idPais")
            }
            return res.status(200).json(result)
        }
    } catch (error) {
        console.log(error)
    }
});


//Ruta para solicitar todas las actividades que tengo guardadas en la BD
router.get('/activity/all', async (req, res) => { 
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
})

router.post('/activity', postActivity)



module.exports = router;
