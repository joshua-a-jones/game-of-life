class Row {
    _squares: Array<Square>;

    Row(dimensions: number) {
        this._squares = new Array<Square>(dimensions);
    }

    getSquare(index: number): Square | null {
        return index < this._squares.length ? this._squares[index] : null;
    }

    upDateSquare(index: number) {
        if (index < this._squares.length) {
            this._squares[index].updateStatus();
        }
    }
}
