const BaseRepository = require("./../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    return Math.floor(Math.random() * list.length);
  }

  async getAvailableCar(carCategory) {
    return null;
  }
}

module.exports = CarService;
