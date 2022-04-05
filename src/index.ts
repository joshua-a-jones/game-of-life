import { boardContainer, renderCanvas } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';
import './globalStyles.css';
import Board from './Game/Board';
let isRunning = false;

renderApp();
//test

function handleButtonClick() {
    isRunning = !isRunning;
    renderApp();
}

function renderApp() {
    const app = document.getElementById('app');
    const board = new Board(20);

    if (app !== null) {
        while (app.firstChild) {
            app.removeChild(app.firstChild);
        }

        app.appendChild(
            ControlsContainer({
                handleRunClick: handleButtonClick,
                handleRandomizeClick: handleButtonClick,
                handleStopClick: handleButtonClick,
                isRunning,
            })
        );
        app.appendChild(boardContainer.appendChild(renderCanvas(board)));
    } else {
        throw new Error('App element could not be found in index.html');
    }
}
