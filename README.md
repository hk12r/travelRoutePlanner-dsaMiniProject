# 🗺️ Travel Route Planner - Graph DSA Project (India Edition)

A comprehensive web application for planning optimal travel routes across India using advanced graph data structures and pathfinding algorithms.

## 📋 Project Overview

This Travel Route Planner demonstrates practical implementation of graph data structures and various pathfinding algorithms. It helps users find optimal routes between cities based on different criteria such as distance, time, and cost.

## ✨ Features

### Core Features
- **Interactive Graph Visualization**: Visual representation of cities (nodes) and routes (edges)
- **Multiple Pathfinding Algorithms**:
  - Dijkstra's Algorithm (optimal for weighted graphs)
  - A* Algorithm (faster with heuristic optimization)
  - Breadth-First Search (BFS) - finds minimum stops
  - Depth-First Search (DFS) - exploratory search
- **Multi-Criteria Optimization**: Find routes based on:
  - Shortest distance (kilometers)
  - Fastest route (travel time)
  - Cheapest route (cost)
- **Real-time Route Visualization**: Animated path highlighting
- **Detailed Route Information**: Step-by-step directions with metrics

### User Interface
- Clean, modern, and responsive design
- Interactive graph controls (zoom in/out, pan, reset)
- Comprehensive route details display
- Educational information about algorithms
- Graph statistics dashboard

## 🎯 Learning Outcomes

This project provides hands-on experience with:

1. **Graph Data Structures**
   - Understanding nodes (vertices) and edges
   - Adjacency list representation
   - Weighted and unweighted graphs
   - Directed vs undirected graphs

2. **Graph Algorithms**
   - Dijkstra's shortest path algorithm
   - A* pathfinding with heuristics
   - Breadth-First Search (BFS)
   - Depth-First Search (DFS)

3. **Algorithm Analysis**
   - Time complexity considerations
   - Space complexity trade-offs
   - Algorithm selection based on use case

4. **Software Engineering**
   - Object-oriented design
   - Modular code organization
   - Data visualization techniques
   - User interface design

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server or installation required!

### Running the Application

1. **Simple Method**: Just open `index.html` in your web browser
   ```
   Double-click on index.html
   ```

2. **Using a Local Server** (Optional, for better performance):
   ```bash
   # If you have Python installed
   python -m http.server 8000
   
   # Or if you have Node.js with http-server
   npx http-server
   ```
   Then open `http://localhost:8000` in your browser

## 📁 Project Structure

```
travel planner/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── graph.js            # Graph data structure implementation
├── algorithms.js       # Pathfinding algorithms
├── data.js            # Sample location and route data
├── visualization.js    # Graph visualization logic
├── app.js             # Main application logic
└── README.md          # This file
```

## 🔧 Technical Implementation

### Graph Data Structure

```javascript
class Graph {
    - nodes: Map          // Stores all nodes
    - adjacencyList: Map  // Stores connections
    - isDirected: boolean // Graph type
}
```

**Key Methods**:
- `addNode(id, name, data)`: Add a city/location
- `addEdge(from, to, weight, data)`: Add a route
- `getNeighbors(nodeId)`: Get connected cities
- `getAllNodes()`, `getAllEdges()`: Retrieve graph data

### Implemented Algorithms

#### 1. Dijkstra's Algorithm
- **Purpose**: Find shortest path in weighted graphs
- **Time Complexity**: O((V + E) log V) with priority queue
- **Use Case**: When you need guaranteed optimal path

#### 2. A* Algorithm
- **Purpose**: Faster pathfinding using heuristics
- **Time Complexity**: Better than Dijkstra in practice
- **Use Case**: When nodes have spatial coordinates

#### 3. Breadth-First Search (BFS)
- **Purpose**: Find path with minimum stops
- **Time Complexity**: O(V + E)
- **Use Case**: Unweighted graphs or when stops matter more than distance

#### 4. Depth-First Search (DFS)
- **Purpose**: Explore paths deeply
- **Time Complexity**: O(V + E)
- **Use Case**: Finding any path quickly

## 🎨 Usage Guide

### Finding a Route

