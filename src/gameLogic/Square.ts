class Square {
    _isAlive: boolean;

    getStatus() {
        return this._isAlive;
    }

    updateStatus() {
        this._isAlive = !this._isAlive;
    }
}
