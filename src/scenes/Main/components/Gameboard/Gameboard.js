const { Ship } = require('../Ship/Ship');

const Gameboard = (width = 10, height = 10) => {
  let cells = {};
  let ships = [];
  let locations = {};

  const allSunk = () => ships.reduce((accumulator, ship) => accumulator && ship.isSunk(), true);

  const placementCoordinates = (shipLength, start, direction) => {
    let x; let y;
    [x, y] = start;
    return Array.from(Array(shipLength)).map((current, index) => {
      switch (direction) {
        case 'horizontal':
          return [x + index, y];
        case 'vertical':
          return [x, y + index];
        default:
          throw new Error('Invalid direction');
      }
    });
  };

  const getLocations = () => locations;

  const getShips = () => ships;

  const getStatus = (coords) => {
    if (coords[0] < width && coords[1] < height) return cells[coords];
    throw new Error('Requested coordinates are out of bounds');
  };

  const checkOverlap = (coordinates) => {
    if (coordinates.reduce((acc, val) => acc || typeof cells[val] !== 'undefined', false)) {
      throw new Error('One of the coordinates overlaps with another object');
    }
  };

  const put = (shipType, start, direction = 'horizontal') => {
    const ship = Ship(shipType);

    const cellsToOccupy = placementCoordinates(ship.length, start, direction)

    try {
      checkOverlap(cellsToOccupy);
    } catch (err) {
      throw new Error("Can't place ship on the selected coordinates. One of the spaces is already occupied");
    }

    cellsToOccupy.forEach((coordinate) => { cells[coordinate] = ship; });
    locations[ship.type] = cellsToOccupy;
    ships.push(ship);

    return cellsToOccupy;
  };

  const randomPlacement = (shipTypes = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer',]) => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    }

    const shipQueue = shipTypes;

    while (shipQueue.length > 0) {
      let ship = shipQueue.shift();

      try {
        put(ship, [getRandomInt(0, width - 1), getRandomInt(0, height - 1)]);
      } catch (err) {
        shipQueue.push(ship);
      }
    }
  }

  const receiveAttack = (coordinates) => {
    const cell = getStatus(coordinates);
    switch (typeof cell) {
      case 'undefined':
        cells[coordinates] = false;
        break;
      case 'object':
        cell.hit();
        cells[coordinates] = true;
        break;
      default:
        return false;
    }
    return getStatus(coordinates);
  };

  const reset = () => { cells = []; ships.length = 0; };

  return {
    allSunk, getLocations, getShips, getStatus, put, randomPlacement, receiveAttack, reset,
  };
};

module.exports = {
  Gameboard,
};
