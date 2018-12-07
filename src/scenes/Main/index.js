import './style.scss';

const Main = (() => {

  const init = () => {
    const mainSection = document.createElement('section');
    document.body.appendChild(mainSection);
    mainSection.id = 'main';
  };

  init();
})();

module.exports = {
  Main,
};
