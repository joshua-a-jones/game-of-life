import { BoardContainer } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';
import { GameController } from './Game/GameController';
import './globalStyles.css';
import { Board } from './Game/Board';

const board = new Board(10, 10);
const boardRenderer = BoardContainer({ Board: board });
initializeApp();

const gameController = new GameController({
    rerenderBoard,
    maxIterations: 200,
    board,
});

function handleStopButtonClick() {
    gameController.stopGame();
}

function handleRunButtonClickRun() {
    gameController.runGame();
}

function onGenerationsInputChange(value: number) {
    gameController.setMaxGenerations = value;
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
                onGenerationsInputChange,
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
            console.log('poop');
        }
    }
}
