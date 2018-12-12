const { HoldButton } = require('./components/HoldButton/HoldButton');
const { HTMLElem } = require('../HTMLElem/HTMLElem');

const ButtonGrid = (width = 10, height = 10) => {
  const container = HTMLElem('div', ['container']);
  const { node } = container;
  const row = HTMLElem('div', ['row'], node);
  let col = HTMLElem('div', ['col', 'd-flex', 'justify-content-center'], row.node)
  const cells = Array.from(Array(width * height)).map((current, index) => {
    HoldButton(col.node)
    if (index % height === (width - 1)) {
      HTMLElem('div', ['w-100'], row.node);
      col = HTMLElem('div', ['col', 'd-flex', 'justify-content-center'], row.node);
    }
  });
  console.log(cells);
  // const buttons = columns.map(col => col.map(cell => HoldButton(cell.node)));
  return { node };
};

module.exports = {
  ButtonGrid,
}