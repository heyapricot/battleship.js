const { Ship } = require('../Ship/Ship');

const Gameboard = (width = 10, length = 10) => {
  let cells = [];
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

    const cellsToOccupy = (dir => Array.from(Array(ship.length)).map((current, index) => {
      switch (dir) {
        case 'horizontal':
          return [x + index, y];
        case 'vertical':
          return [x, y + index];
        default:
          throw new Error('Invalid direction');
      }
    }))(direction);

    if (cellsToOccupy.reduce((acc, val) => acc || isTaken(val), false) === false) {
      cellsToOccupy.forEach((coordinate) => { cells[coordinate] = ship; });
    } else {
      throw new Error('Ships can\'t overlap');
    }
  };
  const receiveAttack = (coordinates) => {
    let ship;
    if (ship = isTaken(coordinates)){
      ship.hit();
      return true;
    }
    return false;
  };
  const reset = () => { cells = []; };
  return { isTaken, put, receiveAttack, reset };
};

module.exports = {
  Gameboard,
};
