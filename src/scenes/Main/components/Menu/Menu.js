const { HTMLElem } = require('../HTMLElem/HTMLElem');

const Menu = ((id) => {
  const container = HTMLElem('div', []);
  const { node } = container;
  node.id = id;
  return { node };
})('Menu');

module.exports = {
  Menu,
};
