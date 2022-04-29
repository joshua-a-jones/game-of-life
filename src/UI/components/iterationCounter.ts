function IterationCounter(maxIterations: number) {
    const counter = document.createElement('p');
    counter.id = 'iteration-counter';
    counter.innerText = `Generation 0 of ${maxIterations}`;

    return counter;
}

function updateIterationCount(currentIteration: number, maxIterations: number) {
    const counter = document.getElementById('iteration-counter');

    if (counter != null) {
        counter.innerText = `Generation ${currentIteration} of ${maxIterations}`;
    }
}

export { IterationCounter, updateIterationCount };