1. **Select Starting City**: Choose from the dropdown
2. **Select Destination**: Choose your destination city
3. **Choose Algorithm**: Pick the pathfinding algorithm
4. **Select Optimization**: Choose to optimize by distance, time, or cost
5. **Click "Find Route"**: View the optimal path

### Understanding Results

The results display shows:
- **Route Path**: Sequence of cities in the optimal route
- **Total Distance**: Cumulative distance in kilometers
- **Travel Time**: Estimated total travel time
- **Total Cost**: Cumulative cost in Indian Rupees (₹)
- **Route Details**: Step-by-step breakdown with mode of transport

### Visualization Controls

- **Zoom In/Out**: Adjust the view of the graph
- **Reset View**: Return to default zoom and position
- **Highlighted Path**: Green nodes and edges show the found route
- **Start Node**: Shown in green
- **End Node**: Shown in red

## 🌍 Real-World Applications

This project demonstrates concepts used in:

1. **Navigation Systems**
   - Google Maps India
   - GPS navigation devices
   - MakeMyTrip route planning

2. **Logistics & Supply Chain**
   - Indian delivery services (Amazon, Flipkart)
   - Transport route optimization
   - Distribution networks

3. **Travel Industry**
   - IRCTC train route planning
   - RedBus bus scheduling
   - Flight route planning

4. **Network Routing**
   - Internet packet routing
   - Telecommunications
   - Social network analysis

## 📊 Sample Data

The application includes 20 major Indian cities with realistic:
- Distances (in kilometers)
- Travel times (in hours)  
- Costs (in Indian Rupees ₹)
- Transportation modes (Train, Bus, Flight)

### Cities Included
Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune, Jaipur, Lucknow, Kochi, Goa, Chandigarh, Indore, Bhopal, Nagpur, Visakhapatnam, Surat, Varanasi, Amritsar

## 🔬 Algorithm Comparison

| Algorithm | Optimal | Speed | Use Case |
|-----------|---------|-------|----------|
| Dijkstra  | ✅ Yes  | Medium | Weighted graphs, guaranteed optimal |
| A*        | ✅ Yes  | Fast   | With spatial data, faster than Dijkstra |
| BFS       | ✅ For stops | Fast | Minimum number of connections |
| DFS       | ❌ No   | Fast   | Exploration, not optimal |

## 🎓 Educational Value

This project is perfect for:
- Data Structures & Algorithms courses
- Graph theory learning
- Algorithm visualization
- Real-world problem solving
- Portfolio projects

## 🛠️ Customization

### Adding New Cities

Edit `data.js` and add to the cities array:
```javascript
{ id: 'code', name: 'City Name', x: xCoord, y: yCoord }
```

### Adding New Routes

Add to the routes array in `data.js`:
```javascript
{ from: 'city1', to: 'city2', distance: km, time: hours, cost: rupees, mode: 'Train' }
```

### Styling

Modify `styles.css` to change:
- Color scheme (CSS variables in `:root`)
- Layout and spacing
- Animations and transitions

## 🐛 Troubleshooting

**Issue**: Graph not displaying
- **Solution**: Check browser console for errors, ensure all JS files are loaded

**Issue**: Route not found
- **Solution**: Ensure cities are connected in the graph data

**Issue**: Visualization looks distorted
- **Solution**: Click "Reset View" button or refresh the page

## 📝 Code Quality

- **Modular Design**: Separate files for each concern
- **Object-Oriented**: Classes for Graph, Algorithms, and Visualizer
- **Well-Documented**: Comments and JSDoc annotations
- **Error Handling**: Graceful error messages
- **Responsive**: Works on desktop and mobile devices

## 🔜 Future Enhancements

Potential additions:
- Save/load custom graphs
- Export routes to PDF
- Multi-stop route planning
- Real-time traffic data integration
- Budget constraints
- Multiple transportation modes
- Route comparison view

## 📄 License

This project is created for educational purposes. Feel free to use and modify for learning.

## 👨‍💻 Author

Created as a DSA (Data Structures and Algorithms) mini project to demonstrate graph algorithms in a practical, real-world application.

## 🙏 Acknowledgments

- Graph algorithms based on classical computer science literature
- UI design inspired by modern web applications
- Sample data represents approximate real-world distances and costs for Indian cities
- Costs are in Indian Rupees (₹)

---

**Happy Route Planning! 🚀✈️🗺️**
