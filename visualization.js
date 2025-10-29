/**
 * Graph Visualization Module
 * Handles drawing and animating the graph
 */

class GraphVisualizer {
    constructor(svgElementId) {
        this.svg = document.getElementById(svgElementId);
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.highlightedPath = null;
    }

    /**
     * Clear the SVG canvas
     */
    clear() {
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
        }
    }

    /**
     * Draw the entire graph
     */
    drawGraph(graph) {
        this.clear();
        
        const nodes = graph.getAllNodes();
        const edges = graph.getAllEdges();

        // Get SVG dimensions
        const rect = this.svg.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Draw India outline first (background layer)
        this.drawIndiaOutline();

        // Create groups for edges and nodes
        const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        edgesGroup.setAttribute('class', 'edges-group');
        this.svg.appendChild(edgesGroup);

        const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        nodesGroup.setAttribute('class', 'nodes-group');
        this.svg.appendChild(nodesGroup);

        // Draw edges first (so they appear behind nodes)
        edges.forEach(edge => {
            const fromNode = graph.getNode(edge.from);
            const toNode = graph.getNode(edge.to);
            
            if (fromNode && toNode) {
                this.drawEdge(edgesGroup, fromNode, toNode, edge);
            }
        });

        // Draw nodes
        nodes.forEach(node => {
            this.drawNode(nodesGroup, node);
        });
    }

    /**
     * Draw a single edge
     */
    drawEdge(group, fromNode, toNode, edge) {
        const x1 = fromNode.data.x;
        const y1 = fromNode.data.y;
        const x2 = toNode.data.x;
        const y2 = toNode.data.y;

        // Create line element
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'edge-line');
        line.setAttribute('data-from', edge.from);
        line.setAttribute('data-to', edge.to);
        group.appendChild(line);

        // Only show weight labels on hover or when highlighted
        // Calculate offset for better label positioning
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        
        // Calculate perpendicular offset to avoid overlapping
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offsetX = -dy / length * 8; // Perpendicular offset
        const offsetY = dx / length * 8;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', midX + offsetX);
        text.setAttribute('y', midY + offsetY);
        text.setAttribute('class', 'edge-weight');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('data-from', edge.from);
        text.setAttribute('data-to', edge.to);
        text.style.display = 'none'; // Hide by default for cleaner map
        text.style.fontSize = '11px'; // Slightly larger for better readability
        text.textContent = Math.round(edge.data.distance) + ' km';
        group.appendChild(text);
        
        // Show weight on line hover
        line.addEventListener('mouseenter', () => {
            text.style.display = 'block';
        });
        line.addEventListener('mouseleave', () => {
            if (!line.classList.contains('highlighted')) {
                text.style.display = 'none';
            }
        });
    }

    /**
     * Draw India outline as background
     */
    drawIndiaOutline() {
        // Simplified India border outline path
        // This is a rough approximation of India's shape
        const indiaPath = `
            M 230,40 
            L 240,50 L 250,55 L 260,60 L 270,65 L 280,70 L 290,75 L 300,80 L 310,85 
            L 320,95 L 325,105 L 330,115 L 335,125 L 340,135 L 345,145 L 350,155 
            L 355,170 L 360,185 L 362,200 L 363,215 L 364,230 L 365,245 L 366,260 
            L 367,275 L 368,290 L 368,305 L 367,320 L 365,335 L 362,350 L 358,365 
            L 353,380 L 347,395 L 340,410 L 332,425 L 323,440 L 313,455 L 302,470 
            L 290,485 L 277,500 L 263,515 L 248,528 L 232,540 L 215,550 L 197,558 
            L 178,564 L 158,568 L 137,570 L 115,568 L 95,563 L 77,555 L 62,545 
            L 50,532 L 42,517 L 38,500 L 37,482 L 40,464 L 46,447 L 55,431 
            L 67,416 L 82,402 L 100,390 L 120,380 L 142,372 L 165,366 L 188,362 
            L 200,345 L 207,328 L 212,311 L 215,294 L 216,277 L 215,260 L 212,243 
            L 207,226 L 200,209 L 191,192 L 180,176 L 167,161 L 152,147 L 135,135 
            L 125,125 L 120,115 L 118,105 L 120,95 L 125,87 L 132,80 L 142,74 
            L 154,70 L 168,68 L 183,68 L 198,70 L 212,74 L 225,80 L 230,75 
            L 228,65 L 228,55 L 230,45 Z
        `;
        
        const outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        outline.setAttribute('d', indiaPath);
        outline.setAttribute('class', 'india-outline');
        this.svg.appendChild(outline);
    }

    /**
     * Draw a single node
     */
    drawNode(group, node) {
        const x = node.data.x;
        const y = node.data.y;

        // Create label element ABOVE the node
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y - 18); // Position above the circle
        text.setAttribute('class', 'node-label');
        text.textContent = node.name;
        group.appendChild(text);

        // Create circle element with larger default size
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 13); // Increased from 12
        circle.setAttribute('class', 'node-circle');
        circle.setAttribute('data-id', node.id);
        
        // Add tooltip
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = node.name;
        circle.appendChild(title);
        
        group.appendChild(circle);
    }

    /**
     * Highlight a path in the graph
     */
    highlightPath(graph, pathIds, startId, endId) {
        this.highlightedPath = pathIds;
        
        // Reset all elements
        this.resetHighlights();

        // Highlight nodes in the path
        pathIds.forEach((nodeId, index) => {
            const circle = this.svg.querySelector(`.node-circle[data-id="${nodeId}"]`);
            if (circle) {
                circle.classList.add('highlighted');
                
                // Mark start and end nodes
                if (nodeId === startId) {
                    circle.classList.add('start');
                } else if (nodeId === endId) {
                    circle.classList.add('end');
                }
            }
        });

        // Highlight edges and their labels in the path
        for (let i = 0; i < pathIds.length - 1; i++) {
            const fromId = pathIds[i];
            const toId = pathIds[i + 1];
            
            // Find the edge (could be in either direction for undirected graphs)
            let edge = this.svg.querySelector(`.edge-line[data-from="${fromId}"][data-to="${toId}"]`);
            if (!edge) {
                edge = this.svg.querySelector(`.edge-line[data-from="${toId}"][data-to="${fromId}"]`);
            }
            
            if (edge) {
                edge.classList.add('highlighted');
                
                // Show and highlight the weight label
                let weightLabel = this.svg.querySelector(`.edge-weight[data-from="${fromId}"][data-to="${toId}"]`);
                if (!weightLabel) {
                    weightLabel = this.svg.querySelector(`.edge-weight[data-from="${toId}"][data-to="${fromId}"]`);
                }
                if (weightLabel) {
                    weightLabel.style.display = 'block';
                    weightLabel.classList.add('highlighted');
                }
                
                // Add animation
                const length = edge.getTotalLength();
                edge.style.strokeDasharray = '10 5';
                edge.style.strokeDashoffset = '0';
            }
        }
    }

    /**
     * Reset all highlights
     */
    resetHighlights() {
        // Remove highlights from nodes
        const highlightedNodes = this.svg.querySelectorAll('.node-circle.highlighted, .node-circle.start, .node-circle.end');
        highlightedNodes.forEach(node => {
            node.classList.remove('highlighted', 'start', 'end');
        });

        // Remove highlights from edges and hide labels
        const highlightedEdges = this.svg.querySelectorAll('.edge-line.highlighted');
        highlightedEdges.forEach(edge => {
            edge.classList.remove('highlighted');
            edge.style.strokeDasharray = '';
            edge.style.strokeDashoffset = '';
        });
        
        // Hide all edge weight labels
        const allWeights = this.svg.querySelectorAll('.edge-weight');
        allWeights.forEach(weight => {
            weight.classList.remove('highlighted');
            weight.style.display = 'none';
        });

        this.highlightedPath = null;
    }

    /**
     * Zoom in
     */
    zoomIn() {
        this.scale *= 1.2;
        this.applyTransform();
    }

    /**
     * Zoom out
     */
    zoomOut() {
        this.scale /= 1.2;
        this.applyTransform();
    }

    /**
     * Reset view
     */
    resetView() {
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.applyTransform();
    }

    /**
     * Apply transform to SVG groups
     */
    applyTransform() {
        const groups = this.svg.querySelectorAll('g');
        groups.forEach(group => {
            group.setAttribute('transform', 
                `translate(${this.offsetX}, ${this.offsetY}) scale(${this.scale})`);
        });
    }

    /**
     * Get highlighted path
     */
    getHighlightedPath() {
        return this.highlightedPath;
    }

    /**
     * Pan the view
     */
    pan(dx, dy) {
        this.offsetX += dx;
        this.offsetY += dy;
        this.applyTransform();
    }

    /**
     * Animate path traversal
     */
    animatePathTraversal(pathIds, duration = 2000) {
        if (!pathIds || pathIds.length < 2) return;

        const circles = pathIds.map(id => 
            this.svg.querySelector(`.node-circle[data-id="${id}"]`)
        ).filter(c => c);

        let currentIndex = 0;
        const stepDuration = duration / (pathIds.length - 1);

        const animateStep = () => {
            if (currentIndex < circles.length) {
                // Pulse animation
                const circle = circles[currentIndex];
                const originalR = circle.getAttribute('r');
                
                circle.setAttribute('r', parseInt(originalR) + 5);
                setTimeout(() => {
                    circle.setAttribute('r', originalR);
                }, 200);

                currentIndex++;
                setTimeout(animateStep, stepDuration);
            }
        };

        animateStep();
    }
}
