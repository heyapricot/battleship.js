const { HTMLElem } = require('./components/HTMLElem/HTMLElem');
const { ButtonGrid } = require('./components/ButtonGrid/ButtonGrid');
import './style.scss';

const Main = (() => {

  const mainSection = HTMLElem('section', [], document.body);
  mainSection.node.id = 'main';
  const container = HTMLElem('div', ['container', 'h-100'], mainSection.node)
  const row = HTMLElem('div', ['row', 'h-100'], container.node);
  const column = HTMLElem('div', ['col', 'd-flex', 'flex-column', 'justify-content-around'], row.node);
  const top = ((parentNode) => {
    const container = HTMLElem('div', [], column.node);
    const { node } = container;
    const grid = ButtonGrid();
    node.appendChild(grid.node);
    return { node };
  })(column.node);
  top.node.id = 'top';
  const middle = HTMLElem('div', [], column.node);
  middle.node.id = 'menu';
  const bottom = ((parentNode) => {
    const container = HTMLElem('div', [], column.node);
    const { node } = container;
    const grid = ButtonGrid();
    node.appendChild(grid.node);
    return { node };
  })();
  bottom.node.id = 'bottom';
})();


module.exports = {
  Main,
};
