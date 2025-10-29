# Travel Route Planner - C Programming Implementation

## Overview

This is a **C programming implementation** of the Travel Route Planner project that demonstrates graph data structures and pathfinding algorithms using Indian cities.

## Features

### ✅ Graph Data Structure
- **Adjacency List** representation
- **Undirected graph** for bidirectional routes
- Support for **weighted edges** (distance, time, cost)
- Dynamic memory management

### ✅ Pathfinding Algorithms

1. **Dijkstra's Algorithm**
   - Finds optimal shortest path
   - Supports multi-criteria optimization (distance/time/cost)
   - Time Complexity: O((V+E) log V)

2. **A* Algorithm**
   - Optimized pathfinding with heuristics
   - Uses Haversine formula for geographic distance
   - Faster than Dijkstra for sparse graphs

3. **Breadth-First Search (BFS)**
   - Finds path with minimum stops
   - Unweighted shortest path
   - Time Complexity: O(V+E)

4. **Depth-First Search (DFS)**
   - Finds any valid path
   - Recursive implementation
   - Time Complexity: O(V+E)

### ✅ Data
- **20 major Indian cities**
- **50+ routes** with realistic data
- Transportation modes: Train, Bus, Flight
- Real geographic coordinates (latitude/longitude)

## File Structure

```
travel planner/
├── graph.h          - Graph data structure header
├── graph.c          - Graph implementation
├── algorithms.c     - All pathfinding algorithms
├── data.c          - Indian cities and routes data
├── main.c          - Main program with menu interface
├── Makefile        - Build configuration
└── README_C.md     - This file
```

## Compilation and Execution

### On Windows (using MinGW or GCC)

```bash
# Compile
gcc -o travel_planner main.c graph.c algorithms.c data.c -lm

# Run
travel_planner.exe
```

### On Linux/Mac

```bash
# Using Makefile (recommended)
make

# Run
./travel_planner

# Or compile manually
gcc -Wall -Wextra -std=c11 -o travel_planner main.c graph.c algorithms.c data.c -lm

# Run
./travel_planner
```

### Using Makefile

```bash
# Build the project
make

# Build and run
make run

# Clean build files
make clean

# Rebuild everything
make rebuild

# Show help
make help
```

## Usage

### Main Menu Options

1. **Find Route Between Cities**
   - Select start and destination cities
   - Choose algorithm (Dijkstra, A*, BFS, DFS)
   - Optimize by distance, time, or cost
   - View detailed route with step-by-step directions

2. **Display All Cities**
   - View list of all 20 Indian cities with IDs

3. **Display Graph Information**
   - See all cities and routes
   - View graph statistics

4. **Test All Algorithms**
   - Compare all 4 algorithms on same route
   - See performance differences

5. **Exit**

### Sample Usage

```
========================================
              MAIN MENU                 
========================================
1. Find Route Between Cities
2. Display All Cities
3. Display Graph Information
4. Test All Algorithms
5. Exit
========================================
Enter your choice: 1

=== Find Route ===

=== Available Indian Cities ===
 1. Delhi                (ID: del)
 2. Mumbai               (ID: mum)
 3. Bangalore            (ID: blr)
...

Enter starting city ID (e.g., del, mum, blr): del
Enter destination city ID: mum

Select Algorithm:
1. Dijkstra's Algorithm (Optimal)
2. A* Algorithm (Fast Optimal)
3. BFS (Minimum Stops)
4. DFS (Any Path)
Choice: 1

Optimize For:
1. Distance (km)
2. Time (hours)
3. Cost (rupees)
Choice: 1

=== Route Found ===
Algorithm: Dijkstra's Algorithm
Path: Delhi -> Mumbai

Metrics:
Total Distance: 1400 km
Total Time: 2.5 hours
Total Cost: Rs.3500

Detailed Steps:
1. Delhi -> Mumbai: 1400 km, 2.5 hrs, Rs.3500 (Flight)
```

## Data Structures Used

