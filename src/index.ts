import { boardContainer } from './UI/components/board';
import { ControlsContainer } from './UI/components/controls';

let isRunning = false;

renderApp();
//test

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
