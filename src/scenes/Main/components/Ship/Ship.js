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
  let targets = Array.from(Array(length)).map(() => false);
  const hit = (position) => {
    if (position < length && position >= 0) targets[position] = true;
    return targets[position];
  };
  const isTargetHit = position => targets[position];
  const isSunk = () => targets.reduce((acc, val) => acc && val, true);
  const reset = () => {
    targets = Array.from(Array(length)).map(() => false);
  }

  return {
    hit, isSunk, isTargetHit, length, reset, type,
  };
};

module.exports = {
  Ship,
};