### 1. City Structure
```c
typedef struct {
    char id[10];                    // Unique ID (e.g., "del")
    char name[MAX_NAME_LENGTH];     // Full name (e.g., "Delhi")
    double latitude;                // Geographic latitude
    double longitude;               // Geographic longitude
    int x, y;                       // For visualization
} City;
```

### 2. Route (Edge) Structure
```c
typedef struct {
    char from[10];     // Source city ID
    char to[10];       // Destination city ID
    int distance;      // Distance in km
    double time;       // Travel time in hours
    int cost;          // Cost in rupees
    char mode[20];     // Transportation mode
} Route;
```

### 3. Adjacency List Node
```c
typedef struct AdjNode {
    int cityIndex;              // Index of connected city
    int distance;               // Edge weight (distance)
    double time;                // Edge weight (time)
    int cost;                   // Edge weight (cost)
    char mode[20];              // Transportation mode
    struct AdjNode* next;       // Next node in list
} AdjNode;
```

### 4. Graph Structure
```c
typedef struct {
    City cities[MAX_CITIES];           // Array of cities
    AdjNode* adjList[MAX_CITIES];      // Adjacency list
    int numCities;                      // Number of cities
    int numRoutes;                      // Number of routes
    bool isDirected;                    // Graph type
} Graph;
```

## Algorithm Implementations

### Dijkstra's Algorithm
- Uses **priority queue** (min-heap simulation)
- Supports **multi-criteria optimization**
- Guarantees optimal solution

### A* Algorithm
- Implements **Haversine formula** for heuristic
- More efficient than Dijkstra
- Uses geographic coordinates for estimates

### BFS
- Uses **queue** data structure
- Level-by-level exploration
- Finds minimum hops

### DFS
- **Recursive** implementation
- Depth-first exploration
- May not find optimal path

## Key Functions

### Graph Operations
```c
Graph* createGraph(bool isDirected);
void destroyGraph(Graph* graph);
int addCity(Graph* graph, const char* id, const char* name, double lat, double lon);
int addRoute(Graph* graph, const char* from, const char* to, int distance, 
             double time, int cost, const char* mode);
```

### Pathfinding
```c
PathResult* dijkstra(Graph* graph, const char* startId, const char* endId, 
                     const char* weightType);
PathResult* aStar(Graph* graph, const char* startId, const char* endId, 
                  const char* weightType);
PathResult* bfs(Graph* graph, const char* startId, const char* endId);
PathResult* dfs(Graph* graph, const char* startId, const char* endId);
```

## Memory Management

- All dynamic memory is properly allocated and freed
- No memory leaks (use `valgrind` to verify)
- Proper cleanup in `destroyGraph()` and `destroyPathResult()`

## Requirements

- **C Compiler**: GCC 4.9+ or any C11 compatible compiler
- **Math Library**: `-lm` flag for math functions
- **Operating System**: Windows, Linux, or macOS

## Learning Outcomes

### Data Structures
✅ Graph representation (adjacency list)
✅ Priority queue implementation
✅ Queue and stack operations
✅ Dynamic memory management

### Algorithms
✅ Dijkstra's shortest path algorithm
✅ A* pathfinding with heuristics
✅ BFS and DFS traversal
✅ Haversine formula for geographic distance

### C Programming Concepts
✅ Structures and pointers
✅ Dynamic memory allocation (malloc, free)
✅ Linked lists
✅ File organization and modular programming
✅ Header files and separate compilation

## Extending the Project

### Add More Cities
Edit `data.c` and add new cities:
```c
addCity(graph, "city_id", "City Name", latitude, longitude);
```

### Add More Routes
```c
addRoute(graph, "from_id", "to_id", distance, time, cost, "mode");
```

### Add New Algorithms
1. Create function in `algorithms.c`
2. Add declaration in `graph.h`
3. Update menu in `main.c`

## Troubleshooting

### Compilation Errors
- Ensure you have GCC installed
- Link math library with `-lm`
- Use C11 standard: `-std=c11`

### Runtime Errors
- Check city IDs are lowercase
- Verify both cities exist in graph
- Ensure sufficient memory available

## Author
DSA Mini Project - C Implementation
Educational Purpose

## License
Free for educational use
