import style from './board.module.css';
import { Board } from 'src/Game/Board';

interface BoardContainerProps {
    Board: Board;
}

function BoardContainer(props: BoardContainerProps) {
    const { Board } = props;

    let initialX = 0;
    let initialY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let mouseXIndex = false;
    let mouseYIndex = false;
    let mouseTimeout: number;
    let mouseStatus = 'up';
    let cellSize = 50;

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
        clearTimeout(mouseTimeout);
        mouseStatus = 'down';
        initialX = e.clientX - canvas.getBoundingClientRect().left - offsetX;
        initialY = e.clientY - canvas.getBoundingClientRect().top - offsetY;
        mouseTimeout = window.setTimeout(function () {
            mouseStatus = 'longDown';
            document.addEventListener('mousemove', handleCoordinatesForRender);
        }, 75);
    });

    document.addEventListener('mouseup', (e) => {
        clearTimeout(mouseTimeout);
        mouseStatus = 'up';
        e.preventDefault;
        canvas.style.cursor = 'default';
        
        document.removeEventListener('mousemove', handleCoordinatesForRender);

        if ((!mouseXIndex || !mouseYIndex) && e.target === canvas) {
            handleCellClick(e);
        }

        mouseXIndex = false;
        mouseYIndex = false;
    });

    document.addEventListener('wheel', (e) => {
        const pointerX = e.clientX - canvas.getBoundingClientRect().left;
        const pointerY = e.clientY - canvas.getBoundingClientRect().top;
        const delta = e.deltaY;
        if (delta > 0) {
            zoomOut(pointerX, pointerY);
        } else {
            zoomIn(pointerX, pointerY);
        }
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

    function zoomOut(pointerX: number, pointerY: number) {
        if (cellSize > 20) {
            const pointerTranslateX = 0.8 * pointerX - pointerX;
            const pointerTranslateY = 0.8 * pointerY - pointerY;
            const newCellSize = cellSize * 0.8;
            const newOffsetX = offsetX * 0.8 - pointerTranslateX;
            const newOffsetY = offsetY * 0.8 - pointerTranslateY;
            cellSize = newCellSize;
            offsetX = newOffsetX;
            offsetY = newOffsetY;
            handleCanvasTransform(offsetX, offsetY);
        }
    }

    function zoomIn(pointerX: number, pointerY: number) {
        if (cellSize < 100) {
            const pointerTranslateX = 1.2 * pointerX - pointerX;
            const pointerTranslateY = 1.2 * pointerY - pointerY;
            const newCellSize = cellSize * 1.2;
            const newOffsetX = offsetX * 1.2 - pointerTranslateX;
            const newOffsetY = offsetY * 1.2 - pointerTranslateY;
            cellSize = newCellSize;
            offsetX = newOffsetX;
            offsetY = newOffsetY;
            handleCanvasTransform(offsetX, offsetY);
        }
    }

    return {
        boardContainer,
        handleRenderCanvas,
        getOffsets,
        handleClearCanvas,
    };
}

// function that accepts a Board object and renders the grid to the canvas

export { BoardContainer };
