/**
 * Comprehensive Indian Cities Data - 35 Major Cities
 * Covering all regions with optimized visualization
 */

class TravelData {
    /**
     * Initialize graph with comprehensive Indian cities
     */
    static initializeSampleData(graph) {
        // Clear existing data
        graph.clear();

        // 35 major Indian cities across all regions - optimized for better spacing and readability
        const cities = [
            // North - Jammu, Punjab, Haryana, Uttarakhand (more spread out)
            { id: 'jammu', name: 'Jammu', x: 230, y: 40 },
            { id: 'amritsar', name: 'Amritsar', x: 220, y: 85 },
            { id: 'chd', name: 'Chandigarh', x: 270, y: 105 },
            { id: 'dehradun', name: 'Dehradun', x: 310, y: 95 },
            
            // Delhi NCR and Rajasthan (better spacing)
            { id: 'del', name: 'Delhi', x: 285, y: 135 },
            { id: 'jaipur', name: 'Jaipur', x: 215, y: 155 },
            { id: 'jodhpur', name: 'Jodhpur', x: 165, y: 150 },
            { id: 'udaipur', name: 'Udaipur', x: 185, y: 180 },
            
            // Uttar Pradesh (spread vertically)
            { id: 'agra', name: 'Agra', x: 300, y: 155 },
            { id: 'luck', name: 'Lucknow', x: 345, y: 165 },
            { id: 'varanasi', name: 'Varanasi', x: 380, y: 180 },
            
            // Bihar and Jharkhand (more space)
            { id: 'patna', name: 'Patna', x: 400, y: 195 },
            { id: 'ranchi', name: 'Ranchi', x: 410, y: 225 },
            
            // West Bengal and Northeast (spread horizontally)
            { id: 'kol', name: 'Kolkata', x: 445, y: 245 },
            { id: 'guwahati', name: 'Guwahati', x: 500, y: 175 },
            
            // Gujarat (better spacing)
            { id: 'ahm', name: 'Ahmedabad', x: 160, y: 220 },
            { id: 'surat', name: 'Surat', x: 175, y: 255 },
            { id: 'rajkot', name: 'Rajkot', x: 135, y: 235 },
            
            // Madhya Pradesh (spread out more)
            { id: 'indore', name: 'Indore', x: 230, y: 235 },
            { id: 'bhopal', name: 'Bhopal', x: 270, y: 250 },
            { id: 'jabalpur', name: 'Jabalpur', x: 325, y: 225 },
            
            // Maharashtra (better distribution)
            { id: 'mum', name: 'Mumbai', x: 190, y: 290 },
            { id: 'pune', name: 'Pune', x: 210, y: 315 },
            { id: 'nagpur', name: 'Nagpur', x: 310, y: 275 },
            { id: 'nashik', name: 'Nashik', x: 195, y: 275 },
            
            // Goa and Karnataka (more vertical space)
            { id: 'goa', name: 'Goa', x: 195, y: 345 },
            { id: 'blr', name: 'Bangalore', x: 255, y: 410 },
            { id: 'mysore', name: 'Mysore', x: 240, y: 435 },
            
            // Telangana and Andhra Pradesh (spread out)
            { id: 'hyd', name: 'Hyderabad', x: 300, y: 370 },
            { id: 'vizag', name: 'Visakhapatnam', x: 375, y: 365 },
            { id: 'vijayawada', name: 'Vijayawada', x: 345, y: 390 },
            
            // Tamil Nadu (better spacing)
            { id: 'chen', name: 'Chennai', x: 320, y: 430 },
            { id: 'coimbatore', name: 'Coimbatore', x: 265, y: 450 },
            { id: 'madurai', name: 'Madurai', x: 285, y: 480 },
            
            // Kerala (more space from Tamil Nadu)
            { id: 'kochi', name: 'Kochi', x: 245, y: 475 }
        ];

        // Add nodes to graph
        cities.forEach(city => {
            graph.addNode(city.id, city.name, { x: city.x, y: city.y });
        });

        // Comprehensive route network - 85+ routes
        const routes = [
            // Far North connections
            { from: 'jammu', to: 'chd', distance: 330, time: 7.0, cost: 650, mode: 'Bus' },
            { from: 'jammu', to: 'amritsar', distance: 215, time: 5.0, cost: 500, mode: 'Bus' },
            
            // North India network
            { from: 'amritsar', to: 'chd', distance: 230, time: 4.5, cost: 450, mode: 'Bus' },
            { from: 'chd', to: 'dehradun', distance: 170, time: 4.0, cost: 400, mode: 'Bus' },
            { from: 'chd', to: 'del', distance: 245, time: 4.0, cost: 400, mode: 'Train' },
            { from: 'dehradun', to: 'del', distance: 255, time: 5.0, cost: 450, mode: 'Bus' },
            { from: 'amritsar', to: 'del', distance: 450, time: 6.5, cost: 800, mode: 'Train' },
            
            // Delhi connections
            { from: 'del', to: 'agra', distance: 230, time: 3.5, cost: 400, mode: 'Train' },
            { from: 'del', to: 'jaipur', distance: 280, time: 4.5, cost: 450, mode: 'Train' },
            { from: 'del', to: 'luck', distance: 555, time: 7.0, cost: 650, mode: 'Train' },
            { from: 'del', to: 'bhopal', distance: 740, time: 10.0, cost: 1100, mode: 'Train' },
            { from: 'del', to: 'ahm', distance: 950, time: 12.5, cost: 1400, mode: 'Train' },
            { from: 'del', to: 'mum', distance: 1420, time: 16.0, cost: 2500, mode: 'Train' },
            { from: 'del', to: 'kol', distance: 1470, time: 17.0, cost: 2200, mode: 'Train' },
            
            // Rajasthan network
            { from: 'jaipur', to: 'jodhpur', distance: 335, time: 5.5, cost: 550, mode: 'Bus' },
            { from: 'jaipur', to: 'udaipur', distance: 395, time: 7.0, cost: 650, mode: 'Bus' },
            { from: 'jaipur', to: 'agra', distance: 240, time: 4.0, cost: 450, mode: 'Train' },
            { from: 'jaipur', to: 'ahm', distance: 660, time: 9.0, cost: 850, mode: 'Bus' },
            { from: 'udaipur', to: 'ahm', distance: 265, time: 5.0, cost: 500, mode: 'Bus' },
            { from: 'jodhpur', to: 'ahm', distance: 385, time: 7.0, cost: 650, mode: 'Bus' },
            
            // Uttar Pradesh network
            { from: 'agra', to: 'luck', distance: 335, time: 5.5, cost: 550, mode: 'Train' },
            { from: 'luck', to: 'varanasi', distance: 320, time: 5.0, cost: 550, mode: 'Train' },
            { from: 'varanasi', to: 'patna', distance: 250, time: 4.5, cost: 450, mode: 'Train' },
            { from: 'luck', to: 'kol', distance: 985, time: 13.0, cost: 1500, mode: 'Train' },
            
            // Bihar and Jharkhand
            { from: 'patna', to: 'ranchi', distance: 310, time: 6.5, cost: 700, mode: 'Train' },
            { from: 'ranchi', to: 'kol', distance: 420, time: 7.0, cost: 750, mode: 'Train' },
            { from: 'patna', to: 'kol', distance: 585, time: 8.5, cost: 900, mode: 'Train' },
            
            // West Bengal and Northeast
            { from: 'kol', to: 'guwahati', distance: 1010, time: 15.0, cost: 1800, mode: 'Train' },
            { from: 'kol', to: 'varanasi', distance: 680, time: 10.0, cost: 1100, mode: 'Train' },
            { from: 'kol', to: 'vizag', distance: 890, time: 12.0, cost: 1400, mode: 'Train' },
            
            // Gujarat network
            { from: 'ahm', to: 'rajkot', distance: 215, time: 3.5, cost: 400, mode: 'Train' },
            { from: 'ahm', to: 'surat', distance: 265, time: 4.0, cost: 450, mode: 'Train' },
            { from: 'ahm', to: 'indore', distance: 390, time: 6.5, cost: 700, mode: 'Bus' },
            { from: 'ahm', to: 'mum', distance: 530, time: 7.0, cost: 900, mode: 'Train' },
            { from: 'surat', to: 'mum', distance: 280, time: 4.5, cost: 550, mode: 'Train' },
            { from: 'rajkot', to: 'ahm', distance: 215, time: 3.5, cost: 400, mode: 'Train' },
            
            // Madhya Pradesh network
            { from: 'indore', to: 'bhopal', distance: 195, time: 3.5, cost: 400, mode: 'Bus' },
            { from: 'bhopal', to: 'jabalpur', distance: 335, time: 6.0, cost: 600, mode: 'Train' },
            { from: 'jabalpur', to: 'nagpur', distance: 265, time: 4.5, cost: 500, mode: 'Train' },
            { from: 'bhopal', to: 'nagpur', distance: 350, time: 6.0, cost: 650, mode: 'Train' },
            { from: 'indore', to: 'mum', distance: 590, time: 9.0, cost: 1000, mode: 'Train' },
            
            // Maharashtra network
            { from: 'mum', to: 'pune', distance: 150, time: 3.0, cost: 350, mode: 'Train' },
            { from: 'mum', to: 'nashik', distance: 185, time: 3.5, cost: 400, mode: 'Bus' },
            { from: 'mum', to: 'goa', distance: 585, time: 10.0, cost: 1200, mode: 'Bus' },
            { from: 'pune', to: 'nashik', distance: 210, time: 4.0, cost: 450, mode: 'Bus' },
            { from: 'pune', to: 'goa', distance: 450, time: 8.0, cost: 900, mode: 'Bus' },
            { from: 'nagpur', to: 'hyd', distance: 510, time: 8.0, cost: 950, mode: 'Train' },
            { from: 'nagpur', to: 'blr', distance: 900, time: 13.0, cost: 1600, mode: 'Bus' },
            { from: 'pune', to: 'hyd', distance: 560, time: 9.0, cost: 1100, mode: 'Train' },
            { from: 'pune', to: 'blr', distance: 840, time: 12.0, cost: 1500, mode: 'Bus' },
            
            // Karnataka network
            { from: 'goa', to: 'blr', distance: 560, time: 9.0, cost: 1100, mode: 'Bus' },
            { from: 'blr', to: 'mysore', distance: 145, time: 2.5, cost: 350, mode: 'Bus' },
            { from: 'blr', to: 'chen', distance: 350, time: 5.5, cost: 750, mode: 'Bus' },
            { from: 'blr', to: 'kochi', distance: 560, time: 8.0, cost: 1000, mode: 'Bus' },
            { from: 'blr', to: 'coimbatore', distance: 365, time: 6.0, cost: 700, mode: 'Bus' },
            { from: 'mysore', to: 'kochi', distance: 455, time: 7.5, cost: 850, mode: 'Bus' },
            
            // Telangana and Andhra Pradesh
            { from: 'hyd', to: 'blr', distance: 575, time: 8.5, cost: 1000, mode: 'Bus' },
            { from: 'hyd', to: 'chen', distance: 630, time: 9.0, cost: 1100, mode: 'Train' },
            { from: 'hyd', to: 'vizag', distance: 620, time: 9.5, cost: 1050, mode: 'Train' },
            { from: 'hyd', to: 'vijayawada', distance: 275, time: 4.5, cost: 550, mode: 'Train' },
            { from: 'vijayawada', to: 'vizag', distance: 350, time: 5.5, cost: 650, mode: 'Train' },
            { from: 'vijayawada', to: 'chen', distance: 275, time: 4.5, cost: 550, mode: 'Train' },
            { from: 'vizag', to: 'chen', distance: 795, time: 11.0, cost: 1300, mode: 'Train' },
            
            // Tamil Nadu network
            { from: 'chen', to: 'coimbatore', distance: 510, time: 8.0, cost: 850, mode: 'Train' },
            { from: 'chen', to: 'madurai', distance: 460, time: 7.5, cost: 800, mode: 'Bus' },
            { from: 'coimbatore', to: 'madurai', distance: 215, time: 4.0, cost: 450, mode: 'Bus' },
            { from: 'coimbatore', to: 'kochi', distance: 190, time: 3.5, cost: 400, mode: 'Bus' },
            { from: 'madurai', to: 'kochi', distance: 240, time: 5.0, cost: 500, mode: 'Bus' },
            
            // Long distance routes
            { from: 'mum', to: 'blr', distance: 985, time: 14.0, cost: 1800, mode: 'Train' },
            { from: 'mum', to: 'chen', distance: 1340, time: 20.0, cost: 3500, mode: 'Flight' },
            { from: 'del', to: 'blr', distance: 2165, time: 28.0, cost: 4500, mode: 'Flight' },
            { from: 'del', to: 'chen', distance: 2180, time: 30.0, cost: 4800, mode: 'Flight' },
            { from: 'del', to: 'hyd', distance: 1580, time: 20.0, cost: 3200, mode: 'Flight' },
            { from: 'kol', to: 'chen', distance: 1680, time: 24.0, cost: 4000, mode: 'Flight' },
            { from: 'ahm', to: 'blr', distance: 1495, time: 22.0, cost: 3800, mode: 'Flight' }
        ];

        // Add edges to graph
        routes.forEach(route => {
            graph.addEdge(
                route.from,
                route.to,
                route.distance, // Default weight is distance
                {
                    distance: route.distance,
                    time: route.time,
                    cost: route.cost,
                    mode: route.mode
                }
            );
        });

        return graph;
    }

