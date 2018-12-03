const { Ship } = require('../Ship/Ship');
const Gameboard = (width = 10, length = 10) => {
  const cells = [];
  const isTaken = (coords) => {
    if (coords[0] < width && coords[1] < length) {
      if (typeof cells[coords] === 'undefined') {
        return false;
      }
      return cells[coords];
    }
    throw new Error('Requested coordinates are out of bounds');
  };
  const put = (shipType, start, direction = 'horizontal') => {
    const ship = Ship(shipType);
    let x; let y;
    [x, y] = start;
    switch (direction) {
      case 'horizontal':
        for (let i = 0; i < ship.length; i += 1){
          cells[[x + i, y]] = ship;
        }
        break;
      case 'vertical':
        for (let i = 0; i < ship.length; i += 1){
          cells[[x, y + i]] = ship;
        }
        break;
      default:
        throw new Error('Invalid direction');
    }
  };
  return { cells, isTaken, put };
}

module.exports = {
  Gameboard,
};
