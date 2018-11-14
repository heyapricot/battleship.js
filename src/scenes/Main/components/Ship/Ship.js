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
  const targets = Array.from(Array(length)).map(() => false);
  const hit = (position) => {
    if (position < length && position >= 0) targets[position] = true;
    return targets[position];
  };
  const isTargetHit = position => targets[position];

  return {
    hit, isTargetHit, length, type,
  };
};

module.exports = {
  Ship,
};
