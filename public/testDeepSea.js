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

function generateComplexWave(step) {
  const baseAmplitude = 15;
  const baseFrequency = 0.1;
  const pressureFactor = Math.log(step + 1) / 10;

  const amplitude1 = baseAmplitude / (1 + pressureFactor);
  const frequency1 = baseFrequency * (1 + pressureFactor);

  const amplitude2 = amplitude1 * 0.5;
  const frequency2 = frequency1 * 2;

  const amplitude3 = amplitude1 * 0.3;
  const frequency3 = frequency1 * 3;

  const wave = Math.floor(
      amplitude1 * Math.sin(step * frequency1) +
      amplitude2 * Math.sin(step * frequency2) +
      amplitude3 * Math.sin(step * frequency3) +
      baseAmplitude + 1
  );

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
  document.body.style.filter = 'brightness(1) blur(0px)';
}

function updateBackgroundBrightness(step) {
  const brightness = Math.max(1 - step * 0.01, 0.2);
  document.body.style.filter = `brightness(${brightness})`;
}

let textDisplayCounter = 0;
let textDisplay = true;

function evaluateMystery(mystery, step, interval, amplitude, frequency) {
  if (step % interval === 0) {
    ({ amplitude, frequency } = generateComplexWave(step));
  }

  updateBackgroundBrightness(step);

  const waveLength = generateComplexWave(step);
  const title = textDisplay ? 
    `should not encounter a Coelacanth at depth ${step + 1}` :
    (mystery instanceof DeepSea ? '~'.repeat(waveLength) : '𓆟');

  it(title, async () => {
    await sleep(10);

    if (!(mystery instanceof DeepSea)) {
      throw new Found();
    }
  });

  return { next: mystery.mystery, amplitude, frequency };
}

function exploreDepths(instance) {
  mocha.suite.suites = [];

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
  const mochaEl = document.getElementById('mocha');
  mochaEl.style.transition = 'opacity 1.0s ease-out';
  mochaEl.style.opacity = 0;
  mochaEl.addEventListener('transitionend', function onTransitionEnd() {
    mochaEl.removeEventListener('transitionend', onTransitionEnd);
    mochaEl.innerHTML = '';
    mochaEl.style.opacity = 0.8;
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
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
