export default class Cell {
    private _x: number;
    private _y: number;

    // constructor. Default state of cell is dead.
    public constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getCoordinates() {
        return { x: this._x, y: this._y };
    }
}
