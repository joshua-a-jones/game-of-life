import style from './board.module.css';
import Board from 'src/Game/Board';

const boardContainer = document.createElement('div');

// function that accepts a Board object and renders the grid to the canvas
function renderCanvas(board: Board) {
    const canvas = document.createElement('canvas');
    // canvas width is going to become dynamic based on window size, but setting it to a fixed value for now
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    canvas.classList.add(style.canvas);
    const cellSize = 50;

    // currently setting each cell to 50 pixels wide and tall but we can adjust later
    if (ctx) {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            for (let j = 0; j < canvas.height / cellSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
        board.getBoardState().forEach((cell) => {
            ctx.fillStyle = '#f000f0';
            ctx.fillRect(
                cell.coordinates.x * cellSize,
                cell.coordinates.y * cellSize,
                cellSize,
                cellSize
            );
        });
    }
    return canvas;
}

export { boardContainer, renderCanvas };
