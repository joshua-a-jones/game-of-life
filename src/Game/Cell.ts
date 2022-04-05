export default class Cell {
    private _isAlive: boolean;

    // constructor. Default state of cell is dead.
    public constructor(isAlive = false) {
        this._isAlive = isAlive;
    }

    public get getStatus() {
        return this._isAlive;
    }

    public set updateStatus(isAlive: boolean) {
        this._isAlive = isAlive;
    }
}
