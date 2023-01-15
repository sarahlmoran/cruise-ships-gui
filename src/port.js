(function exportPort() {
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
  if (typeof module !== 'undefined' && module.exports){
    module.exports = Port;
  } else {
    window.Port = Port;
  }
})();



