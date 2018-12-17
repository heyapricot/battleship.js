const { ButtonGrid } = require('../ButtonGrid/ButtonGrid');
const { HTMLElem } = require('../HTMLElem/HTMLElem');

const Display = (id, clickable = false) => {
  const container = HTMLElem('div', []);
  const { node } = container;
  node.id = id
  const grid = ButtonGrid(10, 10, clickable);
  node.appendChild(grid.node);

  const isCellMarked = coordinates => ['hit', 'miss'].reduce((acc, val) => acc || grid.getCell(coordinates).node.classList.contains(val), false);

  const markAttack = (coordinates, cssClasses) => { grid.getCell(coordinates).setCSS(cssClasses); };

  const renderShips = (locationsObj) => {
    for (const key in locationsObj) {
      if (Object.prototype.hasOwnProperty.call(locationsObj, key)) {
        locationsObj[key].forEach(coordinate => grid.getCell(coordinate).setCSS(['fas', 'fa-circle', key]));
      }
    }
  };

  return {
    grid, isCellMarked, markAttack, renderShips, node,
  };
}

module.exports = {
  Display,
};
