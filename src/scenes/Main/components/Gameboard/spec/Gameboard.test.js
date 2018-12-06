const { Gameboard } = require('../Gameboard');
const { shipTypes } = require('../../Ship/Ship');

describe('Gameboard', () => {
  const board = Gameboard();
  beforeEach(() => { board.reset(); });

  describe('put', () => {
    beforeEach(() => { board.reset(); });

    it('Can place a Ship in horizontal position', () => {
      board.put('carrier', [0, 0]);
      for (let i = 0; i < shipTypes.carrier.length; i += 1) {
        expect(board.getStatus([i, 0])).not.toBe('undefined');
      }
    });
    it('Can place a Ship in vertical position', () => {
      board.put('carrier', [0, 0], 'vertical');
      for (let i = 0; i < shipTypes.carrier.length; i += 1) {
        expect(board.getStatus([0, i])).not.toBe('undefined');
      }
    });
  });

  describe('receiveAttack', () => {
    const x = 0;
    const y = 0;

    beforeEach(() => {
      board.reset();
      board.put('carrier', [x, y], 'vertical');
    });

    it('returns true if the specified coordinates hit a ship', () => {
      for (let i = 0; i < shipTypes.carrier.length; i += 1) {
        expect(board.receiveAttack([x, y + i])).toBe(true);
      }
    });
    it('returns false if the specified coordinates does not hit a ship', () => {
      for (let i = 0; i < shipTypes.carrier.length; i += 1) {
        expect(board.receiveAttack([x + 1, y + i])).toBe(false);
      }
    });
    it('returns false if the specified coordinate was already tracked', () => {
      expect(board.receiveAttack([x, y])).toBe(true);
      expect(board.receiveAttack([x + 1, y + 1])).toBe(false);
      expect(board.receiveAttack([x, y])).toBe(false);
      expect(board.receiveAttack([x + 1, y + 1])).toBe(false);
    });
  });

  describe('allSunk', () => {
    const ships = [
      'carrier',
      'battleship',
      'cruiser',
      'submarine',
      'destroyer',
    ];
    it('returns true if all Ships are sunk', () => {
      ships.forEach((ship, index) => {
        board.put(ship, [0, index]);
        for (let i = 0; i < shipTypes[ship].length; i += 1) {
          board.receiveAttack([i, index]);
        }
      });
      expect(board.allSunk()).toBe(true);
    });
  });
});
