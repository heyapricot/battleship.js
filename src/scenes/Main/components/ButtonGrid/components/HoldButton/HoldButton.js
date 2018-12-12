const { HTMLElem } = require('../../../HTMLElem/HTMLElem');

const HoldButton = (parentNode, clickable = true) => {
  let activeIconClasses = ['fas', 'fa-circle'];
  const button = HTMLElem('i', [...activeIconClasses, 'target'], parentNode);
  const { node } = button;
  const clickFunctions = [];
  const changeIcon = (iconClasses) => {
    [activeIconClasses, iconClasses].forEach(classSet => classSet.forEach(cssClass => node.classList.toggle(cssClass)));
    activeIconClasses = iconClasses;
  };
  const onClick = () => {
    changeIcon(['fas', 'fa-certificate']);
  };
  const setAsClickable = () => {
    node.classList.toggle('clickable');
    node.addEventListener('click', onClick);
  };
  if (clickable) setAsClickable();
  return { changeIcon, node };
};

module.exports = {
  HoldButton,
};
