import { boardContainer } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';
import './globalStyles.css';
let isRunning = false;

renderApp();
//test

function handleButtonClick() {
    isRunning = !isRunning;
    renderApp();
}

function renderApp() {
    const app = document.getElementById('app');
    if (app !== null) {
        while (app.firstChild) {
            app.removeChild(app.firstChild);
        }

        app.appendChild(
            ControlsContainer({
                handleRunClick: handleButtonClick,
                handleRandomizeClick: handleButtonClick,
                handleStopClick: handleButtonClick,
                isRunning,
            })
        );
        app.appendChild(boardContainer);
    } else {
        throw new Error('App element could not be found in index.html');
    }
}
