const { HTMLElem } = require('../../../HTMLElem/HTMLElem');
const HoldButton = (parentNode) => {
  const button = HTMLElem('i', ['fas', 'fa-circle', 'target'], parentNode);
  const { node } = button;
  return { node };
};

module.exports = {
  HoldButton,
};
