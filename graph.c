/**
 * Graph Data Structure Implementation
 * Travel Route Planner - C Implementation
 */

#include "graph.h"

/**
 * Create a new graph
 */
Graph* createGraph(bool isDirected) {
    Graph* graph = (Graph*)malloc(sizeof(Graph));
    if (!graph) {
        fprintf(stderr, "Error: Memory allocation failed for graph\n");
        return NULL;
    }
    
    graph->numCities = 0;
    graph->numRoutes = 0;
    graph->isDirected = isDirected;
    
    // Initialize adjacency list
    for (int i = 0; i < MAX_CITIES; i++) {
        graph->adjList[i] = NULL;
    }
    
    return graph;
}

/**
 * Destroy graph and free memory
 */
void destroyGraph(Graph* graph) {
    if (!graph) return;
    
    // Free adjacency lists
    for (int i = 0; i < graph->numCities; i++) {
        AdjNode* current = graph->adjList[i];
        while (current) {
            AdjNode* temp = current;
            current = current->next;
            free(temp);
        }
    }
    
    free(graph);
}

/**
 * Add a city to the graph
 */
int addCity(Graph* graph, const char* id, const char* name, double lat, double lon) {
    if (!graph || graph->numCities >= MAX_CITIES) {
        return -1;
    }
    
    // Check if city already exists
    if (findCityIndex(graph, id) != -1) {
        return -1;
    }
    
    int index = graph->numCities;
    strcpy(graph->cities[index].id, id);
    strcpy(graph->cities[index].name, name);
    graph->cities[index].latitude = lat;
    graph->cities[index].longitude = lon;
    graph->cities[index].x = 0;
    graph->cities[index].y = 0;
    
    graph->numCities++;
    return index;
}

/**
 * Add a route (edge) to the graph
 */
int addRoute(Graph* graph, const char* from, const char* to, int distance,
             double time, int cost, const char* mode) {
    if (!graph) return -1;
    
    int fromIndex = findCityIndex(graph, from);
    int toIndex = findCityIndex(graph, to);
    
    if (fromIndex == -1 || toIndex == -1) {
        return -1;
    }
    
    // Create new adjacency node
    AdjNode* newNode = (AdjNode*)malloc(sizeof(AdjNode));
    if (!newNode) return -1;
    
    newNode->cityIndex = toIndex;
    newNode->distance = distance;
    newNode->time = time;
    newNode->cost = cost;
    strcpy(newNode->mode, mode);
    newNode->next = graph->adjList[fromIndex];
    graph->adjList[fromIndex] = newNode;
    
    // If undirected, add reverse edge
    if (!graph->isDirected) {
        AdjNode* reverseNode = (AdjNode*)malloc(sizeof(AdjNode));
        if (!reverseNode) return -1;
        
        reverseNode->cityIndex = fromIndex;
        reverseNode->distance = distance;
        reverseNode->time = time;
        reverseNode->cost = cost;
        strcpy(reverseNode->mode, mode);
        reverseNode->next = graph->adjList[toIndex];
        graph->adjList[toIndex] = reverseNode;
    }
    
    graph->numRoutes++;
    return 0;
}

/**
 * Find city index by ID
 */
int findCityIndex(Graph* graph, const char* id) {
    if (!graph) return -1;
    
    for (int i = 0; i < graph->numCities; i++) {
        if (strcmp(graph->cities[i].id, id) == 0) {
            return i;
        }
    }
    return -1;
}

/**
 * Print graph information
 */
void printGraph(Graph* graph) {
    if (!graph) return;
    
    printf("\n=== Graph Information ===\n");
    printf("Total Cities: %d\n", graph->numCities);
    printf("Total Routes: %d\n", graph->numRoutes);
    printf("Graph Type: %s\n\n", graph->isDirected ? "Directed" : "Undirected");
    
    printf("Cities:\n");
    for (int i = 0; i < graph->numCities; i++) {
        printf("%d. %s (%s)\n", i + 1, graph->cities[i].name, graph->cities[i].id);
    }
    
    printf("\nRoutes:\n");
    for (int i = 0; i < graph->numCities; i++) {
        AdjNode* node = graph->adjList[i];
        while (node) {
            printf("%s -> %s: %d km, %.1f hrs, Rs.%d (%s)\n",
                   graph->cities[i].name,
                   graph->cities[node->cityIndex].name,
                   node->distance,
                   node->time,
                   node->cost,
                   node->mode);
            node = node->next;
        }
    }
}

/**
 * Get node count
 */
int getNodeCount(Graph* graph) {
    return graph ? graph->numCities : 0;
}

/**
 * Get edge count
 */
int getEdgeCount(Graph* graph) {
    return graph ? graph->numRoutes : 0;
}

/**
 * Get weight based on optimization type
 */
int getWeight(AdjNode* node, const char* weightType) {
    if (strcmp(weightType, "time") == 0) {
        return (int)(node->time * 100); // Convert to integer for comparison
    } else if (strcmp(weightType, "cost") == 0) {
        return node->cost;
    }
    return node->distance; // Default: distance
}

/**
 * Calculate heuristic (straight-line distance) for A*
 */
double calculateHeuristic(Graph* graph, int fromIndex, int toIndex) {
    double lat1 = graph->cities[fromIndex].latitude * M_PI / 180.0;
    double lon1 = graph->cities[fromIndex].longitude * M_PI / 180.0;
    double lat2 = graph->cities[toIndex].latitude * M_PI / 180.0;
    double lon2 = graph->cities[toIndex].longitude * M_PI / 180.0;
    
    // Haversine formula
    double dlat = lat2 - lat1;
    double dlon = lon2 - lon1;
    double a = sin(dlat/2) * sin(dlat/2) + 
               cos(lat1) * cos(lat2) * sin(dlon/2) * sin(dlon/2);
    double c = 2 * atan2(sqrt(a), sqrt(1-a));
    double distance = 6371 * c; // Earth radius in km
    
    return distance;
}

/**
 * Print path result
 */
void printPath(Graph* graph, PathResult* result) {
    if (!result || result->pathLength == 0) {
        printf("No path found.\n");
        return;
    }
    
    printf("\n=== Route Found ===\n");
    printf("Algorithm: %s\n", result->algorithm);
    printf("Path: ");
    
    for (int i = 0; i < result->pathLength; i++) {
        printf("%s", graph->cities[result->path[i]].name);
        if (i < result->pathLength - 1) {
            printf(" -> ");
        }
    }
    
    printf("\n\nMetrics:\n");
    printf("Total Distance: %d km\n", result->totalDistance);
    printf("Total Time: %.1f hours\n", result->totalTime);
    printf("Total Cost: Rs.%d\n", result->totalCost);
    printf("\nDetailed Steps:\n");
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        
        // Find the edge
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) {
            node = node->next;
        }
        
        if (node) {
            printf("%d. %s -> %s: %d km, %.1f hrs, Rs.%d (%s)\n",
                   i + 1,
                   graph->cities[from].name,
                   graph->cities[to].name,
                   node->distance,
                   node->time,
                   node->cost,
                   node->mode);
        }
    }
}

/**
 * Destroy path result
 */
void destroyPathResult(PathResult* result) {
    if (result) {
        free(result);
    }
}
