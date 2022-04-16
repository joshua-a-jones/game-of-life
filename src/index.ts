import { BoardContainer } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';
import { GameController } from './Game/GameController';
import './globalStyles.css';
import { Board } from './Game/Board';
let isRunning = false;

const board = new Board(10, 10);
renderApp(board);

const gameController = new GameController({
    rerenderBoard,
    maxIterations: 20,
    board,
});

function handleStopButtonClick() {
    isRunning = !isRunning;
    gameController.stopGame();
    renderApp(board);
}

function handleRunButtonClickRun() {
    isRunning = !isRunning;
    renderApp;
    gameController.runGame();
}

function handleButtonClickRandomize() {
    board.randomizeBoardState();
    renderApp(board);
}

function renderApp(board: Board) {
    const app = document.getElementById('app');

    if (app !== null) {
        while (app.firstChild) {
            app.removeChild(app.firstChild);
        }

        app.appendChild(
            ControlsContainer({
                handleRunClick: handleRunButtonClickRun,
                handleRandomizeClick: handleButtonClickRandomize,
                handleStopClick: handleStopButtonClick,
                isRunning,
            })
        );
        rerenderBoard(board);
    } else {
        throw new Error('App element could not be found in index.html');
    }
}

function rerenderBoard(board: Board) {
    const app = document.getElementById('app');
    const currentBoardElement = document.getElementById('boardContainer');

    if (app !== null) {
        if (currentBoardElement) {
            app.removeChild(currentBoardElement);
            const newBoardContainer = BoardContainer({
                Board: board,
                cellSize: 10,
            });
            app.appendChild(newBoardContainer.boardContainer);
            newBoardContainer.handleRenderCanvas(0, 0);
        } else {
            const newBoardContainer = BoardContainer({
                Board: board,
                cellSize: 10,
            });
            app.appendChild(newBoardContainer.boardContainer);
            newBoardContainer.handleRenderCanvas(0, 0);
        }
    }
}
