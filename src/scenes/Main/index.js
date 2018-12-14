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

  const renderShips = (locationsObj) => {
    for (const key in locationsObj) {
      if (Object.prototype.hasOwnProperty.call(locationsObj, key)) {
        locationsObj[key].forEach(coordinate => BottomDisplay.grid.getCell(coordinate).setCSS(['fas', 'fa-dot-circle', key]));
      }
    }
  }
  board.randomPlacement();
  renderShips(board.getLocations());
})();


module.exports = {
  Main,
};
