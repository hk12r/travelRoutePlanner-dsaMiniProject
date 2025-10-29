# Travel Route Planner (India) — DSA Mini Project

Plan optimal intercity routes across India using graph algorithms. Core logic is implemented in C (console app) with an optional browser-based visualization using vanilla JavaScript, HTML, and CSS.

## Features
- Graph of 20 major Indian cities and realistic intercity routes
- Algorithms: Dijkstra’s, A*, BFS, DFS
- Optimization criteria: distance (km), time (hours), cost (₹)
- Transportation modes: Train, Bus, Flight
- Console-based planner and interactive web visualization

## Tech Stack
- C (C11) for algorithms and data structures
- HTML, CSS, and vanilla JavaScript for frontend visualization
- Makefile and batch script for builds

## Project Structure (key files)
- C: main.c, graph.c, algorithms.c, data.c, graph.h
- Web: index.html, styles.css, graph.js, algorithms.js, data.js, visualization.js, app.js
- Build: Makefile, build.bat
- Extras: travel_planner_single_file.c (single-file version)

## Build and Run (Console App)
Prerequisites: GCC with C11 support, math library (-lm)

Windows:
1. Double-click build.bat or run in PowerShell:
   - ./build.bat
2. Run executable:
   - ./travel_planner.exe

Linux/macOS:
1. make
2. ./travel_planner
3. make clean (remove artifacts)

## Console Usage
Menu:
1. Find Route Between Cities
2. Display All Cities
3. Display Graph Information
4. Test All Algorithms
5. Exit

Find Route:
- Enter city IDs (e.g., del, mum, blr)
- Choose algorithm (Dijkstra, A*, BFS, DFS)
- For Dijkstra/A*: choose optimization (distance, time, cost)
- Results: path, total distance, total time, total cost

City IDs:
- del, mum, blr, hyd, chen, kol, ahm, pune, jaipur, luck, kochi, goa, chand, indore, bhopal, nagpur, vizag, surat, varanasi, amritsar

## Web Visualization
- Open index.html in a modern browser
- Select start/destination, algorithm, optimization
- Click “Find Route” to see:
  - Highlighted path
  - Total distance, time, cost
  - Per-leg details with mode (Train/Bus/Flight)

## Notes
- Costs are in Indian Rupees (₹)
- Graph is undirected by default
- Algorithms can be tested across any city pair via the menu

## License
Educational use for data structures and algorithms learning.
