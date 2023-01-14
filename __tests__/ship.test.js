const Ship = require("../src/ship");

describe("Ship", () => {
  describe("with ports and an itinerary", () => {
    let ship;
    let newcastle;
    let amsterdam;
    let itinerary;

    beforeEach(() => {
      newcastle = {
        addShip: jest.fn(),
        removeShip: jest.fn(),
        name: "Newcastle",
        ships: [],
      };

      amsterdam = {
        addShip: jest.fn(),
        removeShip: jest.fn(),
        name: "Amsterdam",
        ships: [],
      };

      itinerary = {
        ports: [newcastle, amsterdam],
      };

      //itinerary = new Itinerary ([newcastle, amsterdam]);

      ship = new Ship(itinerary);
    });
    it("returns an object", () => {
      expect(ship).toBeInstanceOf(Object);
    });

    it("sets the starting port property", () => {
      expect(ship.currentPort).toBe(newcastle);
    });

    it("gets added to port on instantiation", () => {
      expect(newcastle.addShip).toHaveBeenCalledWith(ship);
    });

    it("can set sail from a starting port", () => {
      ship.setSail();

      expect(ship.currentPort).toBeFalsy();
      expect(newcastle.removeShip).toHaveBeenCalledWith(ship);
      //expect (ship.previousPort).toBe(itinerary);
    });

    it("throws an error if you try to sail past the last port in the itinerary", () => {
      ship.setSail();
      ship.dock();

      expect(() => ship.setSail()).toThrowError(
        "You have reached the end of your itinerary, please disembark"
      );
    });

    it("can dock at a different port", () => {
      ship.setSail();
      ship.dock();

      expect(ship.currentPort).toBe(amsterdam);
      expect(amsterdam.addShip).toHaveBeenCalledWith(ship);
    });
  });
});
