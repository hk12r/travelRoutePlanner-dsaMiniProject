# Travel Route Planner — Documentation

This document provides deeper technical details: architecture, data structures, algorithms, and module responsibilities.

## 1. Architecture Overview
- Core (C):
  - Graph data structures (nodes: cities; edges: routes)
  - Pathfinding implementations (Dijkstra, A*, BFS, DFS)
  - Console UI for interaction
- Frontend (Web):
  - Visualization of cities and routes in the browser
  - Interactive route computation using JavaScript-only modules
- Build:
  - Makefile (Unix-like) and build.bat (Windows) compile the C program

## 2. Data Model (C)
City (struct City):
- id: short code (e.g., "del")
- name: full city name
- latitude, longitude: geographical coordinates
- x, y: visualization helpers

Route (struct AdjNode via adjacency list):
- cityIndex: destination city index
- distance: km
- time: hours (double)
- cost: rupees (₹)
- mode: Train, Bus, or Flight

Graph (struct Graph):
- cities[MAX_CITIES]
- adjList[MAX_CITIES] (AdjNode*)
- numCities, numRoutes
- isDirected (default: false)

PathResult:
- path[] (indices), pathLength
- totalDistance (km), totalTime (hours), totalCost (₹)
- algorithm (label string)

Limits:
- MAX_CITIES = 50
- MAX_ROUTES = 200
- INFINITY_DIST = 999999 (internal sentinel for unreachable)

## 3. Public C API (graph.h)
Graph operations:
- Graph* createGraph(bool isDirected)
- void destroyGraph(Graph* graph)
- int addCity(Graph* graph, const char* id, const char* name, double lat, double lon)
- int addRoute(Graph* graph, const char* from, const char* to, int distance, double time, int cost, const char* mode)
- int findCityIndex(Graph* graph, const char* id)
- void printGraph(Graph* graph)
- int getNodeCount(Graph* graph)
- int getEdgeCount(Graph* graph)

Pathfinding:
- PathResult* dijkstra(Graph* graph, const char* startId, const char* endId, const char* weightType)
- PathResult* aStar(Graph* graph, const char* startId, const char* endId, const char* weightType)
- PathResult* bfs(Graph* graph, const char* startId, const char* endId)
- PathResult* dfs(Graph* graph, const char* startId, const char* endId)

Helpers:
- double calculateHeuristic(Graph* graph, int fromIndex, int toIndex)  // used by A*
- int getWeight(AdjNode* node, const char* weightType)                 // "distance" | "time" | "cost"
- void printPath(Graph* graph, PathResult* result)
- void destroyPathResult(PathResult* result)

## 4. Algorithms
Dijkstra:
- Optimal shortest path in weighted graphs
- weightType controls objective: distance/time/cost
- Priority queue (min-heap via sorted list) on cumulative weight

A*:
- Dijkstra + heuristic
- Heuristic based on straight-line proximity (from lat/lon)
- Faster for large graphs; remains optimal if heuristic is admissible

BFS:
- Unweighted traversal
- Minimizes number of stops (hops), ignores weights
- Useful for simple connectivity/path existence

DFS:
- Depth-first traversal
- Finds any path (not necessarily optimal)
- Useful for exploration/testing

Metrics:
- All algorithms accumulate per-edge metrics (distance/time/cost) along the returned path
- PathResult includes totalDistance, totalTime, totalCost

## 5. Sample Data
Cities:
- 20 major Indian cities with coordinates (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune, Jaipur, Lucknow, Kochi, Goa, Chandigarh, Indore, Bhopal, Nagpur, Visakhapatnam, Surat, Varanasi, Amritsar)

Routes:
- Realistic intercity connections with:
  - Distance (km)
  - Time (hrs)
  - Cost (₹)
  - Mode (Train/Bus/Flight)
- Graph is undirected; routes are added in one direction and treated bidirectionally internally for traversal

## 6. Console Application Flow (main.c)
Menu:
- Find Route Between Cities
- Display All Cities
- Display Graph Information
- Test All Algorithms
- Exit

Find Route:
- Enter start and end city IDs
- Choose algorithm (Dijkstra/A*/BFS/DFS)
- For Dijkstra/A*: choose optimization weight ("distance" | "time" | "cost")
- Outputs:
  - Path (city names)
  - Total distance/time/cost
  - Algorithm used

Test All Algorithms:
- Runs Dijkstra, A*, BFS, DFS on the same pair
- Prints path and metrics for each

## 7. Web Frontend Modules
graph.js:
- Graph class (JS) mirroring C structures for use in browser

algorithms.js:
- JS implementations of Dijkstra, A*, BFS, DFS compatible with the Graph class

data.js:
- City and route initialization for the JS graph
- Formatting helpers for presenting results

visualization.js:
- SVG-based graph rendering (cities as nodes; routes as edges)
- Path highlighting and traversal animation
- Zoom/reset controls

app.js:
- UI orchestration: dropdowns, algorithm selection, metrics display
- Result formatting and error handling
- Integration between data, algorithms, and visualization

## 8. Build & Run
Windows:
- build.bat compiles and links to travel_planner.exe
- Requires GCC in PATH (MinGW/TDM-GCC); links with -lm

Linux/macOS:
- make builds travel_planner
- ./travel_planner to run
- make clean to remove artifacts

## 9. Assumptions & Constraints
- Undirected graph
- No dynamic I/O of external datasets (sample data is embedded)
- Heuristic: straight-line distance based on city coordinates
- Max city/route limits per graph.h constants

## 10. Troubleshooting
- GCC not found on Windows:
  - Install MinGW-w64 or TDM-GCC and ensure gcc is in PATH
- Linker error for math functions:
  - Ensure -lm is included during linking (Makefile/build.bat already handle this)
- No route found:
  - Verify city IDs and connectivity between chosen cities

## 11. Repository Hygiene (recommended)
- Commit source code, Makefile/build.bat, and documentation only
- Do not commit compiled binaries (*.exe, *.o), build/ or output/ directories, or IDE/OS temp files