const { HTMLElem } = require('./components/HTMLElem/HTMLElem');
import './style.scss';

const Main = (() => {

  const init = () => {
    const mainSection = HTMLElem('section', [], document.body);
    mainSection.node.id = 'main';
    const row = HTMLElem('div', ['row'], mainSection.node);
    const column = HTMLElem('div', ['col', 'd-flex', 'flex-column', 'justify-content-between'], row.node);
    const top = HTMLElem('div', [], column.node);
    top.node.id = 'top';
    const middle = HTMLElem('div', [], column.node);
    middle.node.id = 'menu';
    const bottom = HTMLElem('div', [], column.node);
    bottom.node.id = 'bottom';
  };

  init();
})();

module.exports = {
  Main,
};
