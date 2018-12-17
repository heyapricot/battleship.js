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
  const displays = ['BottomDisplay', 'TopDisplay'].map((id, index) => {
    let clickable = false;
    if (index === 1) clickable = true;
    return Display(id, clickable);
  });
  const [BottomDisplay, TopDisplay] = displays;
  [TopDisplay, Menu, BottomDisplay].forEach(display => column.node.appendChild(display.node));

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  };

  const AIattack = (gameboard, display) => {
    let coords = NaN;
    const cssClasses = ['fas', 'fa-circle'];

    do {
      coords = [getRandomInt(0, 10), getRandomInt(0, 10)];
    } while (display.isCellMarked(coords));

    gameboard.receiveAttack(coords) ? cssClasses.push('hit') : cssClasses.push('miss');
    display.markAttack(coords, cssClasses);
  };

  const onClick = (coord) => {
    const cssClasses = ['fas', 'fa-circle'];

    if (TopDisplay.isCellMarked(coord) !== true) {
      TopGameboard.receiveAttack(coord) ? cssClasses.push('hit') : cssClasses.push('miss');
      TopDisplay.markAttack(coord, cssClasses);
    }

    if (boards.reduce((acc, val) => acc || val.allSunk(), false) === false) {
      AIattack(BottomGameboard, BottomDisplay);
    } else {
      let message = '';
      TopGameboard.allSunk() ? message = 'You win' : message = 'You lose';
      alert(message);
    }
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  async function simulateAttack(ms) {
    let message = '';
    while (boards.reduce((acc, val) => acc || val.allSunk(), false) === false) {
      AIattack(TopGameboard, TopDisplay);
      await sleep(ms);
      AIattack(BottomGameboard, BottomDisplay);
      await sleep(ms);
    }
    TopGameboard.allSunk() ? message = 'You win' : message = 'You lose';
    alert(message);
  }

  boards.forEach(board => board.randomPlacement());
  // TopDisplay.renderShips(TopGameboard.getLocations());
  TopDisplay.grid.addClickFn(onClick);
  BottomDisplay.renderShips(BottomGameboard.getLocations());
  // simulateAttack(50);
})();


module.exports = {
  Main,
};
