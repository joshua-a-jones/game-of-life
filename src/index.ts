import { boardContainer } from './components/board';
import { ControlsContainer } from './components/controls';

let isRunning = false;

renderApp();

function handleButtonClick() {
    isRunning = !isRunning;
    renderApp();
}

function renderApp() {
    const app = document.getElementById('app')!;
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
}
