class Board {
    _dimensions: number;
    _rows: Array<Row>;

    // constructor
    Board(dimensions: number) {
        this._dimensions = dimensions;
        this._rows = new Array<Row>(dimensions);
    }

    countLivingNeighborsOfSquareAt(x: number, y: number) {
        let numberOfLivingNeighbors = 0;

        // loop through all squares neighboring the square at x, y
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                numberOfLivingNeighbors += this._rows[j]
                    .getSquare(i)
                    ?.getStatus()
                    ? 1
                    : 0;
            }
        }

        // if the specified square is alive, the above loop would have counted it, so need to remove
        numberOfLivingNeighbors -= this._rows[y].getSquare(x).getStatus()
            ? 1
            : 0;

        return numberOfLivingNeighbors;
    }

    updateSquareStatus(square: Square, numberOfLivingNeighbors: number) {
        // code here for the rules of whether a square is alive or dead
    }

    updateStatusOfAllSquares() {
        // loop through all squares and set status based on number of living neighbors.
        for (let i = 0; i < this._dimensions; i++) {
            for (let j = 0; j < this._dimensions; j++) {
                const square = this._rows[j].getSquare(i);
                const numberOfLivingNeighbors =
                    this.countLivingNeighborsOfSquareAt(i, j);
                this.updateSquareStatus(square, numberOfLivingNeighbors);
            }
        }
    }
}
