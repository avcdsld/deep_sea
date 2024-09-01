document.addEventListener("DOMContentLoaded", initialize);

class Found extends Error {
  constructor(message = 'Coelacanth') {
    super(message);
    this.name = 'Found';
  }
}

function initialize() {
  weavePoem();
  prepareForLife();
  reflectOnSelf();
  addBubbles();
}

function weavePoem() {
  const container = document.getElementById('code-container');
  const code = document.getElementById('deepsea-code').innerText;
  const lines = code.split('\n');
  const highlightedCode = lines.map((line, index) => `<span id="line-${index}">${line}</span>`).join('\n');
  container.innerHTML = `<pre>${highlightedCode}</pre>`;
}

function prepareForLife() {
  mocha.setup({
    ui: 'bdd',
    slow: 1000,
    cleanReferencesAfterRun: false
  });
}

function generateDeepWave(step) {
  const baseAmplitude = 15;
  const baseFrequency = 0.1;
  const pressureFactor = Math.log(step + 1) / 10;

  const amplitude = baseAmplitude / (1 + pressureFactor);
  const frequency = baseFrequency * (1 + pressureFactor);

  return Math.floor(amplitude * Math.sin(step * frequency) + amplitude + 1);
}

let baseAmplitude;
let baseFrequency;
let amplitudeFactors;
let frequencyFactors;

function generateComplexWave(step) {
  const pressureFactor = Math.log(step + 1) / 10;

  const amplitude1 = baseAmplitude / (1 + pressureFactor);
  const frequency1 = baseFrequency * (1 + pressureFactor);

  const amplitude2 = amplitude1 * amplitudeFactors[0];
  const frequency2 = frequency1 * frequencyFactors[0];

  const amplitude3 = amplitude1 * amplitudeFactors[1];
  const frequency3 = frequency1 * frequencyFactors[1];

  const wave = Math.max(Math.floor(
    amplitude1 * Math.sin(step * frequency1) +
    amplitude2 * Math.sin(step * frequency2) +
    amplitude3 * Math.sin(step * frequency3) +
    baseAmplitude + 1
  ), 0);

  return wave;
}

function addBubbles() {
  const container = document.getElementById('container');
  for (let i = 0; i < 10; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() + 0.5}vw`;
    bubble.style.height = bubble.style.width;
    container.appendChild(bubble);
  }
}

function resetBrightness() {
  document.body.style.filter = 'brightness(1.2)';
}

function updateBackgroundBrightness(step) {
  const brightness = Math.max(1.2 - step * 0.001, 0.4);
  console.log(step, brightness);
  document.body.style.filter = `brightness(${brightness})`;
}

let textDisplayCounter = 0;
let textDisplay = true;

function evaluateMystery(mystery, step, interval, amplitude, frequency) {
  if (step % interval === 0) {
    ({ amplitude, frequency } = generateComplexWave(step));
  }

  const waveLength = generateComplexWave(step);
  const title = textDisplay ? 
    `should not encounter a Coelacanth at depth ${step + 1}` :
    (mystery instanceof DeepSea ? '~'.repeat(waveLength) : '𓆟');

  it(title, async () => {
    await sleep(10);
    updateBackgroundBrightness(step);

    if (!(mystery instanceof DeepSea)) {
      throw new Found();
    }
  });

  return { next: mystery.mystery, amplitude, frequency };
}

function exploreDepths(instance) {
  mocha.suite.suites = [];

  baseAmplitude = Math.random() * 6 + 10;
  baseFrequency = Math.random() * 0.05 + 0.1;
  amplitudeFactors = [Math.random(), Math.random()];
  frequencyFactors = [Math.random() * 5, Math.random() * 5];

  describe('', () => {
    let current = instance.mystery;
    let step = 0;
    const interval = 10;
    let { amplitude, frequency } = generateDeepWave(step);
    while (current) {
      const { next, amplitude: newAmp, frequency: newFreq } = evaluateMystery(current, step, interval, amplitude, frequency);
      current = next;
      amplitude = newAmp;
      frequency = newFreq;
      step++;
    }
  });
}

function fadeOutMocha(callback) {
  const mochaDiv = document.getElementById('mocha');
  mochaDiv.style.transition = 'opacity 1.0s ease-out';
  mochaDiv.style.opacity = 0;
  mochaDiv.addEventListener('transitionend', function onTransitionEnd() {
    mochaDiv.removeEventListener('transitionend', onTransitionEnd);
    mochaDiv.innerHTML = '';
    mochaDiv.style.opacity = 0.8;
    resetBrightness();
    callback();
  });
}

function reflectOnSelf() {
  resetBrightness();
  exploreDepths(new DeepSea());

  mocha.run().on('test end', function() {
    const mochaDiv = document.getElementById('mocha');
    mochaDiv.scrollTop = mochaDiv.scrollHeight;
  }).on('end', function() {
    textDisplayCounter = (textDisplayCounter + 1) % 4;
    textDisplay = textDisplayCounter === 0;
    setTimeout(() => {
      fadeOutMocha(() => {
        reflectOnSelf();
      });
    }, 4000);
    document.body.style.transition = 'filter 4.0s ease-out';
    document.body.style.filter = 'brightness(1.2)';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 4000);  
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
