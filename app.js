// Main JS for interactive world map for kids
let countriesData = [];
let quizMode = false;
let currentQuiz = null;

// Load map SVG and country data
async function init() {
  const mapRes = await fetch('world_map.svg');
  const mapSvg = await mapRes.text();
  document.getElementById('map-container').innerHTML = mapSvg;

  const dataRes = await fetch('countries.json');
  countriesData = await dataRes.json();

  setupMap();
  document.getElementById('quizBtn').onclick = startQuizMode;
  document.getElementById('quiz-exit').onclick = exitQuizMode;
}

function setupMap() {
  const svg = document.querySelector('#map-container svg');
  if (!svg) return;
  countriesData.forEach(country => {
    const el = svg.getElementById(country.id);
    if (el) {
      el.classList.add('country');
      el.addEventListener('click', () => {
        if (!quizMode) showCountryInfo(country);
        else handleQuizClick(country);
      });
    }
  });
}

function showCountryInfo(country) {
  document.getElementById('info-panel').classList.remove('hidden');
  document.getElementById('quiz-panel').classList.add('hidden');
  document.getElementById('country-name').textContent = country.name;
  document.getElementById('country-flag').src = country.flag;
  document.getElementById('country-flag').alt = country.name + ' flag';
  document.getElementById('country-fact').textContent = country.fact || '';
  // Highlight selected
  document.querySelectorAll('.country').forEach(el => el.classList.remove('selected'));
  const svg = document.querySelector('#map-container svg');
  const el = svg.getElementById(country.id);
  if (el) el.classList.add('selected');
}

function startQuizMode() {
  quizMode = true;
  document.getElementById('info-panel').classList.add('hidden');
  document.getElementById('quiz-panel').classList.remove('hidden');
  nextQuiz();
}

function exitQuizMode() {
  quizMode = false;
  document.getElementById('quiz-panel').classList.add('hidden');
  document.getElementById('info-panel').classList.add('hidden');
  document.querySelectorAll('.country').forEach(el => el.classList.remove('selected'));
}

function nextQuiz() {
  // Randomly pick a quiz type
  const quizTypes = ['find-country', 'find-flag'];
  const type = quizTypes[Math.floor(Math.random() * quizTypes.length)];
  if (type === 'find-country') quizFindCountry();
  else quizFindFlag();
}

function quizFindCountry() {
  // Ask: Click on [Country]
  const country = countriesData[Math.floor(Math.random() * countriesData.length)];
  currentQuiz = { type: 'find-country', answer: country.id };
  document.getElementById('quiz-question').textContent = `Click on ${country.name}`;
  document.getElementById('quiz-options').innerHTML = '';
}

function quizFindFlag() {
  // Show a flag, ask: Which country is this?
  const country = countriesData[Math.floor(Math.random() * countriesData.length)];
  currentQuiz = { type: 'find-flag', answer: country.id };
  document.getElementById('quiz-question').textContent = 'Which country is this flag?';
  document.getElementById('quiz-options').innerHTML = `<img src="${country.flag}" alt="Flag" style="width:80px;height:50px;">`;
  // Show 3 options
  let options = [country];
  while (options.length < 3) {
    const c = countriesData[Math.floor(Math.random() * countriesData.length)];
    if (!options.find(o => o.id === c.id)) options.push(c);
  }
  options = shuffle(options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.name;
    btn.onclick = () => handleQuizClick(opt);
    document.getElementById('quiz-options').appendChild(btn);
  });
}

function handleQuizClick(country) {
  if (!currentQuiz) return;
  if (currentQuiz.answer === country.id) {
    alert('🎉 Correct!');
    nextQuiz();
  } else {
    alert('❌ Try again!');
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

document.addEventListener('DOMContentLoaded', init);
