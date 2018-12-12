const { ButtonGrid } = require('../ButtonGrid/ButtonGrid');
const { HTMLElem } = require('../HTMLElem/HTMLElem');

const BottomDisplay = ((id) => {
  const container = HTMLElem('div', []);
  const { node } = container;
  node.id = id
  const grid = ButtonGrid();
  node.appendChild(grid.node);
  return { node };
})('BottomDisplay');

module.exports = {
  BottomDisplay,
};
