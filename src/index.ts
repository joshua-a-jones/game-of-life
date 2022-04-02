import { boardContainer } from './board';
import { controlsContainer } from './controls';

const app = document.getElementById('app');

if (app) {
    app.appendChild(boardContainer);
    app.appendChild(controlsContainer);
}
