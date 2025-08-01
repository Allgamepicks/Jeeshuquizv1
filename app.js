// Interactive world map app for kids
let countriesData = [];
let countryByIso2 = {};
let countryByIso3 = {};
let countryByNum = {};
let quizMode = false;
let currentQuiz = null;
let score = 0;
let questionsAsked = 0;
let dataLoaded = false;

async function init() {
  // Load data first so clicking works immediately once map appears
  await loadCountries();
  await loadMap();
  // Load both in parallel for faster startup
  await Promise.all([loadCountries(), loadMap()]);
  document.getElementById('quizBtn').onclick = startQuizMode;
  document.getElementById('quiz-exit').onclick = exitQuizMode;
}

async function loadCountries() {
  // request only the fields we need to avoid a large payload
=======
  const url = 'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,ccn3,capital,region,population';
  let data;
  try {
    const res = await fetch(url);
    data = await res.json();
    dataLoaded = true;
    document.getElementById('error').classList.add('hidden');
  } catch (err) {
    console.error('Failed to load country data', err);
    document.getElementById('error').textContent = 'Failed to load country data.';
    document.getElementById('error').classList.remove('hidden');
    return;
  }


  countriesData = data.map(c => {
    const obj = {
      id: c.cca3,
      name: c.name.common,
      flag: `https://flagcdn.com/w80/${c.cca2.toLowerCase()}.png`,
      capital: c.capital ? c.capital[0] : 'N/A',
      region: c.region,
      population: c.population,
      cca2: c.cca2,
      cca3: c.cca3,
      ccn3: c.ccn3
    };
    countryByIso2[obj.cca2] = obj;
    countryByIso3[obj.cca3] = obj;
    if (obj.ccn3) countryByNum[obj.ccn3] = obj;
    return obj;
  });
}

async function loadMap() {
  let geoData;
  try {
    geoData = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
  } catch (err) {
    console.error('Failed to load map data', err);
    document.getElementById('error').textContent = 'Failed to load map.';
    document.getElementById('error').classList.remove('hidden');
    return;
  }

  const width = Math.min(1200, window.innerWidth * 0.95);
  const height = width * 0.55;
  const projection = d3.geoNaturalEarth1().fitSize([width, height], geoData);
  const path = d3.geoPath().projection(projection);

  const svg = d3.select('#map-container')
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid');

  svg.selectAll('path')
    .data(geoData.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('id', d => d.id)
    .attr('class', 'country')
    .on('click', (event, d) => {
      const country = countryByIso3[d.id] || countryByIso2[d.id] || countryByNum[d.id];
      if (country) {
        if (!quizMode) showCountryInfo(country, event.target);
        else handleQuizClick(country);
      }
    })
    .on('mouseover', (event, d) => {
      const country = countryByIso3[d.id] || countryByIso2[d.id] || countryByNum[d.id];
      if (country) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = country.name;
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = event.pageY + 'px';
        tooltip.classList.remove('hidden');
      }
    })
    .on('mousemove', (event) => {
      const tooltip = document.getElementById('tooltip');
      tooltip.style.left = event.pageX + 'px';
      tooltip.style.top = event.pageY + 'px';
    })
    .on('mouseout', () => {
      document.getElementById('tooltip').classList.add('hidden');
    });
}

function showCountryInfo(country, el) {
  if (!dataLoaded) return;
  document.getElementById('info-panel').classList.remove('hidden');
  document.getElementById('quiz-panel').classList.add('hidden');
  document.getElementById('country-name').textContent = country.name;
  document.getElementById('country-flag').src = country.flag;
  document.getElementById('country-flag').alt = `${country.name} flag`;
  document.getElementById('country-fact').textContent =
    `Capital: ${country.capital}\nRegion: ${country.region}\nPopulation: ${country.population.toLocaleString()}`;
  document.querySelectorAll('.country').forEach(el => el.classList.remove('selected'));
  if (el) el.classList.add('selected');
}

function startQuizMode() {
  if (!dataLoaded) {
    alert('Country data not loaded. Check your internet connection.');
    return;
  }
  quizMode = true;
  score = 0;
  questionsAsked = 0;
  document.getElementById('quiz-score').textContent = '';
  document.getElementById('info-panel').classList.add('hidden');
  document.getElementById('quiz-panel').classList.remove('hidden');
  nextQuiz();
}

function exitQuizMode() {
  quizMode = false;
  currentQuiz = null;
  document.getElementById('quiz-panel').classList.add('hidden');
  document.getElementById('info-panel').classList.add('hidden');
  document.querySelectorAll('.country').forEach(el => el.classList.remove('selected'));
}

function nextQuiz() {
  if (!dataLoaded || countriesData.length === 0) {
    alert('Country data not loaded. Quiz unavailable.');
    exitQuizMode();
    return;
  }

  const quizTypes = ['find-country', 'find-flag'];
  const type = quizTypes[Math.floor(Math.random() * quizTypes.length)];
  if (type === 'find-country') quizFindCountry();
  else quizFindFlag();
}

function quizFindCountry() {
  const country = countriesData[Math.floor(Math.random() * countriesData.length)];
  currentQuiz = { type: 'find-country', answer: country.id };
  document.getElementById('quiz-question').textContent = `Click on ${country.name}`;
  document.getElementById('quiz-options').innerHTML = '';
}

function quizFindFlag() {
  const country = countriesData[Math.floor(Math.random() * countriesData.length)];
  currentQuiz = { type: 'find-flag', answer: country.id };
  document.getElementById('quiz-question').textContent = 'Which country has this flag?';
  document.getElementById('quiz-options').innerHTML = `<img src="${country.flag}" alt="Flag" style="width:80px;height:50px;">`;

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
    score++;
    alert('🎉 Correct!');
  } else {
    alert('❌ Try again!');
  }
  questionsAsked++;
  document.getElementById('quiz-score').textContent = `Score: ${score} / 20`;
  if (questionsAsked >= 20) {
    alert(`Quiz over! You scored ${score} out of 20.`);
    exitQuizMode();
  } else {
    nextQuiz();
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
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
