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

  const getCells = () => cells;

  const getLocations = () => locations;

  const getShips = () => ships;

  const getStatus = (coords) => {
    if (coords[0] < width && coords[1] < height) return cells[coords];
    throw new Error('Requested coordinates are out of bounds');
  };

  const checkOverlap = (coordinates) => {
    let x;
    let y;
    coordinates.forEach((coords) => {
      [x, y] = coords;
      if (x >= width) throw new Error('Horizontal index out of bounds');
      if (y >= height) throw new Error('Vertical index out of bounds');
      if (typeof cells[coords] !== 'undefined') throw new Error('One of the coordinates overlaps with another object');
    });
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

  const randomPlacement = (shipTypes = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']) => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    }

    const directions = ['horizontal', 'vertical'];
    const shipQueue = shipTypes;

    while (shipQueue.length > 0) {
      let ship = shipQueue.shift();

      try {
        put(ship, [getRandomInt(0, width), getRandomInt(0, height)], directions[getRandomInt(0, 2)]);
      } catch (err) {
        shipQueue.push(ship);
      }
    }
  }

  const receiveAttack = (coordinates) => {
    const cell = getStatus(coordinates);
    if (typeof cell === 'undefined') {
      cells[coordinates] = false;
    } else if (typeof cell === 'object') {
      cell.hit();
      cells[coordinates] = true;
    }
    return getStatus(coordinates);
  };

  const reset = () => { cells = []; ships.length = 0; };

  return {
    allSunk, getCells, getLocations, getShips, getStatus, put, randomPlacement, receiveAttack, reset,
  };
};

module.exports = {
  Gameboard,
};
