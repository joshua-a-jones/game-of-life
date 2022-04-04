import styles from './controls.module.css';

interface ControlsContainerProps {
    handleRunClick: () => void;
    handleRandomizeClick: () => void;
    handleStopClick: () => void;
    isRunning: boolean;
}

function ControlsContainer(props: ControlsContainerProps) {
    const { handleRunClick, handleRandomizeClick, handleStopClick, isRunning } =
        props;

    const controlsContainer = document.createElement('div');
    const randomizeButton = document.createElement('button');
    const runButton = document.createElement('button');
    const stopButton = document.createElement('button');

    randomizeButton.innerText = 'Randomize Board';
    runButton.innerText = 'Run';
    stopButton.innerText = 'Stop';

    randomizeButton.className = styles.controlButton;
    runButton.className = styles.controlButton;
    stopButton.className = styles.controlButton;

    randomizeButton.onclick = handleRandomizeClick;
    runButton.onclick = handleRunClick;
    stopButton.onclick = handleStopClick;

    if (isRunning) {
        randomizeButton.disabled = true;
        runButton.disabled = true;
    } else {
        stopButton.disabled = true;
    }

    stopButton.disabled;
    controlsContainer.className = styles.container;

    controlsContainer.appendChild(randomizeButton);
    controlsContainer.appendChild(runButton);
    controlsContainer.appendChild(stopButton);

    return controlsContainer;
}

export { ControlsContainer };
