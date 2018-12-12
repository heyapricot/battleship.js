const { HTMLElem } = require('../../../HTMLElem/HTMLElem');

const HoldButton = (parentNode, clickable = true) => {
  const button = HTMLElem('i', ['fas', 'fa-circle', 'target'], parentNode);
  const { node } = button;
  const clickFunctions = [];
  const onClick = () => {
    console.log('Hello :)');
  };
  const setAsClickable = () => {
    node.classList.toggle('clickable');
    node.addEventListener('click', onClick);
  };
  if (clickable) setAsClickable();
  return { node };
};

module.exports = {
  HoldButton,
};
