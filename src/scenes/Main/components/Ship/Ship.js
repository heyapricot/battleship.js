const Ship = (type, initialPosition = NaN, direction = NaN) => {
  const properties = {
    carrier: {
      length: 5,
    },
    battleship: {
      length: 4,
    },
    cruiser: {
      length: 3,
    },
    submarine: {
      length: 3,
    },
    destroyer: {
      length: 2,
    },
  };
  if (typeof properties[type] === 'undefined') throw new Error('Undefined type of Ship');
  const { length } = properties[type];
  return { length, type };
};

module.exports = {
  Ship,
};
