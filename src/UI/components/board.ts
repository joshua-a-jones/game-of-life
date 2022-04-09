import style from './board.module.css';
import Board from 'src/Game/Board';

interface BoardContainerProps {
    Board: Board;

}

function BoardContainer(props: BoardContainerProps) {
    let { Board } =
        props;

    let initialX = 0;
    let initialY = 0;
    let offsetX = 0;
    let offsetY = 0;

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
        canvas.style.cursor = 'grabbing';
        console.log(offsetX, offsetY);
        initialX = e.clientX - canvas.getBoundingClientRect().left - offsetX;
        initialY = e.clientY - canvas.getBoundingClientRect().top - offsetY;
        document.addEventListener('mousemove', handleCoordinatesForRender);
    });

    document.addEventListener('mouseup', (e) => {
        e.preventDefault;
        canvas.style.cursor = 'default';
      
        document.removeEventListener('mousemove', handleCoordinatesForRender);
    });

    function handleCoordinatesForRender(e: MouseEvent) {

        let canvasboundingrect = canvas.getBoundingClientRect();
        offsetX = e.clientX - canvasboundingrect.left - initialX;
        offsetY = e.clientY - canvasboundingrect.top - initialY;
    
        handleCanvasTransform(offsetX, offsetY);
    
    }

    function handleCanvasTransform(offsetX = 0, offsetY = 0) {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleRenderCanvas(50,offsetX,offsetY);
        }
        
    }

    function handleRenderCanvas(cellSize: number, offsetX: number, offsetY: number) {

        if (ctx) {
            for (let i = 0; i < canvas.width / cellSize; i++) {
                for (let j = 0; j < canvas.height / cellSize; j++) {
                    ctx.strokeRect(i * cellSize + offsetX, j * cellSize + offsetY, cellSize, cellSize);
                }
            }
            Board.getBoardState().forEach((cell) => {
                ctx.fillStyle = '#f000f0';
                ctx.fillRect(
                    offsetX + cell.coordinates.x*cellSize,
                    offsetY + cell.coordinates.y*cellSize,
                    cellSize,
                    cellSize
                );
            });
        }
    }

    return { boardContainer, handleRenderCanvas}
}





// function that accepts a Board object and renders the grid to the canvas



export { BoardContainer };
