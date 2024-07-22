const assert = require('node:assert');
const { createSandbox } = require('sinon');

const Service = require('./service');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const MOCKS = {
  alderaan: require('../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json'),
};

const sinon = createSandbox();

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL_1).resolves(MOCKS.tatooine);
  stub.withArgs(BASE_URL_2).resolves(MOCKS.alderaan);

  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearedIn: 5,
    };

    const result = await service.getPlanets(BASE_URL_1);
    assert.deepStrictEqual(result, expected);
  }
  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2,
    };

    const result = await service.getPlanets(BASE_URL_2);
    assert.deepStrictEqual(result, expected);
  }
})();
