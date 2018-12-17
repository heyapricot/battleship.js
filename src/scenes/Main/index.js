const { HTMLElem } = require('./components/HTMLElem/HTMLElem');
const { BottomDisplay } = require('./components/BottomDisplay/BottomDisplay');
const { Gameboard } = require('./components/Gameboard/Gameboard');
const { Menu } = require('./components/Menu/Menu');
const { TopDisplay } = require('./components/TopDisplay/TopDisplay');
import './style.scss';

const Main = (() => {
  const mainSection = HTMLElem('section', [], document.body);
  mainSection.node.id = 'main';
  const container = HTMLElem('div', ['container', 'h-100'], mainSection.node)
  const row = HTMLElem('div', ['row', 'h-100'], container.node);
  const column = HTMLElem('div', ['col', 'd-flex', 'flex-column', 'justify-content-around'], row.node);
  [TopDisplay, Menu, BottomDisplay].forEach(display => column.node.appendChild(display.node));
  const board = Gameboard();

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function demo() {
    while (board.allSunk() === false) {
      const coords = [getRandomInt(0, 10), getRandomInt(0, 10)];
      const cssClasses = ['fas', 'fa-circle'];
      board.receiveAttack(coords) ? cssClasses.push('hit') : cssClasses.push('miss');
      BottomDisplay.markAttack(coords, cssClasses);
      await sleep(100);
    }
  }

  const renderShips = (locationsObj) => {
    for (const key in locationsObj) {
      if (Object.prototype.hasOwnProperty.call(locationsObj, key)) {
        console.log(locationsObj[key]);
        locationsObj[key].forEach(coordinate => BottomDisplay.grid.getCell(coordinate).setCSS(['fas', 'fa-circle', key]));
      }
    }
  }
  board.randomPlacement();
  renderShips(board.getLocations());
  demo();
  console.log('Cells: ');
  console.log(board.getCells());
})();


module.exports = {
  Main,
};
