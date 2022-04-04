import style from './board.module.css';

const boardContainer = document.createElement('div');

boardContainer.classList.add(style.container);
boardContainer.innerText = 'board';

export { boardContainer };
