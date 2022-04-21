import style from './board.module.css';
import { Board } from 'src/Game/Board';

interface BoardContainerProps {
    Board: Board;
    cellSize: number;
}

function BoardContainer(props: BoardContainerProps) {
    const { Board, cellSize } = props;

    let initialX = 0;
    let initialY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let mouseXIndex = false;
    let mouseYIndex = false;

    const boardContainer = document.createElement('div');
    boardContainer.setAttribute('id', 'boardContainer');
    boardContainer.classList.add(style.board);

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    canvas.classList.add(style.canvas);

    boardContainer.appendChild(canvas);

    canvas.addEventListener('mousedown', (e) => {
        e.preventDefault;

        initialX = e.clientX - canvas.getBoundingClientRect().left - offsetX;
        initialY = e.clientY - canvas.getBoundingClientRect().top - offsetY;
        document.addEventListener('mousemove', handleCoordinatesForRender);
    });

    document.addEventListener('mouseup', (e) => {
        e.preventDefault;
        canvas.style.cursor = 'default';

        document.removeEventListener('mousemove', handleCoordinatesForRender);

        if (!mouseXIndex || !mouseYIndex) {
            handleCellClick(e);
        }

        mouseXIndex = false;
        mouseYIndex = false;
    });

    function handleCoordinatesForRender(e: MouseEvent) {
        const canvasboundingrect = canvas.getBoundingClientRect();
        offsetX = e.clientX - canvasboundingrect.left - initialX;
        offsetY = e.clientY - canvasboundingrect.top - initialY;
        canvas.style.cursor = 'grabbing';
        handleCanvasTransform(offsetX, offsetY);

        mouseXIndex = true;
        mouseYIndex = true;
    }

    function handleCanvasTransform(offsetX = 0, offsetY = 0) {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleRenderCanvas(offsetX, offsetY);
        }
    }

    function handleRenderCanvas(offsetX: number, offsetY: number) {
        if (ctx) {
            for (
                let i = 0 - Math.floor(offsetX / cellSize);
                i < Math.floor((canvas.width - offsetX) / cellSize);
                i++
            ) {
                for (
                    let j = 0 - Math.floor(offsetY / cellSize);
                    j < Math.floor((canvas.height - offsetY) / cellSize);
                    j++
                ) {
                    ctx.strokeRect(
                        i * cellSize + offsetX,
                        j * cellSize + offsetY,
                        cellSize,
                        cellSize
                    );
                }
            }
            Board.getBoardState().forEach((cell) => {
                ctx.fillStyle = '#f000f0';
                ctx.fillRect(
                    offsetX + cell.coordinates.x * cellSize,
                    offsetY + cell.coordinates.y * cellSize,
                    cellSize,
                    cellSize
                );
            });
        }
    }

    function handleClearCanvas(offsetX: number, offsetY: number) {
        if (ctx) {
            for (
                let i = 0 - Math.floor(offsetX / cellSize);
                i < Math.floor((canvas.width - offsetX) / cellSize);
                i++
            ) {
                for (
                    let j = 0 - Math.floor(offsetY / cellSize);
                    j < Math.floor((canvas.height - offsetY) / cellSize);
                    j++
                ) {
                    ctx.clearRect(
                        i * cellSize + offsetX,
                        j * cellSize + offsetY,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }

    function handleConvertClickToCellCoordinates(e: MouseEvent) {
        const Xcoordinate =
            e.clientX - canvas.getBoundingClientRect().left - offsetX;
        const Ycoordinate =
            e.clientY - canvas.getBoundingClientRect().top - offsetY;

        const x = Math.floor(Xcoordinate / cellSize);
        const y = Math.floor(Ycoordinate / cellSize);

        return { x, y };
    }

    function handleCellClick(e: MouseEvent) {
        const cellcoordinates = handleConvertClickToCellCoordinates(e);
        if (
            Board.getBoardState().find(
                (cell) =>
                    cell.coordinates.x === cellcoordinates.x &&
                    cell.coordinates.y === cellcoordinates.y
            )
        ) {
            Board.removeCellAt(cellcoordinates.x, cellcoordinates.y);
            handleClearCanvas(offsetX, offsetY);
        } else {
            Board.addCellAt(cellcoordinates.x, cellcoordinates.y);
        }
        handleRenderCanvas(offsetX, offsetY);
    }

    function getOffsets() {
        return { offsetX, offsetY };
    }

    return { boardContainer, handleRenderCanvas, getOffsets, handleClearCanvas };
}

// function that accepts a Board object and renders the grid to the canvas

export { BoardContainer };
