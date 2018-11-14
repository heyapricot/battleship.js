const { Ship } = require('../Ship');

describe('Ship', () => {
  it('generates a Ship with the correct properties for every type', () => {
    const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'].map((shipType) => Ship(shipType));
    const lengths = [5,4,3,3,2];
    ships.forEach((ship, index)=>expect(ship.length).toEqual(lengths[index]));
  });
});
