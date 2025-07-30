# Interactive World Map for Kids

This project now includes multiple learning activities for kids. The original world map lets children explore countries and flags. Additional pages offer a math quiz, an English spelling game with pictures, and a beginner Hindi quiz.

## Features

- **Responsive SVG map** rendered with [D3.js](https://d3js.org/).
- Country data loaded from [restcountries.com](https://restcountries.com/).
- Flags served through [flagcdn.com](https://flagcdn.com/).
- Quiz mode keeps score out of 20 and mixes different question types.
- Hovering a country shows its name as a tooltip on the map.
- Separate math, spelling, and Hindi quizzes accessible from the home page.
- `index.html` links to the learning activities. Open `map.html` to view the interactive world map.
- Consistent Arial-based font across desktop and mobile.

To run locally, serve the files with any simple HTTP server (for example `npx serve`) and open `index.html` in a modern browser with internet access. Directly opening the file may block network requests in some browsers.
If the app cannot reach the country API, an error message is shown below the map.
