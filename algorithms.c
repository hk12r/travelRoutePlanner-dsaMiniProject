/**
 * Pathfinding Algorithms Implementation
 * Travel Route Planner - C Implementation
 * Implements: Dijkstra, A*, BFS, DFS
 */

#include "graph.h"

// Priority queue node for Dijkstra and A*
typedef struct PQNode {
    int cityIndex;
    int priority;
    struct PQNode* next;
} PQNode;

// Priority queue functions
PQNode* createPQNode(int cityIndex, int priority) {
    PQNode* node = (PQNode*)malloc(sizeof(PQNode));
    node->cityIndex = cityIndex;
    node->priority = priority;
    node->next = NULL;
    return node;
}

void enqueuePQ(PQNode** head, int cityIndex, int priority) {
    PQNode* newNode = createPQNode(cityIndex, priority);
    
    if (*head == NULL || priority < (*head)->priority) {
        newNode->next = *head;
        *head = newNode;
    } else {
        PQNode* current = *head;
        while (current->next && current->next->priority <= priority) {
            current = current->next;
        }
        newNode->next = current->next;
        current->next = newNode;
    }
}

int dequeuePQ(PQNode** head) {
    if (*head == NULL) return -1;
    
    PQNode* temp = *head;
    int cityIndex = temp->cityIndex;
    *head = (*head)->next;
    free(temp);
    return cityIndex;
}

bool isPQEmpty(PQNode* head) {
    return head == NULL;
}

/**
 * Dijkstra's Algorithm
 * Finds shortest path in weighted graph
 */
PathResult* dijkstra(Graph* graph, const char* startId, const char* endId, const char* weightType) {
    int start = findCityIndex(graph, startId);
    int end = findCityIndex(graph, endId);
    
    if (start == -1 || end == -1) {
        return NULL;
    }
    
    int n = graph->numCities;
    int* dist = (int*)malloc(n * sizeof(int));
    int* parent = (int*)malloc(n * sizeof(int));
    bool* visited = (bool*)malloc(n * sizeof(bool));
    
    // Initialize
    for (int i = 0; i < n; i++) {
        dist[i] = INFINITY_DIST;
        parent[i] = -1;
        visited[i] = false;
    }
    
    dist[start] = 0;
    PQNode* pq = NULL;
    enqueuePQ(&pq, start, 0);
    
    // Main algorithm
    while (!isPQEmpty(pq)) {
        int current = dequeuePQ(&pq);
        
        if (visited[current]) continue;
        visited[current] = true;
        
        if (current == end) break;
        
        // Explore neighbors
        AdjNode* neighbor = graph->adjList[current];
        while (neighbor) {
            int next = neighbor->cityIndex;
            int weight = getWeight(neighbor, weightType);
            int newDist = dist[current] + weight;
            
            if (newDist < dist[next]) {
                dist[next] = newDist;
                parent[next] = current;
                enqueuePQ(&pq, next, newDist);
            }
            
            neighbor = neighbor->next;
        }
    }
    
    // Check if path exists
    if (dist[end] == INFINITY_DIST) {
        free(dist);
        free(parent);
        free(visited);
        return NULL;
    }
    
    // Reconstruct path
    PathResult* result = (PathResult*)malloc(sizeof(PathResult));
    strcpy(result->algorithm, "Dijkstra's Algorithm");
    result->pathLength = 0;
    
    int temp[MAX_CITIES];
    int tempLen = 0;
    int current = end;
    
    while (current != -1) {
        temp[tempLen++] = current;
        current = parent[current];
    }
    
    // Reverse path
    for (int i = 0; i < tempLen; i++) {
        result->path[i] = temp[tempLen - 1 - i];
    }
    result->pathLength = tempLen;
    
    // Calculate metrics
    result->totalDistance = 0;
    result->totalTime = 0;
    result->totalCost = 0;
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) {
            node = node->next;
        }
        
        if (node) {
            result->totalDistance += node->distance;
            result->totalTime += node->time;
            result->totalCost += node->cost;
        }
    }
    
    free(dist);
    free(parent);
    free(visited);
    
    return result;
}

/**
 * A* Algorithm
 * Enhanced Dijkstra with heuristic
 */
PathResult* aStar(Graph* graph, const char* startId, const char* endId, const char* weightType) {
    int start = findCityIndex(graph, startId);
    int end = findCityIndex(graph, endId);
    
    if (start == -1 || end == -1) {
        return NULL;
    }
    
    int n = graph->numCities;
    int* gScore = (int*)malloc(n * sizeof(int));
    int* fScore = (int*)malloc(n * sizeof(int));
    int* parent = (int*)malloc(n * sizeof(int));
    bool* visited = (bool*)malloc(n * sizeof(bool));
    
    // Initialize
    for (int i = 0; i < n; i++) {
        gScore[i] = INFINITY_DIST;
        fScore[i] = INFINITY_DIST;
        parent[i] = -1;
        visited[i] = false;
    }
    
    gScore[start] = 0;
    fScore[start] = (int)calculateHeuristic(graph, start, end);
    
    PQNode* pq = NULL;
    enqueuePQ(&pq, start, fScore[start]);
    
    // Main algorithm
    while (!isPQEmpty(pq)) {
        int current = dequeuePQ(&pq);
        
        if (visited[current]) continue;
        visited[current] = true;
        
        if (current == end) break;
        
        // Explore neighbors
        AdjNode* neighbor = graph->adjList[current];
        while (neighbor) {
            int next = neighbor->cityIndex;
            int weight = getWeight(neighbor, weightType);
            int tentativeG = gScore[current] + weight;
            
            if (tentativeG < gScore[next]) {
                parent[next] = current;
                gScore[next] = tentativeG;
                fScore[next] = tentativeG + (int)calculateHeuristic(graph, next, end);
                enqueuePQ(&pq, next, fScore[next]);
            }
            
            neighbor = neighbor->next;
        }
    }
    
    // Check if path exists
    if (gScore[end] == INFINITY_DIST) {
        free(gScore);
        free(fScore);
        free(parent);
        free(visited);
        return NULL;
    }
    
    // Reconstruct path (same as Dijkstra)
    PathResult* result = (PathResult*)malloc(sizeof(PathResult));
    strcpy(result->algorithm, "A* Algorithm");
    result->pathLength = 0;
    
    int temp[MAX_CITIES];
    int tempLen = 0;
    int current = end;
    
    while (current != -1) {
        temp[tempLen++] = current;
        current = parent[current];
    }
    
    for (int i = 0; i < tempLen; i++) {
        result->path[i] = temp[tempLen - 1 - i];
    }
    result->pathLength = tempLen;
    
    // Calculate metrics
    result->totalDistance = 0;
    result->totalTime = 0;
    result->totalCost = 0;
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) {
            node = node->next;
        }
        
        if (node) {
            result->totalDistance += node->distance;
            result->totalTime += node->time;
            result->totalCost += node->cost;
        }
    }
    
    free(gScore);
    free(fScore);
    free(parent);
    free(visited);
    
    return result;
}

