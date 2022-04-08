import Cell from './Cell';

export default class Board {
    private _livingCells: Array<Cell>;
    private _xDim: number;
    private _yDim: number;

    // constructor for square board
    public constructor(xInitial: number, yInitial: number) {
        this._livingCells = new Array<Cell>();
        this._xDim = xInitial;
        this._yDim = yInitial;

        // randomizes the starting status of each cell.
        for (let i = 0; i < xInitial; i++) {
            for (let j = 0; j < yInitial; j++) {
                const rand = Math.floor(Math.random() * 2);
                if (rand > 0) {
                    const newCell = new Cell(i, j);
                    this._livingCells.push(newCell);
                }
            }
        }
    }

    getBoardState() {
        return this._livingCells;
    }

    countLivingNeighborsAt(x: number, y: number) {
        let livingNeigbors = 0;
        this._livingCells.forEach((cell) => {
            // don't include the cell itself
            if (cell.coordinates.x === x && cell.coordinates.y === y) return;

            // possible neighbors are between x -1 and x + 1 and y - 1 and y + 1 inclusive
            if (
                cell.coordinates.y <= y + 1 &&
                cell.coordinates.y >= y - 1 &&
                cell.coordinates.x <= x + 1 &&
                cell.coordinates.x >= x - 1
            ) {
                livingNeigbors++;
            }
        });
        return livingNeigbors;
    }

    randomizeBoardState() {
        this._livingCells = new Array<Cell>();
        for (let i = 0; i < this._xDim; i++) {
            for (let j = 0; j < this._yDim; j++) {
                const rand = Math.floor(Math.random() * 2);
                if (rand > 0) {
                    this._livingCells.push(new Cell(i, j));
                }
            }
        }
    }
}
