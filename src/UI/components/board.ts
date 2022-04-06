import style from './board.module.css';

const boardContainer: HTMLDivElement = document.createElement('div');
const canvas: HTMLCanvasElement = document.createElement('canvas');

const numvar: number = 1;

boardContainer.classList.add(style.container);

const drawGrid = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, tileSize: number, highlightNum: number) => {
    for (let y = 0; y < canvas.width / tileSize; y++) {
      for (let x = 0; x < canvas.height / tileSize; x++) {
        const parity = (x + y) % 2;
        const tileNum = x + canvas.width / tileSize * y;
        const xx = x * tileSize;
        const yy = y * tileSize;
  
        if (tileNum === highlightNum) {
          ctx.fillStyle = "#f0f";
        }
        else {
          ctx.fillStyle = parity ? "#555" : "#ddd";
        }
        
        ctx.fillRect(xx, yy, tileSize, tileSize);
        ctx.fillStyle = parity ? "#fff" : "#000";
        ctx.fillText(tileNum.toString(), xx, yy);
      }
    }
  };

if (canvas.getContext) {
   
    const ctx = canvas.getContext('2d');
    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
    }
    
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            // create a 10x10 grid of squares
            ctx.strokeRect(i * 10, j * 10, 10, 10);
            

        }
    }
    
    
  } else {
    // canvas-unsupported code here
    console.log('canvas not supported');
  }

  boardContainer.appendChild(canvas);

export { boardContainer };
