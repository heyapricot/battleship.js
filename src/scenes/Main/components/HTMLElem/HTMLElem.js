const HTMLElem = (nodeType, cssClasses = [], parentNode = NaN) => {
  const node = document.createElement(nodeType);
  cssClasses.forEach(cssClass => node.classList.toggle(cssClass));
  if (!Number.isNaN(parentNode)) {
    parentNode.appendChild(node);
  }
  return { node };
};

module.exports = {
  HTMLElem,
};