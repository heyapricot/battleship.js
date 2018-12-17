import './style.scss';

const { HTMLElem } = require('./components/HTMLElem/HTMLElem');
const { Display } = require('./components/Display/Display');
const { Gameboard } = require('./components/Gameboard/Gameboard');
const { Menu } = require('./components/Menu/Menu');

const Main = (() => {
  const mainSection = HTMLElem('section', [], document.body);
  mainSection.node.id = 'main';
  const container = HTMLElem('div', ['container', 'h-100'], mainSection.node);
  const row = HTMLElem('div', ['row', 'h-100'], container.node);
  const column = HTMLElem('div', ['col', 'd-flex', 'flex-column', 'justify-content-around'], row.node);
  const boards = Array.from(Array(2)).map(() => Gameboard());
  const [BottomGameboard, TopGameboard] = boards;
  const displays = ['BottomDisplay', 'TopDisplay'].map(id => Display(id));
  const [BottomDisplay, TopDisplay] = displays;
  [TopDisplay, Menu, BottomDisplay].forEach(display => column.node.appendChild(display.node));

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  };

  const AIattack = () => {
    let coords = NaN;
    const cssClasses = ['fas', 'fa-circle'];

    do {
      coords = [getRandomInt(0, 10), getRandomInt(0, 10)];
    } while (BottomDisplay.isCellMarked(coords));

    BottomGameboard.receiveAttack(coords) ? cssClasses.push('hit') : cssClasses.push('miss');
    BottomDisplay.markAttack(coords, cssClasses);
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  async function simulateAttack() {
    while (BottomGameboard.allSunk() === false) {
      AIattack();
      await sleep(100);
    }
  }

  BottomGameboard.randomPlacement();
  BottomDisplay.renderShips(BottomGameboard.getLocations());
  simulateAttack();
})();


module.exports = {
  Main,
};
