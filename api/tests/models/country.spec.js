const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => { // En este test intenta crear un Pais sin nombre, el 
        Country.create({})                                    // cual le tira un error
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Colombia' });
      });
      it('should found when its a valid name', () => {  // Lo mismoen estos casos, tiene que tener la informacion
        Country.findOrCreate({ name: 'Argentina' });    // valida en todos los campos obligatorios
      });
      it('should work when its a valid capital', () => {
        Country.create({ capital: 'Lima' });
      });
      it('should work when its a valid continent', () => {
        Country.create({ continent: 'America' });
      });
    });
  });
});
