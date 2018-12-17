const { HoldButton } = require('./components/HoldButton/HoldButton');
const { HTMLElem } = require('../HTMLElem/HTMLElem');

const ButtonGrid = (width = 10, height = 10, clickable = true) => {
  const container = HTMLElem('div', ['container']);
  const { node } = container;
  const row = HTMLElem('div', ['row'], node);
  let col = HTMLElem('div', ['col', 'd-flex', 'justify-content-center'], row.node)
  const cells = Array.from(Array(width * height)).map((current, index) => {
    const hb = HoldButton(col.node, clickable, [index % width, Math.floor(index / height)])
    if (index % height === (width - 1)) {
      HTMLElem('div', ['w-100'], row.node);
      col = HTMLElem('div', ['col', 'd-flex', 'justify-content-center'], row.node);
    }
    return hb;
  });

  const addClickFn = fn => cells.forEach(button => button.addClickFunction(fn));

  const getCell = (coordinates) => {
    let x;
    let y;
    [x, y] = coordinates;
    const index = x + (y * height);
    return cells[index];
  };
  return { addClickFn, getCell, node };
};

module.exports = {
  ButtonGrid,
}
