import { BoardContainer } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';
import { GameController } from './Game/GameController';
import './globalStyles.css';
import { Board } from './Game/Board';
let isRunning = false;


const board = new Board(10, 10);
const boardRenderer = BoardContainer({Board: board, cellSize: 50});
initializeApp();

const gameController = new GameController({
    rerenderBoard,
    maxIterations: 20,
    board,
});

function handleStopButtonClick() {
    isRunning = !isRunning;
    gameController.stopGame();
    initializeApp();
}

function handleRunButtonClickRun() {
    isRunning = !isRunning;
    initializeApp;
    gameController.runGame();
}

// function handleButtonClickRandomize() {
//     board.randomizeBoardState();
//     renderApp(board);
// }

function initializeApp() {
    const app = document.getElementById('app');

    if (app !== null) {
        while (app.firstChild) {
            app.removeChild(app.firstChild);
        }

        app.appendChild(
            ControlsContainer({
                handleRunClick: handleRunButtonClickRun,
                // handleRandomizeClick: handleButtonClickRandomize,
                handleStopClick: handleStopButtonClick,
                isRunning,
            })
        );
        
        const boardCanvas = boardRenderer.boardContainer;
        boardRenderer.handleRenderCanvas(0, 0);
        app.appendChild(boardCanvas);
        
    } else {
        throw new Error('App element could not be found in index.html');
    }
}

function rerenderBoard(board: Board) {
    const app = document.getElementById('app');
    const currentBoardElement = document.getElementById('boardContainer');

    if (app !== null) {
        if (currentBoardElement) {
            const offsets = boardRenderer.getOffsets();
            boardRenderer.handleClearCanvas(offsets.offsetX, offsets.offsetY);
            boardRenderer.handleRenderCanvas(offsets.offsetX, offsets.offsetY);
        } else {
            console.log("poop");
        }
    }
}
