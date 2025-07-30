const letters = [
  { char: 'क', translit: 'ka' },
  { char: 'ख', translit: 'kha' },
  { char: 'ग', translit: 'ga' },
  { char: 'च', translit: 'cha' },
  { char: 'ज', translit: 'ja' }
];

let score = 0;
let asked = 0;

function nextHindi() {
  if (asked >= 20) {
    alert(`Quiz over! You scored ${score} out of 20.`);
    return;
  }
  const item = letters[Math.floor(Math.random() * letters.length)];
  const qEl = document.getElementById('hindi-question');
  qEl.textContent = `What sound does \"${item.char}\" make?`;

  const optionsDiv = document.getElementById('hindi-options');
  optionsDiv.innerHTML = '';
  let options = [item.translit];
  while (options.length < 4) {
    const opt = letters[Math.floor(Math.random() * letters.length)].translit;
    if (!options.includes(opt)) options.push(opt);
  }
  shuffle(options).forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => handleHindi(opt === item.translit);
    optionsDiv.appendChild(btn);
  });
  document.getElementById('hindi-score').textContent = `Score: ${score} / 20`;
  asked++;
}

function handleHindi(correct) {
  if (correct) {
    score++;
    alert('Correct!');
  } else {
    alert('Try again!');
  }
  nextHindi();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', nextHindi);
} else {
  nextHindi();
}
