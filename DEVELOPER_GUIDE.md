# Developer Guide - Travel Planner

## 🛠️ Development Overview

This guide is for developers who want to understand, modify, or extend the Travel Planner application.

## 📐 Architecture

### Design Patterns Used

1. **Object-Oriented Design**
   - Classes: Graph, Node, Edge, GraphAlgorithms, GraphVisualizer, TravelPlannerApp
   - Encapsulation of data and methods
   - Clear separation of concerns

2. **Singleton Pattern**
   - TravelPlannerApp instance (global `app` variable)
   - Single graph instance per application

3. **Static Methods**
   - GraphAlgorithms class (utility methods)
   - TravelData class (data management)

4. **Module Pattern**
   - Each file represents a logical module
   - Clear dependencies between modules

### File Dependencies

```
index.html
├── graph.js (no dependencies)
├── algorithms.js (depends on graph.js)
├── data.js (depends on graph.js)
├── visualization.js (no dependencies)
└── app.js (depends on all above)
```

## 🔧 Extending the Application

### Adding New Cities

**File**: `data.js`

**Location**: `initializeSampleData()` method

```javascript
const cities = [
    // Add your new city here
    { 
        id: 'xyz',           // Unique identifier (lowercase, no spaces)
        name: 'City Name',   // Display name
        x: 250,             // X coordinate for visualization (0-500)
        y: 300              // Y coordinate for visualization (0-500)
    },
    // ... existing cities
];
```

**Tips**:
- Choose unique IDs
- X and Y coordinates determine position on the map
- Keep coordinates within 0-500 range for best visualization

### Adding New Routes

**File**: `data.js`

**Location**: `initializeSampleData()` method

```javascript
const routes = [
    // Add your new route here
    { 
        from: 'city1',           // Starting city ID
        to: 'city2',             // Destination city ID
        distance: 500,           // Distance in km
        time: 5.5,              // Time in hours
        cost: 60,               // Cost in dollars
        mode: 'Bus'             // Transportation mode
    },
    // ... existing routes
];
```

**Tips**:
- Routes are automatically bidirectional (undirected graph)
- All metrics should be realistic
- Transportation modes: Bus, Train, Flight, Car, etc.

### Adding New Algorithms

**File**: `algorithms.js`

**Step 1**: Implement the algorithm

```javascript
class GraphAlgorithms {
    // ... existing methods
    
    /**
     * Your new algorithm
     */
    static yourNewAlgorithm(graph, startId, endId, weightProperty = 'weight') {
        // Validate inputs
        if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) {
            return null;
        }
        
        // Your algorithm implementation here
        // ...
        
        // Return result in standard format
        return {
            path: pathArray.map(id => graph.getNode(id)),
            distance: totalDistance,
            algorithm: 'Your Algorithm Name',
            weightProperty: weightProperty
        };
    }
}
```

**Step 2**: Update the UI (`index.html`)

```html
<select id="algorithm" class="form-control">
    <!-- Add your algorithm option -->
    <option value="yourAlgo">Your Algorithm Name</option>
    <!-- ... existing options -->
</select>
```

**Step 3**: Update the app logic (`app.js`)

```javascript
findRoute() {
    // ... existing code
    
    switch (algorithm) {
        case 'yourAlgo':
            result = GraphAlgorithms.yourNewAlgorithm(
                this.graph, startId, endId, optimization
            );
            break;
        // ... existing cases
    }
}
```

**Step 4**: Add algorithm description (`data.js`)

```javascript
static getAlgorithms() {
    return [
        { 
            value: 'yourAlgo', 
            label: 'Your Algorithm', 
            description: 'Description of your algorithm' 
        },
        // ... existing algorithms
    ];
}
```

### Adding New Optimization Criteria

**File**: `data.js`

**Location**: `getTravelPreferences()` method

```javascript
static getTravelPreferences() {
    return [
        { 
            value: 'yourMetric',      // Internal identifier
            label: 'Your Metric',     // Display name
            unit: 'units'             // Unit of measurement
        },
        // ... existing preferences
    ];
}
```

**File**: `data.js`

**Location**: Update route data to include your metric

```javascript
const routes = [
    { 
        from: 'city1',
        to: 'city2',
        distance: 500,
        time: 5.5,
        cost: 60,
        yourMetric: 123,  // Add your new metric
        mode: 'Bus'
    },
    // ...
];
```

## 🎨 Customizing the UI

### Changing Colors

**File**: `styles.css`

**Location**: `:root` CSS variables

```css
:root {
    --primary-color: #4f46e5;      /* Main theme color */
    --primary-dark: #4338ca;       /* Hover states */
    --secondary-color: #06b6d4;    /* Accent color */
    --success-color: #10b981;      /* Success states */
    --error-color: #ef4444;        /* Error states */
    /* ... modify as needed */
}
```

### Modifying Layout

**File**: `styles.css`

**Location**: `.main-content` grid

```css
.main-content {
    display: grid;
    grid-template-columns: 380px 1fr;  /* Adjust column widths */
    gap: 30px;                         /* Adjust spacing */
}
```

### Changing Graph Visualization

**File**: `visualization.js`

**Node appearance**:
```javascript
drawNode(group, node) {
    // Modify circle attributes
    circle.setAttribute('r', 10);  // Change node size
    // ...
}
```

