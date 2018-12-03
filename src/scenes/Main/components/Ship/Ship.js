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
  let hitCount = 0;
  const damage = () => hitCount;
  const hit = () => { hitCount += 1; };
  const isSunk = () => hitCount === length;
  const reset = () => {
    hitCount = 0;
  };

  return {
    damage, hit, isSunk, length, reset, type,
  };
};

module.exports = {
  Ship,
  shipTypes,
};
