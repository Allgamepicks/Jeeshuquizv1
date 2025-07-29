# Interactive World Map for Kids

This simple app displays a world map that children can explore. Clicking a country reveals its flag, capital, region and population. A quiz mode challenges users with 20 random questions asking them to identify countries or match flags. Hovering over a country shows its name directly on the map.

## Features

- **Responsive SVG map** rendered with [D3.js](https://d3js.org/).
- Country data loaded from [restcountries.com](https://restcountries.com/).
- Flags served through [flagcdn.com](https://flagcdn.com/).
- Quiz mode keeps score out of 20 and mixes different question types.
- Hovering a country shows its name as a tooltip on the map.

To run locally, serve the files with any simple HTTP server (for example `npx serve`) and open `index.html` in a modern browser with internet access. Directly opening the file may block network requests in some browsers.
If the app cannot reach the country API, an error message is shown below the map.
