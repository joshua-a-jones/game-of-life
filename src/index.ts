import { boardContainer } from './components/board';
import { controlsContainer } from './components/controls';

const app = document.getElementById('app')!;

app.appendChild(boardContainer);
app.appendChild(controlsContainer);
