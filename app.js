/**
 * Main Application Logic
 * Handles user interactions and coordinates between modules
 */

class TravelPlannerApp {
    constructor() {
        this.graph = new Graph(false); // Undirected graph
        this.visualizer = new GraphVisualizer('graphSvg');
        this.currentResult = null;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize graph with sample data
        TravelData.initializeSampleData(this.graph);
        
        // Draw initial graph
        this.visualizer.drawGraph(this.graph);
        
        // Populate UI
        this.populateCityDropdowns();
        this.updateStatistics();
        this.setupEventListeners();
        this.setupAlgorithmInfo();
    }

    /**
     * Populate city dropdowns
     */
    populateCityDropdowns() {
        const cities = TravelData.getAllCities(this.graph);
        const startSelect = document.getElementById('startCity');
        const endSelect = document.getElementById('endCity');
        
        cities.forEach(city => {
            const option1 = document.createElement('option');
            option1.value = city.id;
            option1.textContent = city.name;
            startSelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = city.id;
            option2.textContent = city.name;
            endSelect.appendChild(option2);
        });
    }

    /**
     * Update graph statistics
     */
    updateStatistics() {
        document.getElementById('totalNodes').textContent = this.graph.nodeCount();
        document.getElementById('totalEdges').textContent = this.graph.edgeCount();
        document.getElementById('graphType').textContent = this.graph.isDirected ? 'Directed' : 'Undirected';
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Find Route button
        document.getElementById('findRouteBtn').addEventListener('click', () => {
            this.findRoute();
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearResults();
        });

        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            this.visualizer.zoomIn();
        });

        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            this.visualizer.zoomOut();
        });

        document.getElementById('resetViewBtn').addEventListener('click', () => {
            this.visualizer.resetView();
        });

        // Algorithm selection change
        document.getElementById('algorithm').addEventListener('change', (e) => {
            this.updateAlgorithmDescription(e.target.value);
        });
    }

    /**
     * Setup algorithm info
     */
    setupAlgorithmInfo() {
        const algorithms = TravelData.getAlgorithms();
        this.algorithmDescriptions = {};
        algorithms.forEach(algo => {
            this.algorithmDescriptions[algo.value] = algo.description;
        });
        
        // Set initial description
        this.updateAlgorithmDescription('dijkstra');
    }

    /**
     * Update algorithm description
     */
    updateAlgorithmDescription(algorithm) {
        const descElement = document.getElementById('algorithmDesc');
        descElement.textContent = this.algorithmDescriptions[algorithm] || '';
    }

    /**
     * Find route based on user input
     */
    findRoute() {
        // Get user inputs
        const startId = document.getElementById('startCity').value;
        const endId = document.getElementById('endCity').value;
        const algorithm = document.getElementById('algorithm').value;
        const optimization = document.getElementById('optimization').value;

        // Validate inputs
        if (!startId || !endId) {
            this.showError('Please select both starting city and destination.');
            return;
        }

        if (startId === endId) {
            this.showError('Starting city and destination must be different.');
            return;
        }

        // Find route using selected algorithm
        let result = null;
        
        try {
            switch (algorithm) {
                case 'dijkstra':
                    result = GraphAlgorithms.dijkstra(this.graph, startId, endId, optimization);
                    break;
                case 'astar':
                    result = GraphAlgorithms.aStar(this.graph, startId, endId, optimization);
                    break;
                case 'bfs':
                    result = GraphAlgorithms.bfs(this.graph, startId, endId);
                    break;
                case 'dfs':
                    result = GraphAlgorithms.dfs(this.graph, startId, endId);
                    break;
                default:
                    result = GraphAlgorithms.dijkstra(this.graph, startId, endId, optimization);
            }
        } catch (error) {
            console.error('Error finding route:', error);
            this.showError('An error occurred while finding the route. Please try again.');
            return;
        }

        // Display results
        if (result) {
            this.currentResult = result;
            this.displayResults(result, optimization, startId, endId);
        } else {
            this.showError('No route found between the selected cities.');
        }
    }

    /**
     * Display route results
     */
    displayResults(result, optimization, startId, endId) {
        // Format the result
        const formattedResult = TravelData.formatPathResult(this.graph, result, optimization);
        
        if (!formattedResult) {
            this.showError('Error formatting route results.');
            return;
        }

        // Hide error card
        document.getElementById('errorCard').style.display = 'none';
        
        // Show results card
        const resultsCard = document.getElementById('resultsCard');
        resultsCard.style.display = 'block';

        // Update route path
        document.getElementById('routePath').textContent = formattedResult.path.join(' → ');
        
        // Update algorithm used
        document.getElementById('algorithmUsed').textContent = formattedResult.algorithm;

        // Update metrics
        document.getElementById('totalDistance').textContent = 
            Math.round(formattedResult.totalDistance) + ' km';
        document.getElementById('totalTime').textContent = 
            formattedResult.totalTime.toFixed(1) + ' hrs';
        document.getElementById('totalCost').textContent = 
            '₹' + Math.round(formattedResult.totalCost);

        // Display route steps
        this.displayRouteSteps(formattedResult.routeDetails);

        // Highlight path in visualization
        this.visualizer.highlightPath(this.graph, formattedResult.pathIds, startId, endId);
        
        // Animate the path
        this.visualizer.animatePathTraversal(formattedResult.pathIds);

        // Scroll to results
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Display individual route steps
     */
    displayRouteSteps(routeDetails) {
        const stepsContainer = document.getElementById('routeSteps');
        stepsContainer.innerHTML = '';

        routeDetails.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'route-step';
            
            stepDiv.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <div class="step-route">
                        ${step.from} → ${step.to}
                    </div>
                    <div class="step-details">
                        <span class="step-detail">📏 ${Math.round(step.distance)} km</span>
                        <span class="step-detail">⏱️ ${step.time.toFixed(1)} hrs</span>
                        <span class="step-detail">💰 ₹${Math.round(step.cost)}</span>
                        <span class="step-detail">🚌 ${step.mode}</span>
                    </div>
                </div>
            `;
            
            stepsContainer.appendChild(stepDiv);
        });
    }

    /**
     * Show error message
     */
    showError(message) {
        // Hide results card
        document.getElementById('resultsCard').style.display = 'none';
        
        // Show error card
        const errorCard = document.getElementById('errorCard');
        errorCard.style.display = 'block';
        document.getElementById('errorMessage').textContent = message;

        // Reset visualization
        this.visualizer.resetHighlights();

        // Scroll to error
        errorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Clear all results
     */
    clearResults() {
        // Reset form
        document.getElementById('startCity').value = '';
        document.getElementById('endCity').value = '';
        document.getElementById('algorithm').value = 'dijkstra';
        document.getElementById('optimization').value = 'distance';
        
        // Hide result and error cards
        document.getElementById('resultsCard').style.display = 'none';
        document.getElementById('errorCard').style.display = 'none';
        
        // Reset visualization
        this.visualizer.resetHighlights();
        this.visualizer.resetView();
        
        // Clear current result
        this.currentResult = null;
        
        // Update algorithm description
        this.updateAlgorithmDescription('dijkstra');
    }

    /**
     * Get current graph
     */
    getGraph() {
        return this.graph;
    }

    /**
     * Get current result
     */
    getCurrentResult() {
        return this.currentResult;
    }
}

// Initialize the application when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TravelPlannerApp();
    console.log('Travel Planner App initialized successfully!');
    console.log('Graph loaded with', app.getGraph().nodeCount(), 'cities and', 
                app.getGraph().edgeCount(), 'routes.');
});
