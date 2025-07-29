let score = 0;
let questions = 0;

function nextQuestion() {
  const a = Math.floor(Math.random() * 900) + 100;
  const b = Math.floor(Math.random() * 900) + 100;
  const op = Math.random() < 0.5 ? '+' : '-';
  const values = op === '-' && b > a ? [b, a] : [a, b];
  const answer = op === '+' ? a + b : values[0] - values[1];
  const questionEl = document.getElementById('math-question');
  const displayA = op === '-' ? values[0] : a;
  const displayB = op === '-' ? values[1] : b;
  questionEl.textContent = `${displayA} ${op} ${displayB} = ?`;

  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const op = Math.random() < 0.5 ? '+' : '-';
  const answer = op === '+' ? a + b : a - b;
  const questionEl = document.getElementById('math-question');
  questionEl.textContent = `${a} ${op} ${b} = ?`;

  const optionsDiv = document.getElementById('math-options');
  optionsDiv.innerHTML = '';
  const options = [answer];
  while (options.length < 4) {
    let val = answer + Math.floor(Math.random() * 101) - 50;
    let val = answer + Math.floor(Math.random() * 5) - 2;
    if (!options.includes(val)) options.push(val);
  }
  shuffle(options).forEach(v => {
    const btn = document.createElement('button');
    btn.textContent = v;
    btn.onclick = () => handleAnswer(v === answer);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(correct) {
  if (correct) alert('Correct!');
  else alert('Try again!');
  if (correct) score++;
  questions++;
  document.getElementById('math-score').textContent = `Score: ${score} / 20`;
  if (questions >= 20) {
    alert(`Quiz over! You scored ${score} out of 20.`);
  } else {
    nextQuestion();
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', nextQuestion);
} else {
  nextQuestion();
}
