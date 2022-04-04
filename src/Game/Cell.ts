class Cell {
    private _isAlive: boolean;

    // constructor. Default state of cell is dead.
    public constructor(isAlive?: boolean) {
        this._isAlive = isAlive ?? false;
    }

    getStatus() {
        return this._isAlive;
    }

    updateStatus() {
        this._isAlive = !this._isAlive;
    }
}
