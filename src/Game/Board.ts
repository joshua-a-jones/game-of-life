import Cell from './Cell';

export default class Board {
    private _xDim: number;
    private _yDim: number;
    private _cellMap: Map<string, Cell>;

    // _cells: Map();

    // the key of each cell is its coordinates (allows constant lookup time for any cell)
    // the value of each cell is 1 or 0 (alive or dead)
    // this will greatly speed up counting the living neighbors because we don't have to loop anymore

    // constructor for square board
    public constructor(xInitial: number, yInitial: number) {
        this._xDim = xInitial;
        this._yDim = yInitial;
        this._cellMap = new Map<string, Cell>();

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

        this._cellMap.set('1,2', new Cell(1, 2));
        this._cellMap.set('2,2', new Cell(2, 2));
        this._cellMap.set('3,2', new Cell(3, 2));
        this._cellMap.set('3,1', new Cell(3, 1));
        this._cellMap.set('2,0', new Cell(2, 0));
    }

    getBoardState() {
        //return this._livingCells;
        // return an array of the values of cellMap
        return Array.from(this._cellMap.values());
    }

    randomizeBoardState() {
        this._cellMap = new Map<string, Cell>();
        for (let i = 0; i < this._xDim; i++) {
            for (let j = 0; j < this._yDim; j++) {
                const rand = Math.floor(Math.random() * 2);
                if (rand > 0) {
                    this._cellMap.set(`${i},${j}`, new Cell(i, j));
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

        const newCellMap = new Map<string, Cell>();

        // we kill two birds with one stone here: we check each living cell to see if it dies, and we also
        // get the dead neighbors of each living cell and check to see if they come alive

        this._cellMap.forEach((livingCell) => {
            const livingNeighbors = this.countLivingNeighborsAt(
                livingCell.coordinates
            );

            if (livingNeighbors === 2 || livingNeighbors === 3) {
                newCellMap.set(
                    `${livingCell.coordinates.x},${livingCell.coordinates.y}`,
                    livingCell
                );
            }
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

        this._cellMap = newCellMap;
    }

    getLivingNeighborsAt({ x, y }: { x: number; y: number }) {
        const neighbors = [
            this._cellMap.get([x - 1, y].toString()),
            this._cellMap.get([x + 1, y].toString()),
            this._cellMap.get([x, y - 1].toString()),
            this._cellMap.get([x, y + 1].toString()),
            this._cellMap.get([x - 1, y - 1].toString()),
            this._cellMap.get([x - 1, y + 1].toString()),
            this._cellMap.get([x + 1, y - 1].toString()),
            this._cellMap.get([x + 1, y + 1].toString()),
        ];

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

        neighborCoords.forEach((coord) => {
            if (!this._cellMap.has(coord.toString()))
                deadNeighbors.push(new Cell(coord[0], coord[1]));
        });

        return deadNeighbors;
    }
}
