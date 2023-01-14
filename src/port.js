class Port {
  constructor(name, ships = []) {
    this.name = name;
    this.ships = ships;
  }

  addShip(shipName) {
    this.ships.push(shipName);
  }

  removeShip(shipName) {
    const shipNameIndex = this.ships.indexOf(shipName);
    this.ships.splice(shipNameIndex, 1);
  }
}

module.exports = Port;
