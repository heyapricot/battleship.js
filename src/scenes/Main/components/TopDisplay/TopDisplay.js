const { HTMLElem } = require('../HTMLElem/HTMLElem');
const { ButtonGrid } = require('../ButtonGrid/ButtonGrid');

const TopDisplay = ((id) => {
  const container = HTMLElem('div', []);
  const { node } = container;
  node.id = id;
  const grid = ButtonGrid();
  node.appendChild(grid.node);
  return { node };
})('TopDisplay');

module.exports = {
  TopDisplay,
};
