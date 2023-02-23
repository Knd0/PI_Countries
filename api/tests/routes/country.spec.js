/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');
const {getCountries} = require('../../src/controllers/CountryController')

const agent = session(app);
const country = {
  name: 'Argentina',
  id: 'ARG'
};

const contries = getCountries();

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(pokemon)));
  describe('GET /countries', () => { //Si no hay errores en la ruta /countries tendria que pasar
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
});
describe('GET /All Activities', () => { //Si no hay error
  it('should get 200', () =>
    agent.get('/activity/all').expect(200),
  );
});

describe('GET / Countries for Query', () => { //Si los datos ingresados por query son corretos deberia pasar
  it('Respons 200', () => 
  agent
  .get('/countries?name=Italy')
  .then((res) => {
    res.query
      }))
  expect(200);

  it('Respons 200', () => 
  agent
  .get('/countries?name=Peru')
  .then((res) => {
    res.query
      }))
  expect(200);
  
  it('Respons 404', () => 
  agent.get('/countries?name=1') //Dato incorrecto tendria que dar error
  .then((res) => {
    res.query
      }))
  expect(404);
});
describe('GET / Countries for Id', () => {
  it('Respons 200', () => 
  agent
  .get(`/countries/COL`)
  .then((res) => {
    res.query
      }))
  expect(200);
  
  it('Respons 404', () => 
  agent.get(`/countries/125`) // Dato incorrecto tendria que dar error
  .then((res) => {
    res.query
      }))
  expect(404);
});
