const { ButtonGrid } = require('../ButtonGrid/ButtonGrid');
const { HTMLElem } = require('../HTMLElem/HTMLElem');

const Display = (id) => {
  const container = HTMLElem('div', []);
  const { node } = container;
  node.id = id
  const grid = ButtonGrid(10, 10, false);
  node.appendChild(grid.node);

  const markAttack = (coordinates, cssClasses) => { grid.getCell(coordinates).setCSS(cssClasses); };

  return { grid, markAttack, node };
}

module.exports = {
  Display,
};
