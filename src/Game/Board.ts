import Grid from './Grid';
import Cell from './Cell';

export default class Board {
    private _dimensions: number;
    private _grid: Grid<Cell>;

    // constructor for square board
    public constructor(dimensions: number) {
        this._dimensions = dimensions;

        this._grid = new Grid<Cell>(dimensions, dimensions);

        // randomizes the starting status of each cell.
        for (let i = 0; i < this._dimensions; i++) {
            for (let j = 0; j < this._dimensions; j++) {
                const rand = Math.floor(Math.random() * 2);
                this._grid.setElementAt(i, j, new Cell(rand > 0));
            }
        }
    }

    countLivingNeighborsAt(x: number, y: number) {
        let numberOfLivingNeighbors = 0;

        if (x < 0 || x > this._dimensions || y < 0 || y < this._dimensions) {
            // this is an edge piece, what we wanna do?
        } else {
            for (let i = x - 1; i < this._dimensions; i++) {
                for (let j = y - 1; j < this._dimensions; j++) {
                    numberOfLivingNeighbors += this._grid.getElementAt(i, j)
                        ?.getStatus
                        ? 1
                        : 0;
                }
            }
        }

        return numberOfLivingNeighbors;
    }
}
