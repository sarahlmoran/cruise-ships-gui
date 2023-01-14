const Port = require("../src/port");

describe("Port", () => {
  describe("with adding and removing ships", () => {
    let port;
    let mayflower;
    let titanic;

    beforeEach(() => {
      port = new Port("Mallorca");
      mayflower = jest.fn();
      titanic = jest.fn();
    });

    it("can be instantiated", () => {
      expect(new Port()).toBeInstanceOf(Object);
    });

    it("sets the name property of the port", () => {
      expect(port.name).toBe("Mallorca");
    });

    it("adds the docking ship to the ships in the port", () => {
      port.addShip(mayflower);

      expect(port.ships).toContain(mayflower);
    });

    it("removes a ship leaving the port", () => {
      port.addShip(mayflower);
      port.addShip(titanic);
      port.removeShip(titanic);

      expect(port.ships).toEqual([mayflower]);
    });
  });
});
