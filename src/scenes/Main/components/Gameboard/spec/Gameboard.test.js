const { Gameboard } = require('../Gameboard');

describe('Gameboard', () => {
  const board = Gameboard();


  describe('put', () => {
    it('Places a Ship at a specific position', () => {
      board.put('carrier', [0, 0]);
      for (let i = 0; i < 5; i += 1) {
        expect(board.isTaken([i, 0])).not.toBe(false);
      }
    });
  });
});
