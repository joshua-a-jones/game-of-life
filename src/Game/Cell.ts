class Cell {
    private _coordinates: { x: number; y: number };

    public constructor(x: number, y: number) {
        this._coordinates = { x, y };
    }

    public get coordinates() {
        return this._coordinates;
    }
}

export { Cell };
