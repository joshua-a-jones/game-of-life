import styles from './controls.module.css';

interface ControlsContainerProps {
    handleRunClick: () => void;
    handleStopClick: () => void;
    onGenerationsInputChange: (value: number) => void;
}

function ControlsContainer(props: ControlsContainerProps) {
    const { handleRunClick, handleStopClick, onGenerationsInputChange } = props;

    const controlsContainer = document.createElement('div');
    const runButton = document.createElement('button');
    const stopButton = document.createElement('button');
    const generationsInput = document.createElement('input');
    const iterationsInputLabel = document.createElement('label');

    runButton.innerText = 'Run';
    stopButton.innerText = 'Stop';
    iterationsInputLabel.innerText = 'Number of generations:';

    runButton.className = styles.controlButton;
    stopButton.className = styles.controlButton;
    generationsInput.className = styles.numberInput;

    generationsInput.id = 'iterations-input';
    generationsInput.type = 'number';
    generationsInput.value = '200';
    generationsInput.min = '1';

    iterationsInputLabel.htmlFor = 'iterations-input';

    runButton.onclick = handleRunClick;
    stopButton.onclick = handleStopClick;
    generationsInput.onchange = (e) =>
        onGenerationsInputChange(
            parseInt((e.currentTarget as HTMLInputElement).value)
        );

    stopButton.disabled;
    controlsContainer.className = styles.container;

    controlsContainer.appendChild(runButton);
    controlsContainer.appendChild(stopButton);
    controlsContainer.appendChild(iterationsInputLabel);
    controlsContainer.appendChild(generationsInput);

    return controlsContainer;
}

export { ControlsContainer };
