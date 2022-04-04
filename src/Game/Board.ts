class Board {
    private _dimensions: number;
    private _grid: Grid<Cell>;

    // constructor for square board
    public constructor(dimensions: number) {
        this._dimensions = dimensions;

        this._grid = new Grid<Cell>(dimensions, dimensions);
    }
}
