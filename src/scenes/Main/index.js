const { HTMLElem } = require('./components/HTMLElem/HTMLElem');
const { BottomDisplay } = require('./components/BottomDisplay/BottomDisplay');
const { TopDisplay } = require('./components/TopDisplay/TopDisplay');
import './style.scss';

const Main = (() => {

  const mainSection = HTMLElem('section', [], document.body);
  mainSection.node.id = 'main';
  const container = HTMLElem('div', ['container', 'h-100'], mainSection.node)
  const row = HTMLElem('div', ['row', 'h-100'], container.node);
  const column = HTMLElem('div', ['col', 'd-flex', 'flex-column', 'justify-content-around'], row.node);
  [TopDisplay, BottomDisplay].forEach(display => column.node.appendChild(display.node));
  const middle = HTMLElem('div', [], column.node);
  middle.node.id = 'menu';
})();


module.exports = {
  Main,
};