/**
 * Breadth-First Search (BFS)
 * Finds path with minimum number of stops
 */
PathResult* bfs(Graph* graph, const char* startId, const char* endId) {
    int start = findCityIndex(graph, startId);
    int end = findCityIndex(graph, endId);
    
    if (start == -1 || end == -1) {
        return NULL;
    }
    
    int n = graph->numCities;
    bool* visited = (bool*)malloc(n * sizeof(bool));
    int* parent = (int*)malloc(n * sizeof(int));
    int* queue = (int*)malloc(n * sizeof(int));
    
    for (int i = 0; i < n; i++) {
        visited[i] = false;
        parent[i] = -1;
    }
    
    int front = 0, rear = 0;
    queue[rear++] = start;
    visited[start] = true;
    
    bool found = false;
    
    while (front < rear && !found) {
        int current = queue[front++];
        
        if (current == end) {
            found = true;
            break;
        }
        
        AdjNode* neighbor = graph->adjList[current];
        while (neighbor) {
            int next = neighbor->cityIndex;
            if (!visited[next]) {
                visited[next] = true;
                parent[next] = current;
                queue[rear++] = next;
            }
            neighbor = neighbor->next;
        }
    }
    
    if (!found) {
        free(visited);
        free(parent);
        free(queue);
        return NULL;
    }
    
    // Reconstruct path
    PathResult* result = (PathResult*)malloc(sizeof(PathResult));
    strcpy(result->algorithm, "Breadth-First Search (BFS)");
    
    int temp[MAX_CITIES];
    int tempLen = 0;
    int current = end;
    
    while (current != -1) {
        temp[tempLen++] = current;
        current = parent[current];
    }
    
    for (int i = 0; i < tempLen; i++) {
        result->path[i] = temp[tempLen - 1 - i];
    }
    result->pathLength = tempLen;
    
    // Calculate metrics
    result->totalDistance = 0;
    result->totalTime = 0;
    result->totalCost = 0;
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) {
            node = node->next;
        }
        
        if (node) {
            result->totalDistance += node->distance;
            result->totalTime += node->time;
            result->totalCost += node->cost;
        }
    }
    
    free(visited);
    free(parent);
    free(queue);
    
    return result;
}

/**
 * Depth-First Search (DFS) Helper
 */
bool dfsHelper(Graph* graph, int current, int end, bool* visited, int* parent) {
    visited[current] = true;
    
    if (current == end) {
        return true;
    }
    
    AdjNode* neighbor = graph->adjList[current];
    while (neighbor) {
        int next = neighbor->cityIndex;
        if (!visited[next]) {
            parent[next] = current;
            if (dfsHelper(graph, next, end, visited, parent)) {
                return true;
            }
        }
        neighbor = neighbor->next;
    }
    
    return false;
}

/**
 * Depth-First Search (DFS)
 * Finds any path (may not be optimal)
 */
PathResult* dfs(Graph* graph, const char* startId, const char* endId) {
    int start = findCityIndex(graph, startId);
    int end = findCityIndex(graph, endId);
    
    if (start == -1 || end == -1) {
        return NULL;
    }
    
    int n = graph->numCities;
    bool* visited = (bool*)malloc(n * sizeof(bool));
    int* parent = (int*)malloc(n * sizeof(int));
    
    for (int i = 0; i < n; i++) {
        visited[i] = false;
        parent[i] = -1;
    }
    
    bool found = dfsHelper(graph, start, end, visited, parent);
    
    if (!found) {
        free(visited);
        free(parent);
        return NULL;
    }
    
    // Reconstruct path
    PathResult* result = (PathResult*)malloc(sizeof(PathResult));
    strcpy(result->algorithm, "Depth-First Search (DFS)");
    
    int temp[MAX_CITIES];
    int tempLen = 0;
    int current = end;
    
    while (current != -1) {
        temp[tempLen++] = current;
        current = parent[current];
    }
    
    for (int i = 0; i < tempLen; i++) {
        result->path[i] = temp[tempLen - 1 - i];
    }
    result->pathLength = tempLen;
    
    // Calculate metrics
    result->totalDistance = 0;
    result->totalTime = 0;
    result->totalCost = 0;
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) {
            node = node->next;
        }
        
        if (node) {
            result->totalDistance += node->distance;
            result->totalTime += node->time;
            result->totalCost += node->cost;
        }
    }
    
    free(visited);
    free(parent);
    
    return result;
}
