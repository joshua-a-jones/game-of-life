import { clear } from 'console';
import { Board } from './Board';

interface GameControllerProps {
    rerenderBoard: (board: Board) => void;
    maxIterations: number;
    board: Board;
}

class GameController {
    private _rerenderBoard: (board: Board) => void;
    private readonly _maxIterations: number;
    private _currentIteration = 0;
    private _board: Board;
    private _stopGame = false;

    public constructor(props: GameControllerProps) {
        this._rerenderBoard = props.rerenderBoard;
        this._maxIterations = props.maxIterations;
        this._board = props.board;

        //this._rerenderBoard(this._board);
    }

    public runGame() {
        // main game loop
        this._stopGame = false;
        const gameLoop = setInterval(() => {
            if (
                this._currentIteration >= this._maxIterations ||
                this._stopGame
            ) {
                clearInterval(gameLoop);
            }
            this._currentIteration++;
            this.updateGame(this._board);
        }, 100);
    }

    private updateGame(board: Board) {
        // this._currentIteration++;
        board.updateBoardState();
        this._rerenderBoard(board);
    }

    public stopGame() {
        this._stopGame = true;
    }
}

export { GameController };
