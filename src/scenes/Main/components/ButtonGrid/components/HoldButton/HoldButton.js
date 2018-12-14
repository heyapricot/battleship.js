const { HTMLElem } = require('../../../HTMLElem/HTMLElem');

const HoldButton = (parentNode, clickable = true) => {
  let activeIconClasses = ['fas', 'fa-circle'];
  const button = HTMLElem('i', [...activeIconClasses, 'target'], parentNode);
  const { node } = button;
  const clickFunctions = [];
  const setCSS = (iconClasses) => {
    [activeIconClasses, iconClasses].forEach(classSet =>
      classSet.forEach(cssClass => node.classList.toggle(cssClass)),
    );
    activeIconClasses = iconClasses;
  };
  const onClick = () => {
    setCSS(['fas', 'fa-certificate']);
  };
  const setAsClickable = () => {
    node.classList.toggle('clickable');
    node.addEventListener('click', onClick);
  };
  if (clickable) setAsClickable();
  return { setCSS, node };
};

module.exports = {
  HoldButton,
};
