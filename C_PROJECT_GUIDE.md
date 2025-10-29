# Travel Route Planner - C Programming Project Guide

## 🎯 Project Overview

This is a complete **C programming implementation** of a Travel Route Planner system that demonstrates:
- Graph data structures
- Pathfinding algorithms (Dijkstra, A*, BFS, DFS)
- Real-world application using Indian cities
- Console-based interactive menu system

---

## 📁 Project Files

### Core C Files

1. **graph.h** (96 lines)
   - Header file with all structure definitions
   - Function prototypes
   - Constants and type definitions

2. **graph.c** (267 lines)
   - Graph data structure implementation
   - Basic graph operations (add city, add route)
   - Helper functions

3. **algorithms.c** (480 lines)
   - Dijkstra's algorithm implementation
   - A* algorithm with heuristic
   - BFS implementation
   - DFS implementation
   - Priority queue helper functions

4. **data.c** (106 lines)
   - Sample data for 20 Indian cities
   - 50+ routes between cities
   - Initialization function

5. **main.c** (234 lines)
   - Main program entry point
   - Interactive menu system
   - User input handling
   - Algorithm testing functions

### Build Files

6. **Makefile** (50 lines)
   - Build automation for Linux/Mac
   - Targets: all, clean, run, rebuild, help

7. **build.bat** (58 lines)
   - Windows build script
   - GCC compilation commands
   - Error handling

### Documentation

8. **README_C.md** (337 lines)
   - Complete project documentation
   - Compilation instructions
   - Usage guide
   - API reference

9. **C_PROJECT_GUIDE.md** (This file)
   - Project structure overview
   - Learning objectives
   - Implementation details

---

## 🏗️ Data Structures

### 1. City Structure
```c
typedef struct {
    char id[10];                    // "del", "mum", etc.
    char name[MAX_NAME_LENGTH];     // "Delhi", "Mumbai"
    double latitude;                // 28.6139
    double longitude;               // 77.2090
    int x, y;                       // For visualization
} City;
```

### 2. Adjacency List Node
```c
typedef struct AdjNode {
    int cityIndex;              // Index in cities array
    int distance;               // km
    double time;                // hours
    int cost;                   // rupees
    char mode[20];              // "Train", "Bus", "Flight"
    struct AdjNode* next;       // Next edge
} AdjNode;
```

### 3. Graph Structure
```c
typedef struct {
    City cities[MAX_CITIES];           // Max 50 cities
    AdjNode* adjList[MAX_CITIES];      // Adjacency lists
    int numCities;                      // Current count
    int numRoutes;                      // Current count
    bool isDirected;                    // Graph type
} Graph;
```

### 4. Path Result
```c
typedef struct {
    int path[MAX_CITIES];       // City indices
    int pathLength;             // Number of cities
    int totalDistance;          // Total km
    double totalTime;           // Total hours
    int totalCost;              // Total rupees
    char algorithm[30];         // Algorithm name
} PathResult;
```

---

## 🧮 Algorithm Implementations

### Dijkstra's Algorithm

**Purpose**: Find optimal shortest path
**Time Complexity**: O((V+E) log V)
**Space Complexity**: O(V)

**Key Features**:
- Priority queue implementation
- Supports multi-criteria (distance/time/cost)
- Guarantees optimal solution

**Code Location**: `algorithms.c` lines 55-160

### A* Algorithm

**Purpose**: Faster optimal pathfinding
**Time Complexity**: O((V+E) log V) average case
**Space Complexity**: O(V)

**Key Features**:
- Heuristic function (Haversine formula)
- More efficient than Dijkstra
- Uses geographic coordinates

**Code Location**: `algorithms.c` lines 165-290

### BFS (Breadth-First Search)

**Purpose**: Minimum number of stops
**Time Complexity**: O(V+E)
**Space Complexity**: O(V)

**Key Features**:
- Queue-based implementation
- Level-by-level exploration
- Unweighted shortest path

**Code Location**: `algorithms.c` lines 295-380

### DFS (Depth-First Search)

**Purpose**: Find any valid path
**Time Complexity**: O(V+E)
**Space Complexity**: O(V)

**Key Features**:
- Recursive implementation
- Depth-first exploration
- May not be optimal

**Code Location**: `algorithms.c` lines 420-480

---

## 🚀 Compilation & Execution

### Windows (MinGW/GCC)

#### Option 1: Using build.bat
```bash
build.bat
```

#### Option 2: Manual compilation
```bash
gcc -o travel_planner main.c graph.c algorithms.c data.c -lm
travel_planner.exe
```

### Linux/Mac

#### Option 1: Using Makefile
```bash
make
./travel_planner
```

#### Option 2: Manual compilation
```bash
gcc -Wall -Wextra -std=c11 -o travel_planner main.c graph.c algorithms.c data.c -lm
./travel_planner
```

---

## 💻 Program Features

### Interactive Menu

1. **Find Route Between Cities**
   - Select start city (ID: del, mum, blr, etc.)
   - Select destination city
   - Choose algorithm (1-4)
   - Choose optimization criteria
   - View detailed results

2. **Display All Cities**
   - List of 20 Indian cities
   - Shows ID and full name

3. **Display Graph Information**
   - All cities and coordinates
   - All routes with details
   - Graph statistics

4. **Test All Algorithms**
   - Run all 4 algorithms
   - Compare results side-by-side
   - See performance differences

5. **Exit**
   - Clean memory and exit

---

## 📊 Sample Cities & Routes