    /**
     * Get all unique cities
     */
    static getAllCities(graph) {
        return graph.getAllNodes().map(node => ({
            id: node.id,
            name: node.name
        })).sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Get route details between two cities
     */
    static getRouteDetails(graph, fromId, toId) {
        const neighbors = graph.getNeighbors(fromId);
        const route = neighbors.find(({node}) => node.id === toId);
        
        if (route) {
            return {
                from: graph.getNode(fromId).name,
                to: route.node.name,
                distance: route.edge.data.distance,
                time: route.edge.data.time,
                cost: route.edge.data.cost,
                mode: route.edge.data.mode
            };
        }
        return null;
    }

    /**
     * Format path result for display
     */
    static formatPathResult(graph, result, weightType = 'distance') {
        if (!result) {
            return null;
        }

        const pathDetails = [];
        let totalDistance = 0;
        let totalTime = 0;
        let totalCost = 0;

        for (let i = 0; i < result.path.length - 1; i++) {
            const fromNode = result.path[i];
            const toNode = result.path[i + 1];
            const routeDetails = this.getRouteDetails(graph, fromNode.id, toNode.id);
            
            if (routeDetails) {
                pathDetails.push(routeDetails);
                totalDistance += routeDetails.distance;
                totalTime += routeDetails.time;
                totalCost += routeDetails.cost;
            }
        }

        return {
            path: result.path.map(node => node.name),
            pathIds: result.path.map(node => node.id),
            routeDetails: pathDetails,
            totalDistance: totalDistance,
            totalTime: totalTime,
            totalCost: totalCost,
            algorithm: result.algorithm,
            optimizedFor: weightType
        };
    }

    /**
     * Get sample travel preferences
     */
    static getTravelPreferences() {
        return [
            { value: 'distance', label: 'Shortest Distance', unit: 'km' },
            { value: 'time', label: 'Fastest Route', unit: 'hours' },
            { value: 'cost', label: 'Cheapest Route', unit: '₹' }
        ];
    }

    /**
     * Get available algorithms
     */
    static getAlgorithms() {
        return [
            { value: 'dijkstra', label: 'Dijkstra\'s Algorithm', description: 'Best for weighted graphs, finds optimal path' },
            { value: 'astar', label: 'A* Algorithm', description: 'Faster than Dijkstra with heuristics' },
            { value: 'bfs', label: 'Breadth-First Search', description: 'Finds path with fewest stops' },
            { value: 'dfs', label: 'Depth-First Search', description: 'Explores one path deeply first' }
        ];
    }
}
