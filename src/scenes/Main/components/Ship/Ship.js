const shipTypes = {
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

const Ship = (type) => {
  if (typeof shipTypes[type] === 'undefined') throw new Error('Undefined type of Ship');
  const { length } = shipTypes[type];
  let targets = Array.from(Array(length)).map(() => false);
  const hit = (position) => {
    if (position < length && position >= 0) targets[position] = true;
    return targets[position];
  };
  const isTargetHit = position => targets[position];
  const isSunk = () => targets.reduce((acc, val) => acc && val, true);
  const reset = () => {
    targets = Array.from(Array(length)).map(() => false);
  };

  return {
    hit, isSunk, isTargetHit, length, reset, type,
  };
};

module.exports = {
  Ship,
  shipTypes,
};