### Cities (20 total)
- Delhi (del)
- Mumbai (mum)
- Bangalore (blr)
- Hyderabad (hyd)
- Chennai (chen)
- Kolkata (kol)
- Ahmedabad (ahm)
- Pune (pune)
- Jaipur (jaipur)
- Lucknow (luck)
- Kochi (kochi)
- Goa (goa)
- Chandigarh (chand)
- Indore (indore)
- Bhopal (bhopal)
- Nagpur (nagpur)
- Visakhapatnam (vizag)
- Surat (surat)
- Varanasi (varanasi)
- Amritsar (amritsar)

### Sample Routes
```
Delhi -> Jaipur: 280 km, 3.5 hrs, Rs.450 (Train)
Mumbai -> Pune: 150 km, 2.5 hrs, Rs.300 (Train)
Bangalore -> Chennai: 350 km, 5.0 hrs, Rs.650 (Train)
```

---

## 🎓 Learning Outcomes

### Data Structures Covered
✅ **Graph** - Adjacency list representation
✅ **Linked List** - For adjacency lists
✅ **Priority Queue** - For Dijkstra/A*
✅ **Queue** - For BFS
✅ **Stack** - For DFS (recursion)
✅ **Arrays** - For storing paths

### Algorithms Covered
✅ **Dijkstra's Algorithm** - Single-source shortest path
✅ **A* Algorithm** - Informed search
✅ **BFS** - Breadth-first traversal
✅ **DFS** - Depth-first traversal
✅ **Haversine Formula** - Geographic distance

### C Programming Concepts
✅ **Structures** - Complex data types
✅ **Pointers** - Memory addresses
✅ **Dynamic Memory** - malloc/free
✅ **Linked Lists** - Dynamic data structures
✅ **Recursion** - DFS implementation
✅ **Modular Programming** - Multiple files
✅ **Header Files** - Interface definition
✅ **Makefile** - Build automation

---

## 🔧 Customization

### Add More Cities

Edit `data.c`:
```c
addCity(graph, "id", "City Name", latitude, longitude);
```

### Add More Routes

Edit `data.c`:
```c
addRoute(graph, "from_id", "to_id", distance, time, cost, "mode");
```

### Change Constants

Edit `graph.h`:
```c
#define MAX_CITIES 50      // Increase city limit
#define MAX_ROUTES 200     // Increase route limit
```

---

## 📝 Code Quality

### Memory Management
- All `malloc()` calls have corresponding `free()`
- No memory leaks (verified with valgrind)
- Proper error handling

### Code Organization
- Clear function separation
- Meaningful variable names
- Comprehensive comments
- Consistent formatting

### Error Handling
- NULL pointer checks
- Boundary validation
- User input validation
- Graceful failure

---

## 🐛 Testing

### Test Cases

1. **Basic Path Finding**
   - Delhi to Mumbai
   - Expected: Direct flight route

2. **Multi-hop Route**
   - Bangalore to Kolkata
   - Expected: Multiple city path

3. **Algorithm Comparison**
   - Same route, different algorithms
   - Expected: Different paths/costs

4. **Edge Cases**
   - Same start and end city
   - Non-existent city
   - No path available

### Memory Testing

```bash
# Linux/Mac
valgrind --leak-check=full ./travel_planner

# Should show: All heap blocks were freed
```

---

## 📚 Additional Resources

### Understanding Algorithms
- **Dijkstra's**: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
- **A* Search**: https://en.wikipedia.org/wiki/A*_search_algorithm
- **BFS/DFS**: https://en.wikipedia.org/wiki/Graph_traversal

### C Programming
- **Pointers**: Essential for graph structures
- **Dynamic Memory**: malloc, calloc, free
- **Linked Lists**: Foundation for adjacency lists

### Graph Theory
- **Adjacency List** vs Adjacency Matrix
- **Weighted Graphs**
- **Shortest Path Problems**

---

## ✅ Project Checklist

### Implementation
- [x] Graph data structure
- [x] Add city function
- [x] Add route function
- [x] Dijkstra's algorithm
- [x] A* algorithm
- [x] BFS algorithm
- [x] DFS algorithm
- [x] Path reconstruction
- [x] Result display

### Features
- [x] Interactive menu
- [x] User input handling
- [x] Error messages
- [x] Algorithm comparison
- [x] Detailed route info

### Documentation
- [x] Code comments
- [x] README file
- [x] Build instructions
- [x] Usage guide
- [x] API documentation

### Build System
- [x] Makefile (Linux/Mac)
- [x] Build script (Windows)
- [x] Compilation tested
- [x] No warnings

---

## 🎯 Project Submission

### Required Files
1. graph.h
2. graph.c
3. algorithms.c
4. data.c
5. main.c
6. Makefile
7. build.bat
8. README_C.md
9. C_PROJECT_GUIDE.md

### Compilation Proof
```bash
# Show compilation works
make clean
make
./travel_planner
```

### Sample Output
Include screenshot or text output showing:
- Menu display
- Route finding
- Algorithm comparison
- Path results

---

## 💡 Tips for Presentation

1. **Explain Data Structures**
   - Why adjacency list over matrix?
   - How linked lists work

2. **Demonstrate Algorithms**
   - Show different paths for same route
   - Explain optimization criteria

3. **Show Code Quality**
   - Memory management
   - Error handling
   - Modular design

4. **Discuss Real-World Application**
   - GPS navigation
   - Google Maps
   - Logistics optimization

---

## 📞 Support

For issues or questions:
1. Check README_C.md
2. Verify GCC installation
3. Check compilation errors
4. Review code comments

---

**Project Status**: ✅ Complete and ready for submission

**Total Lines of Code**: ~1,200+ lines

**Last Updated**: 2025

**License**: Free for educational use
