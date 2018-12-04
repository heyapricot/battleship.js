const { Ship } = require('../Ship/Ship');

const Gameboard = (width = 10, length = 10) => {
  let cells = [];
  const getStatus = (coords) => {
    if (coords[0] < width && coords[1] < length) return cells[coords];
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

    if (cellsToOccupy.reduce((acc, val) => acc && typeof cells[val] === 'undefined', true)) {
      cellsToOccupy.forEach((coordinate) => { cells[coordinate] = ship; });
    } else {
      throw new Error('Ships can\'t overlap');
    }
  };
  const receiveAttack = (coordinates) => {
    const cell = getStatus(coordinates);
    switch (typeof cell) {
      case 'undefined':
        cells[coordinates] = false;
        break;
      case 'object':
        cells[coordinates] = true;
        break;
      default:
        return false;
    }
    return getStatus(coordinates);
  };
  const reset = () => { cells = []; };
  return {
    getStatus, put, receiveAttack, reset,
  };
};

module.exports = {
  Gameboard,
};
