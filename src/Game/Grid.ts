export default class Grid<T> {
    private _columns: number;
    private _rows: number;
    private _grid: Array<Array<T>>;

    public constructor(columns: number, rows: number) {
        this._columns = columns;
        this._rows = rows;

        const grid = new Array<Array<T>>(columns);

        for (let i = 0; i < columns; i++) {
            grid[i] = new Array<T>(rows);
        }

        this._grid = grid;
    }

    public setElementAt(x: number, y: number, obj: T) {
        if (x < this._columns && y < this._rows) {
            this._grid[x][y] = obj;
        }
    }

    public getElementAt(x: number, y: number): T | null {
        return x > 0 && x < this._columns && y > 0 && y < this._rows
            ? this._grid[x][y]
            : null;
    }
}
