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
        // for (let i = 0; i < xInitial; i++) {
        //     for (let j = 0; j < yInitial; j++) {
        //         const rand = Math.floor(Math.random() * 2);
        //         if (rand > 0) {
        //             const newCell = new Cell(i, j);
        //             this._livingCells.push(newCell);
        //         }
        //     }
        // }

        this._livingCells.push(new Cell(1, 1));
        this._livingCells.push(new Cell(1, 2));
        this._livingCells.push(new Cell(1, 3));
    }

    getBoardState() {
        return this._livingCells;
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

    countLivingNeighborsAt({ x, y }: { x: number; y: number }) {
        return this.getLivingNeighborsAt({ x, y }).length;
    }

    updateBoardState() {
        // Rule 1: Any live cell with two or three live neighbours survives.
        // Rule 2: Any dead cell with three live neighbours becomes a live cell.
        // Rule 3: All other live cells die in the next generation. Similarly, all other dead cells stay dead.

        const deadCellsWithLivingNeighbors = this._livingCells.reduce(
            (accumulator, current) => {
                return [
                    ...accumulator,
                    ...this.getDeadNeighborsAt(current.coordinates),
                ];
            },
            new Array<Cell>()
        );

        // create hashmap of the dead cells so we can filter out copies
        const deadCellsHashmap = new Map();

        // check dead cells to see if any come alive
        const newLivingCells = deadCellsWithLivingNeighbors.filter((cell) => {
            let alreadyAdded = false;
            if (
                deadCellsHashmap.has(
                    [cell.coordinates.x, cell.coordinates.y].toString()
                )
            ) {
                alreadyAdded = true;
            } else {
                deadCellsHashmap.set(
                    [cell.coordinates.x, cell.coordinates.y].toString(),
                    1
                );
            }

            return (
                this.countLivingNeighborsAt(cell.coordinates) === 3 &&
                !alreadyAdded
            );
        });

        // check living cells to see if any die
        this._livingCells = this._livingCells.filter((cell) => {
            const numberOfLivingNeighbors = this.countLivingNeighborsAt(
                cell.coordinates
            );
            return (
                numberOfLivingNeighbors === 2 || numberOfLivingNeighbors === 3
            );
        });

        this._livingCells.push(...newLivingCells);
    }

    getLivingNeighborsAt({ x, y }: { x: number; y: number }) {
        const livingNeighbors = new Array<Cell>();

        this._livingCells.forEach((cell) => {
            if (cell.coordinates.x === x && cell.coordinates.y === y) return;
            if (
                cell.coordinates.x >= x - 1 &&
                cell.coordinates.x <= x + 1 &&
                cell.coordinates.y >= y - 1 &&
                cell.coordinates.y <= y + 1
            ) {
                livingNeighbors.push(cell);
            }
        });

        return livingNeighbors;
    }

    getDeadNeighborsAt({ x, y }: { x: number; y: number }) {
        const livingNeighbors = this.getLivingNeighborsAt({ x, y });

        const coordsMap = new Map();

        // create a hashmap that has the coordinates of each living cell as keys (in string form)
        livingNeighbors.forEach((cell, i) => {
            const coords = [cell.coordinates.x, cell.coordinates.y].toString();
            coordsMap.set(coords, i);
        });

        const deadNeighbors = new Array<Cell>();

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i === x && j === y) continue;
                // check the combination of i and j to see if it's in the hashmap
                if (!coordsMap.has([i, j].toString())) {
                    deadNeighbors.push(new Cell(i, j));
                }
            }
        }

        return deadNeighbors;
    }
}
