/**
 * Graph Algorithms Implementation
 * Including: BFS, DFS, Dijkstra's Algorithm, and A* Algorithm
 */

class GraphAlgorithms {
    /**
     * Breadth-First Search (BFS)
     * Finds shortest path in terms of number of edges (unweighted)
     */
    static bfs(graph, startId, endId) {
        if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) {
            return null;
        }

        const queue = [{nodeId: startId, path: [startId]}];
        const visited = new Set([startId]);

        while (queue.length > 0) {
            const {nodeId, path} = queue.shift();

            if (nodeId === endId) {
                return {
                    path: path.map(id => graph.getNode(id)),
                    distance: path.length - 1,
                    algorithm: 'BFS'
                };
            }

            const neighbors = graph.getNeighbors(nodeId);
            for (const {node} of neighbors) {
                if (!visited.has(node.id)) {
                    visited.add(node.id);
                    queue.push({
                        nodeId: node.id,
                        path: [...path, node.id]
                    });
                }
            }
        }

        return null; // No path found
    }

    /**
     * Depth-First Search (DFS)
     * Finds a path (not necessarily shortest)
     */
    static dfs(graph, startId, endId) {
        if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) {
            return null;
        }

        const visited = new Set();
        const path = [];

        const dfsRecursive = (currentId) => {
            visited.add(currentId);
            path.push(currentId);

            if (currentId === endId) {
                return true;
            }

            const neighbors = graph.getNeighbors(currentId);
            for (const {node} of neighbors) {
                if (!visited.has(node.id)) {
                    if (dfsRecursive(node.id)) {
                        return true;
                    }
                }
            }

            path.pop();
            return false;
        };

        if (dfsRecursive(startId)) {
            return {
                path: path.map(id => graph.getNode(id)),
                distance: path.length - 1,
                algorithm: 'DFS'
            };
        }

        return null; // No path found
    }

    /**
     * Dijkstra's Algorithm
     * Finds shortest path in weighted graphs
     */
    static dijkstra(graph, startId, endId, weightProperty = 'weight') {
        if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) {
            return null;
        }

        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();

        // Initialize distances
        for (const nodeId of graph.nodes.keys()) {
            distances.set(nodeId, Infinity);
            previous.set(nodeId, null);
            unvisited.add(nodeId);
        }
        distances.set(startId, 0);

        while (unvisited.size > 0) {
            // Find unvisited node with minimum distance
            let currentId = null;
            let minDistance = Infinity;
            for (const nodeId of unvisited) {
                if (distances.get(nodeId) < minDistance) {
                    minDistance = distances.get(nodeId);
                    currentId = nodeId;
                }
            }

            if (currentId === null || minDistance === Infinity) {
                break; // No path exists
            }

            unvisited.delete(currentId);

            // If we reached the destination
            if (currentId === endId) {
                break;
            }

            // Update distances to neighbors
            const neighbors = graph.getNeighbors(currentId);
            for (const {node, edge} of neighbors) {
                if (unvisited.has(node.id)) {
                    const weight = this.getWeight(edge, weightProperty);
                    const altDistance = distances.get(currentId) + weight;

                    if (altDistance < distances.get(node.id)) {
                        distances.set(node.id, altDistance);
                        previous.set(node.id, currentId);
                    }
                }
            }
        }

        // Reconstruct path
        if (distances.get(endId) === Infinity) {
            return null; // No path found
        }

        const path = [];
        let current = endId;
        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }

        return {
            path: path.map(id => graph.getNode(id)),
            distance: distances.get(endId),
            algorithm: 'Dijkstra',
            weightProperty: weightProperty
        };
    }

    /**
     * A* Algorithm
     * Finds shortest path using heuristic (requires coordinates)
     */
    static aStar(graph, startId, endId, weightProperty = 'weight') {
        if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) {
            return null;
        }

        const startNode = graph.getNode(startId);
        const endNode = graph.getNode(endId);

        // Check if nodes have coordinates for heuristic
        if (!startNode.data.x || !endNode.data.x) {
            console.warn('A* requires node coordinates, falling back to Dijkstra');
            return this.dijkstra(graph, startId, endId, weightProperty);
        }

        const openSet = new Set([startId]);
        const closedSet = new Set();
        const gScore = new Map(); // Cost from start to node
        const fScore = new Map(); // gScore + heuristic
        const previous = new Map();

        // Initialize scores
        for (const nodeId of graph.nodes.keys()) {
            gScore.set(nodeId, Infinity);
            fScore.set(nodeId, Infinity);
            previous.set(nodeId, null);
        }
        gScore.set(startId, 0);
        fScore.set(startId, this.heuristic(startNode, endNode));

        while (openSet.size > 0) {
            // Find node in openSet with lowest fScore
            let currentId = null;
            let minFScore = Infinity;
            for (const nodeId of openSet) {
                if (fScore.get(nodeId) < minFScore) {
                    minFScore = fScore.get(nodeId);
                    currentId = nodeId;
                }
            }

            if (currentId === null) {
                break;
            }

            // If we reached the destination
            if (currentId === endId) {
                const path = [];
                let current = endId;
                while (current !== null) {
                    path.unshift(current);
                    current = previous.get(current);
                }

                return {
                    path: path.map(id => graph.getNode(id)),
                    distance: gScore.get(endId),
                    algorithm: 'A*',
                    weightProperty: weightProperty
                };
            }

            openSet.delete(currentId);
            closedSet.add(currentId);

            // Check neighbors
            const neighbors = graph.getNeighbors(currentId);
            for (const {node, edge} of neighbors) {
                if (closedSet.has(node.id)) {
                    continue;
                }

                const weight = this.getWeight(edge, weightProperty);
                const tentativeGScore = gScore.get(currentId) + weight;

                if (!openSet.has(node.id)) {
                    openSet.add(node.id);
                } else if (tentativeGScore >= gScore.get(node.id)) {
                    continue;
                }

                // This path is the best so far
                previous.set(node.id, currentId);
                gScore.set(node.id, tentativeGScore);
                fScore.set(node.id, tentativeGScore + this.heuristic(node, endNode));
            }
        }

        return null; // No path found
    }

    /**
     * Heuristic function for A* (Euclidean distance)
     */
    static heuristic(nodeA, nodeB) {
        const dx = nodeA.data.x - nodeB.data.x;
        const dy = nodeA.data.y - nodeB.data.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Get weight from edge based on property
     */
    static getWeight(edge, weightProperty) {
        if (weightProperty === 'weight') {
            return edge.weight;
        }
        return edge.data[weightProperty] || edge.weight;
    }

    /**
     * Find all paths between two nodes (DFS-based)
     */
    static findAllPaths(graph, startId, endId, maxPaths = 10) {
        if (!graph.nodes.has(startId) || !graph.nodes.has(endId)) {
            return [];
        }

        const allPaths = [];
        const visited = new Set();

        const dfsAllPaths = (currentId, path) => {
            if (allPaths.length >= maxPaths) {
                return;
            }

            if (currentId === endId) {
                allPaths.push([...path]);
                return;
            }

            visited.add(currentId);

            const neighbors = graph.getNeighbors(currentId);
            for (const {node} of neighbors) {
                if (!visited.has(node.id)) {
                    path.push(node.id);
                    dfsAllPaths(node.id, path);
                    path.pop();
                }
            }

            visited.delete(currentId);
        };

        dfsAllPaths(startId, [startId]);

        return allPaths.map(path => ({
            path: path.map(id => graph.getNode(id)),
            distance: path.length - 1
        }));
    }

    /**
     * Calculate total cost of a path based on weight property
     */
    static calculatePathCost(graph, path, weightProperty = 'weight') {
        let totalCost = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const currentId = path[i].id;
            const nextId = path[i + 1].id;
            
            const neighbors = graph.getNeighbors(currentId);
            const neighbor = neighbors.find(({node}) => node.id === nextId);
            
            if (neighbor) {
                totalCost += this.getWeight(neighbor.edge, weightProperty);
            }
        }
        return totalCost;
    }
}
