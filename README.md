# Interactive World Map for Kids

This simple app displays a world map that children can explore. Clicking a country reveals its flag, capital, region, and population. A quiz mode challenges users with 20 random questions asking them to identify countries or match flags. Hovering over a country shows its name directly on the map.

## Features

- **Responsive SVG map** rendered with [D3.js](https://d3js.org/).
- Country data loaded from [restcountries.com](https://restcountries.com/).
- Flags served through [flagcdn.com](https://flagcdn.com/).
- Quiz mode keeps score out of 20 and mixes different question types.
- Hovering a country shows its name as a tooltip on the map.

## How to Run

To run locally:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. In the project folder, run:

   ```bash
   npx serve
