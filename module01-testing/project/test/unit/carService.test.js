const { describe, it, before } = require("mocha");
const { join } = require("path");
const { expect } = require("chai");

const CarService = require("./../../src/service/carService");

const carsDatabase = join(__dirname, "./../../database", "cars.json");
const mocks = {
  validCarCategory: require("./../mocks/valid-carCategory.json"),
  validCar: require("./../mocks/valid-car.json"),
  validCustomer: require("./../mocks/valid-customer.json"),
};

describe("CarService Suite Tests", () => {
  let carService;

  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.to.be.gte(0);
  });
});
