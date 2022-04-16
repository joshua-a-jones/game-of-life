import styles from './controls.module.css';

interface ControlsContainerProps {
    handleRunClick: () => void;
    handleStopClick: () => void;
    isRunning: boolean;
}

function ControlsContainer(props: ControlsContainerProps) {
    const { handleRunClick, handleStopClick, isRunning } = props;

    const controlsContainer = document.createElement('div');
    const runButton = document.createElement('button');
    const stopButton = document.createElement('button');

    runButton.innerText = 'Run';
    stopButton.innerText = 'Stop';

    runButton.className = styles.controlButton;
    stopButton.className = styles.controlButton;

    runButton.onclick = handleRunClick;
    stopButton.onclick = handleStopClick;

    if (isRunning) {
        runButton.disabled = true;
    } else {
        stopButton.disabled = true;
    }

    stopButton.disabled;
    controlsContainer.className = styles.container;

    controlsContainer.appendChild(runButton);
    controlsContainer.appendChild(stopButton);

    return controlsContainer;
}

export { ControlsContainer };
