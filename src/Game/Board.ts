import { Cell } from './Cell';

class Board {
    private _xDim: number;
    private _yDim: number;
    private _boardState: Map<string, Cell>;

    public constructor(xInitial: number, yInitial: number) {
        this._xDim = xInitial;
        this._yDim = yInitial;
        this._boardState = new Map<string, Cell>();

        // randomizes the starting status of each cell.
        // for (let i = 0; i < xInitial; i++) {
        //     for (let j = 0; j < yInitial; j++) {
        //         const rand = Math.floor(Math.random() * 2);
        //         if (rand > 0) {
        //             const newCell = new Cell(i, j);
        //             this._livingCells.push(newCell);
        //         }
        //     }
        // }

        this.addCellAt(9, 10);
        this.addCellAt(10, 10);
        this.addCellAt(11, 10);
        this.addCellAt(11, 9);
        this.addCellAt(10, 8);
    }

    addCellAt(x: number, y: number) {
        if (!this._boardState.has([x, y].toString())) {
            this._boardState.set([x, y].toString(), new Cell(x, y));
        }
    }

    removeCellAt(x: number, y: number) {
        if (this._boardState.has([x, y].toString())) {
            this._boardState.delete([x, y].toString());
        }
    }

    getBoardState() {
        // return an array of the values of cellMap
        return Array.from(this._boardState.values());
    }

    randomizeBoardState() {
        this._boardState = new Map<string, Cell>();
        for (let i = 0; i < this._xDim; i++) {
            for (let j = 0; j < this._yDim; j++) {
                const rand = Math.floor(Math.random() * 100);
                if (rand > 70) {
                    this.addCellAt(i, j);
                }
            }
        }
    }

    countLivingNeighborsAt({ x, y }: { x: number; y: number }) {
        return this.getLivingNeighborsAt({ x, y }).length;
    }

    updateBoardState() {
        // Rule 1: Any live cell with two or three live neighbors survives.
        // Rule 2: Any dead cell with three live neighbours becomes a live cell.
        // Rule 3: All other live cells die in the next generation. Similarly, all other dead cells stay dead.

        const newCellMap = new Map<string, Cell>();

        // we kill two birds with one stone here: we check each living cell to see if it dies, and we also
        // get the dead neighbors of each living cell and check to see if they come alive

        this._boardState.forEach((livingCell) => {
            // find the living neighbors of the current cell and apply rule 1 above
            const livingNeighbors = this.countLivingNeighborsAt(
                livingCell.coordinates
            );
            if (livingNeighbors === 2 || livingNeighbors === 3) {
                newCellMap.set(
                    `${livingCell.coordinates.x},${livingCell.coordinates.y}`,
                    livingCell
                );
            }

            // now get the dead neighbors of the current cell and see if they come to life according to rule 2
            const deadNeighbors = this.getDeadNeighborsAt(
                livingCell.coordinates
            );

            deadNeighbors.forEach((n) => {
                if (
                    this.countLivingNeighborsAt(n.coordinates) === 3 &&
                    !newCellMap.has(`${n.coordinates.x},${n.coordinates.y}`)
                ) {
                    newCellMap.set(`${n.coordinates.x},${n.coordinates.y}`, n);
                }
            });
        });

        // update the game's state
        this._boardState = newCellMap;
    }

    getLivingNeighborsAt({ x, y }: { x: number; y: number }) {
        // each element in this array will be either a living neighbor or undefined
        const neighbors = [
            this._boardState.get([x - 1, y].toString()),
            this._boardState.get([x + 1, y].toString()),
            this._boardState.get([x, y - 1].toString()),
            this._boardState.get([x, y + 1].toString()),
            this._boardState.get([x - 1, y - 1].toString()),
            this._boardState.get([x - 1, y + 1].toString()),
            this._boardState.get([x + 1, y - 1].toString()),
            this._boardState.get([x + 1, y + 1].toString()),
        ];

        // return the array with the undefineds filtered out
        return neighbors.filter((n) => !!n);
    }

    getDeadNeighborsAt({ x, y }: { x: number; y: number }) {
        const neighborCoords = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
            [x - 1, y - 1],
            [x - 1, y + 1],
            [x + 1, y - 1],
            [x + 1, y + 1],
        ];

        const deadNeighbors = new Array<Cell>();

        // loop through all the neighboring coordinates and check to see if there's a living cell
        // if there's no living cell, we create a new cell at those coordinates and add it to
        // the deadNeighbors array, which is then returned.
        neighborCoords.forEach((coord) => {
            if (!this._boardState.has(coord.toString()))
                deadNeighbors.push(new Cell(coord[0], coord[1]));
        });

        return deadNeighbors;
    }
}

export { Board };
