/**
 * Graph Data Structure Implementation
 * Supports directed, undirected, and weighted graphs
 */

class Node {
    constructor(id, name, data = {}) {
        this.id = id;
        this.name = name;
        this.data = data; // Can store additional info like coordinates, city info, etc.
    }

    toString() {
        return this.name;
    }
}

class Edge {
    constructor(from, to, weight = 1, data = {}) {
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.data = data; // Can store info like distance, time, cost, transport mode
    }
}

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.nodes = new Map(); // nodeId -> Node
        this.adjacencyList = new Map(); // nodeId -> [{node: Node, edge: Edge}]
    }

    /**
     * Add a node to the graph
     */
    addNode(id, name, data = {}) {
        if (!this.nodes.has(id)) {
            const node = new Node(id, name, data);
            this.nodes.set(id, node);
            this.adjacencyList.set(id, []);
            return node;
        }
        return this.nodes.get(id);
    }

    /**
     * Add an edge between two nodes
     */
    addEdge(fromId, toId, weight = 1, data = {}) {
        if (!this.nodes.has(fromId) || !this.nodes.has(toId)) {
            throw new Error('Both nodes must exist in the graph');
        }

        const edge = new Edge(fromId, toId, weight, data);
        this.adjacencyList.get(fromId).push({
            node: this.nodes.get(toId),
            edge: edge
        });

        // For undirected graphs, add reverse edge
        if (!this.isDirected) {
            const reverseEdge = new Edge(toId, fromId, weight, data);
            this.adjacencyList.get(toId).push({
                node: this.nodes.get(fromId),
                edge: reverseEdge
            });
        }

        return edge;
    }

    /**
     * Get neighbors of a node
     */
    getNeighbors(nodeId) {
        return this.adjacencyList.get(nodeId) || [];
    }

    /**
     * Get a node by ID
     */
    getNode(nodeId) {
        return this.nodes.get(nodeId);
    }

    /**
     * Get all nodes
     */
    getAllNodes() {
        return Array.from(this.nodes.values());
    }

    /**
     * Get all edges
     */
    getAllEdges() {
        const edges = [];
        for (const [nodeId, neighbors] of this.adjacencyList.entries()) {
            for (const {edge} of neighbors) {
                // For undirected graphs, only add each edge once
                if (this.isDirected || edge.from === nodeId) {
                    edges.push(edge);
                }
            }
        }
        return edges;
    }

    /**
     * Check if there's an edge between two nodes
     */
    hasEdge(fromId, toId) {
        const neighbors = this.getNeighbors(fromId);
        return neighbors.some(({node}) => node.id === toId);
    }

    /**
     * Get the number of nodes
     */
    nodeCount() {
        return this.nodes.size;
    }

    /**
     * Get the number of edges
     */
    edgeCount() {
        let count = 0;
        for (const neighbors of this.adjacencyList.values()) {
            count += neighbors.length;
        }
        return this.isDirected ? count : count / 2;
    }

    /**
     * Clear the graph
     */
    clear() {
        this.nodes.clear();
        this.adjacencyList.clear();
    }

    /**
     * Export graph data for visualization
     */
    exportData() {
        return {
            nodes: Array.from(this.nodes.values()).map(node => ({
                id: node.id,
                name: node.name,
                data: node.data
            })),
            edges: this.getAllEdges().map(edge => ({
                from: edge.from,
                to: edge.to,
                weight: edge.weight,
                data: edge.data
            })),
            isDirected: this.isDirected
        };
    }
}
