import { BoardContainer } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';
import './globalStyles.css';
import { Board } from './Game/Board';
let isRunning = false;

//test
const board = new Board(20, 20);

function handleButtonClickRun() {
    isRunning = !isRunning;
    renderApp();
}

const renderApp = () => {
    const app = document.getElementById('app');

    if (app !== null) {
        while (app.firstChild) {
            app.removeChild(app.firstChild);
        }

        app.appendChild(
            ControlsContainer({
                handleRunClick: handleButtonClickRun,
                handleStopClick: handleButtonClickRun,
                isRunning,
            })
        );

        const newBoardContainer = BoardContainer({
            Board: board,
            cellSize: 50,
        });
        app.appendChild(newBoardContainer.boardContainer);
        newBoardContainer.handleRenderCanvas(0, 0);
    } else {
        throw new Error('App element could not be found in index.html');
    }
};

renderApp();
