const { Ship } = require('../Ship');

const sinkShip = (ship) => {
  for (let i = 0; i < ship.length; i += 1) {
    ship.hit(i);
  }
}

describe('Ship', () => {

  const ships = [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer',
  ].map(shipType => Ship(shipType));
  const lengths = [5, 4, 3, 3, 2];


  it('generates a Ship with the correct properties for every type', () => {
    ships.forEach((ship, index) => expect(ship.length).toEqual(lengths[index]));
  });

  describe('hit', () => {
    it('returns true when the ship is hit in a specific position', () => {
      ships.forEach((ship) => {
        for (let i = 0; i < ship.length; i += 1) {
          ship.hit(i);
          expect(ship.isTargetHit(i)).toBe(true);
        }
      });
    });
  });

  describe('isSunk', () => {
    beforeEach(() => {
      ships.forEach(ship => ship.reset());
    });

    it('returns true if the ship has been hit at all it\'s positions', () => {
      ships.forEach((ship) => {
        sinkShip(ship);
        expect(ship.isSunk()).toBe(true);
      });
    });
  });

});
