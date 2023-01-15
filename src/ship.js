(function exportShip() {
  class Ship {
  constructor(itinerary) {
    this.itinerary = itinerary;
    this.currentPort = itinerary.ports[0];
    this.currentPort.addShip(this);
    this.previousPort = null;
  }

  setSail() {
    const itinerary = this.itinerary;
    const currentPortIndex = itinerary.ports.indexOf(this.currentPort);

    if (currentPortIndex === itinerary.ports.length - 1) {
      throw new Error(
        "You have reached the end of your itinerary, please disembark"
      );
    }
    this.previousPort = this.currentPort;
    this.currentPort.removeShip(this);
    this.currentPort = null;
  }

  dock() {
    const itinerary = this.itinerary;
    const previousPortIndex = itinerary.ports.indexOf(this.previousPort);

    this.currentPort = itinerary.ports[previousPortIndex + 1];
    this.currentPort.addShip(this);
  }
  }
  if (typeof module !== 'undefined' && module.exports){
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
})();


