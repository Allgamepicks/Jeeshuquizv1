
This project now includes multiple learning activities for kids. The original world map lets children explore countries and flags. Additional pages offer a math quiz, an English spelling game with pictures, and a beginner Hindi quiz.

## Features

- **Responsive SVG map** rendered with [D3.js](https://d3js.org/).
- Country data loaded from [restcountries.com](https://restcountries.com/).
- Flags served through [flagcdn.com](https://flagcdn.com/).
- Quiz mode keeps score out of 20 and mixes different question types.
- Hovering a country shows its name as a tooltip on the map.
- Separate math, spelling, and Hindi quizzes accessible from the home page.
- Consistent Arial-based font across desktop and mobile.

To run locally, serve the files with any simple HTTP server (for example `npx serve`) and open `index.html` in a modern browser with internet access. Directly opening the file may block network requests in some browsers.
If the app cannot reach the country API, an error message is shown below the map.

This project includes multiple learning activities for kids. The original interactive world map lets children explore countries and flags. Two additional pages offer a quick math quiz and a simple English spelling game with pictures.


- 🌍 **Interactive world map** rendered using [D3.js](https://d3js.org/)
- 📡 Country data loaded from [restcountries.com](https://restcountries.com/)
- 🚩 Flags served from [flagcdn.com](https://flagcdn.com/)
- 🎯 Quiz mode with 20 randomized questions (identify countries or match flags)
- 🖱️ Hovering over a country shows its name as a tooltip
- ➕ Includes separate **Math** and **Spelling** quiz pages accessible from the home page


> ⚠️ Opening `index.html` directly may block network requests due to browser security. Always use a local server.


1. Install [Node.js](https://nodejs.org/) (if not already)
2. In the project folder, run:

   ```bash
   npx serve
