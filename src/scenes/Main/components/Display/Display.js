const { ButtonGrid } = require('../ButtonGrid/ButtonGrid');
const { HTMLElem } = require('../HTMLElem/HTMLElem');

const Display = (id) => {
  const container = HTMLElem('div', []);
  const { node } = container;
  node.id = id
  const grid = ButtonGrid(10, 10, false);
  node.appendChild(grid.node);

  const isCellMarked = coordinates => ['hit', 'miss'].reduce((acc, val) => acc || grid.getCell(coordinates).node.classList.contains(val), false);

  const markAttack = (coordinates, cssClasses) => { grid.getCell(coordinates).setCSS(cssClasses); };

  return {
    grid, isCellMarked, markAttack, node,
  };
}

module.exports = {
  Display,
};
