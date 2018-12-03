const { Gameboard } = require('../Gameboard');
const { shipTypes } = require('../../Ship/Ship');

describe('Gameboard', () => {
  const board = Gameboard();

  describe('put', () => {
    beforeEach(() => { board.reset(); });

    it('Can place a Ship in horizontal position', () => {
      board.put('carrier', [0, 0]);
      for (let i = 0; i < shipTypes.carrier.length; i += 1) {
        expect(board.isTaken([i, 0])).not.toBe(false);
      }
    });
    it('Can place a Ship in vertical position', () => {
      board.put('carrier', [0, 0], 'vertical');
      for (let i = 0; i < shipTypes.carrier.length; i += 1) {
        expect(board.isTaken([0, i])).not.toBe(false);
      }
    });
  });
});
