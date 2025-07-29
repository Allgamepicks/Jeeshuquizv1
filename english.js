const words = [
  {
    word: 'apple',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
    options: ['apple', 'aple', 'appel', 'aplpe']
  },
  {
    word: 'banana',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',
    options: ['bananna', 'banana', 'bannana', 'banan']
  },
  {
    word: 'car',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Red_car.svg',
    options: ['carr', 'kar', 'car', 'carr']
  }
];
let score = 0;
let index = 0;

function nextWord() {
  if (index >= 20) {
    alert(`Quiz over! You scored ${score} out of 20.`);
    return;
  }
  const item = words[Math.floor(Math.random() * words.length)];
  const img = document.getElementById('english-image');
  img.src = item.img;
  img.alt = item.word;
  const optionsDiv = document.getElementById('english-options');
  optionsDiv.innerHTML = '';
  shuffle(item.options).forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt === item.word);
    optionsDiv.appendChild(btn);
  });
  document.getElementById('english-score').textContent = `Score: ${score} / 20`;
  index++;
}

function handleAnswer(correct) {
  if (correct) {
    alert('Correct!');
    score++;
  } else {
    alert('Try again!');
  }
  nextWord();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', nextWord);
} else {
  nextWord();
}