**Edge appearance**:
```javascript
drawEdge(group, fromNode, toNode, edge) {
    // Modify line attributes
    line.setAttribute('class', 'edge-line');
    // ...
}
```

## 🧪 Testing Your Changes

### Manual Testing Checklist

- [ ] Can select cities from dropdowns
- [ ] Can choose algorithms
- [ ] Can set optimization criteria
- [ ] Route finding works for all algorithms
- [ ] Results display correctly
- [ ] Visualization shows path
- [ ] No console errors
- [ ] Responsive on mobile/tablet

### Automated Testing

**File**: `test.html`

Add test cases:

```javascript
const testCases = [
    // Add your test case
    { 
        from: 'city1', 
        to: 'city2', 
        name: 'Description' 
    },
    // ... existing cases
];
```

## 🐛 Debugging Tips

### Common Issues

**Issue**: Graph not displaying
```javascript
// Check browser console
console.log('Graph nodes:', graph.nodeCount());
console.log('Graph edges:', graph.edgeCount());
```

**Issue**: Algorithm returns null
```javascript
// Verify cities exist
console.log('Start exists:', graph.nodes.has(startId));
console.log('End exists:', graph.nodes.has(endId));
```

**Issue**: Path not highlighted
```javascript
// Check path IDs
console.log('Path IDs:', pathIds);
// Verify SVG elements exist
console.log('SVG elements:', svg.querySelectorAll('.node-circle').length);
```

### Using Browser DevTools

1. **Console**: View logs and errors
2. **Elements**: Inspect SVG and DOM
3. **Network**: Check file loading
4. **Sources**: Set breakpoints in JS

## 📊 Performance Optimization

### For Large Graphs

**1. Limit Search Space**
```javascript
// Add early termination
if (closedSet.size > MAX_ITERATIONS) {
    break;
}
```

**2. Use Better Data Structures**
```javascript
// Instead of array search, use Map/Set
const visited = new Set();
```

**3. Optimize Visualization**
```javascript
// Only redraw when necessary
if (needsRedraw) {
    this.drawGraph(graph);
}
```

## 🔒 Code Quality

### Best Practices Followed

1. **Naming Conventions**
   - Classes: PascalCase (e.g., `GraphAlgorithms`)
   - Variables: camelCase (e.g., `startId`)
   - Constants: UPPER_CASE (e.g., `MAX_ITERATIONS`)

2. **Comments**
   - JSDoc style for methods
   - Inline comments for complex logic
   - Section headers for organization

3. **Error Handling**
   - Validate inputs
   - Return null for failures
   - Show user-friendly messages

4. **Code Organization**
   - One class per file (mostly)
   - Related methods grouped together
   - Consistent formatting

## 🚀 Deployment

### Hosting Options

**1. GitHub Pages** (Recommended)
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# Enable GitHub Pages in repository settings
```

**2. Netlify**
- Drag and drop the project folder
- Instant deployment

**3. Local Server**
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

## 📦 Build Process (Optional)

This project doesn't require a build process, but you can add one:

### Minification
```bash
# Install terser
npm install -g terser

# Minify JavaScript
terser app.js -o app.min.js -c -m
```

### Bundling
```bash
# Install webpack
npm install --save-dev webpack webpack-cli

# Create webpack.config.js
# Bundle all JS files
```

## 🔧 Advanced Features

### Adding API Integration

```javascript
// Example: Fetch real distance data
async function getRealDistance(from, to) {
    const response = await fetch(
        `https://api.example.com/distance?from=${from}&to=${to}`
    );
    const data = await response.json();
    return data.distance;
}
```

### Adding User Preferences

```javascript
// Store in localStorage
class UserPreferences {
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    static load(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}
```

### Adding Route Export

```javascript
function exportRouteToPDF(result) {
    // Use library like jsPDF
    const doc = new jsPDF();
    doc.text(`Route: ${result.path.join(' -> ')}`, 10, 10);
    doc.save('route.pdf');
}
```

## 📚 Learning Resources

### Graph Algorithms
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/books/introduction-algorithms)
- [Visualgo - Algorithm Visualizations](https://visualgo.net)

### JavaScript
- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)

### SVG
- [MDN SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

## 🤝 Contributing Guidelines

1. **Fork the project**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push and create pull request**

## 📝 Code Review Checklist

- [ ] Code follows existing style
- [ ] All variables are properly named
- [ ] Comments explain complex logic
- [ ] No console.log() in production code
- [ ] Error handling is implemented
- [ ] Testing done on multiple browsers
- [ ] Responsive design maintained
- [ ] Documentation updated

## 🎯 Future Roadmap

### Planned Features
- [ ] Multi-stop journey planning
- [ ] Save/load custom graphs
- [ ] Route comparison view
- [ ] PDF export
- [ ] Mobile app version
- [ ] Real-time data integration
- [ ] User authentication
- [ ] Collaborative trip planning

### Nice to Have
- [ ] Weather integration
- [ ] Points of interest
- [ ] Budget constraints
- [ ] Transportation preferences
- [ ] Social sharing
- [ ] Reviews and ratings

## 📞 Support

For questions or issues:
1. Check the README.md
2. Review this developer guide
3. Check browser console for errors
4. Review test.html for examples

## 📄 License

Free to use for educational purposes. Modify and distribute as needed.

---

**Happy Coding! 🚀**

Last Updated: 2025-10-17
