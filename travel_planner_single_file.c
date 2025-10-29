/**
 * Travel Route Planner - Single File Version
 * For Online C Compilers
 * 
 * This combines all files into one for easy testing
 * Use on: onlinegdb.com, programiz.com, replit.com
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>
#include <math.h>

#define MAX_CITIES 50
#define MAX_ROUTES 200
#define MAX_NAME_LENGTH 50
#define INFINITY_DIST 999999

// ============ DATA STRUCTURES ============

typedef struct {
    char id[10];
    char name[MAX_NAME_LENGTH];
    double latitude;
    double longitude;
    int x, y;
} City;

typedef struct AdjNode {
    int cityIndex;
    int distance;
    double time;
    int cost;
    char mode[20];
    struct AdjNode* next;
} AdjNode;

typedef struct {
    City cities[MAX_CITIES];
    AdjNode* adjList[MAX_CITIES];
    int numCities;
    int numRoutes;
    bool isDirected;
} Graph;

typedef struct {
    int path[MAX_CITIES];
    int pathLength;
    int totalDistance;
    double totalTime;
    int totalCost;
    char algorithm[30];
} PathResult;

// ============ FUNCTION PROTOTYPES ============

Graph* createGraph(bool isDirected);
void destroyGraph(Graph* graph);
int addCity(Graph* graph, const char* id, const char* name, double lat, double lon);
int addRoute(Graph* graph, const char* from, const char* to, int distance, double time, int cost, const char* mode);
int findCityIndex(Graph* graph, const char* id);
void printGraph(Graph* graph);
PathResult* dijkstra(Graph* graph, const char* startId, const char* endId, const char* weightType);
PathResult* bfs(Graph* graph, const char* startId, const char* endId);
void printPath(Graph* graph, PathResult* result);
void destroyPathResult(PathResult* result);
void initializeSampleData(Graph* graph);
int getWeight(AdjNode* node, const char* weightType);

// ============ GRAPH IMPLEMENTATION ============

Graph* createGraph(bool isDirected) {
    Graph* graph = (Graph*)malloc(sizeof(Graph));
    if (!graph) return NULL;
    
    graph->numCities = 0;
    graph->numRoutes = 0;
    graph->isDirected = isDirected;
    
    for (int i = 0; i < MAX_CITIES; i++) {
        graph->adjList[i] = NULL;
    }
    return graph;
}

void destroyGraph(Graph* graph) {
    if (!graph) return;
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

int addCity(Graph* graph, const char* id, const char* name, double lat, double lon) {
    if (!graph || graph->numCities >= MAX_CITIES) return -1;
    if (findCityIndex(graph, id) != -1) return -1;
    
    int index = graph->numCities;
    strcpy(graph->cities[index].id, id);
    strcpy(graph->cities[index].name, name);
    graph->cities[index].latitude = lat;
    graph->cities[index].longitude = lon;
    graph->numCities++;
    return index;
}

int addRoute(Graph* graph, const char* from, const char* to, int distance, double time, int cost, const char* mode) {
    if (!graph) return -1;
    
    int fromIndex = findCityIndex(graph, from);
    int toIndex = findCityIndex(graph, to);
    
    if (fromIndex == -1 || toIndex == -1) return -1;
    
    AdjNode* newNode = (AdjNode*)malloc(sizeof(AdjNode));
    if (!newNode) return -1;
    
    newNode->cityIndex = toIndex;
    newNode->distance = distance;
    newNode->time = time;
    newNode->cost = cost;
    strcpy(newNode->mode, mode);
    newNode->next = graph->adjList[fromIndex];
    graph->adjList[fromIndex] = newNode;
    
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

int findCityIndex(Graph* graph, const char* id) {
    if (!graph) return -1;
    for (int i = 0; i < graph->numCities; i++) {
        if (strcmp(graph->cities[i].id, id) == 0) return i;
    }
    return -1;
}

void printGraph(Graph* graph) {
    if (!graph) return;
    printf("\n=== Graph Information ===\n");
    printf("Total Cities: %d\n", graph->numCities);
    printf("Total Routes: %d\n\n", graph->numRoutes);
    
    for (int i = 0; i < graph->numCities; i++) {
        printf("%d. %s (%s)\n", i + 1, graph->cities[i].name, graph->cities[i].id);
    }
}

int getWeight(AdjNode* node, const char* weightType) {
    if (strcmp(weightType, "time") == 0) return (int)(node->time * 100);
    if (strcmp(weightType, "cost") == 0) return node->cost;
    return node->distance;
}

// ============ DIJKSTRA'S ALGORITHM ============

typedef struct PQNode {
    int cityIndex;
    int priority;
    struct PQNode* next;
} PQNode;

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

PathResult* dijkstra(Graph* graph, const char* startId, const char* endId, const char* weightType) {
    int start = findCityIndex(graph, startId);
    int end = findCityIndex(graph, endId);
    
    if (start == -1 || end == -1) return NULL;
    
    int n = graph->numCities;
    int* dist = (int*)malloc(n * sizeof(int));
    int* parent = (int*)malloc(n * sizeof(int));
    bool* visited = (bool*)malloc(n * sizeof(bool));
    
    for (int i = 0; i < n; i++) {
        dist[i] = INFINITY_DIST;
        parent[i] = -1;
        visited[i] = false;
    }
    
    dist[start] = 0;
    PQNode* pq = NULL;
    enqueuePQ(&pq, start, 0);
    
    while (pq != NULL) {
        int current = dequeuePQ(&pq);
        if (visited[current]) continue;
        visited[current] = true;
        if (current == end) break;
        
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
    
    if (dist[end] == INFINITY_DIST) {
        free(dist); free(parent); free(visited);
        return NULL;
    }
    
    PathResult* result = (PathResult*)malloc(sizeof(PathResult));
    strcpy(result->algorithm, "Dijkstra's Algorithm");
    
    int temp[MAX_CITIES], tempLen = 0;
    int current = end;
    while (current != -1) {
        temp[tempLen++] = current;
        current = parent[current];
    }
    
    for (int i = 0; i < tempLen; i++) {
        result->path[i] = temp[tempLen - 1 - i];
    }
    result->pathLength = tempLen;
    
    result->totalDistance = 0;
    result->totalTime = 0;
    result->totalCost = 0;
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) node = node->next;
        if (node) {
            result->totalDistance += node->distance;
            result->totalTime += node->time;
            result->totalCost += node->cost;
        }
    }
    
    free(dist); free(parent); free(visited);
    return result;
}

// ============ BFS ALGORITHM ============

PathResult* bfs(Graph* graph, const char* startId, const char* endId) {
    int start = findCityIndex(graph, startId);
    int end = findCityIndex(graph, endId);
    
    if (start == -1 || end == -1) return NULL;
    
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
        free(visited); free(parent); free(queue);
        return NULL;
    }
    
    PathResult* result = (PathResult*)malloc(sizeof(PathResult));
    strcpy(result->algorithm, "BFS");
    
    int temp[MAX_CITIES], tempLen = 0;
    int current = end;
    while (current != -1) {
        temp[tempLen++] = current;
        current = parent[current];
    }
    
    for (int i = 0; i < tempLen; i++) {
        result->path[i] = temp[tempLen - 1 - i];
    }
    result->pathLength = tempLen;
    
    result->totalDistance = 0;
    result->totalTime = 0;
    result->totalCost = 0;
    
    for (int i = 0; i < result->pathLength - 1; i++) {
        int from = result->path[i];
        int to = result->path[i + 1];
        AdjNode* node = graph->adjList[from];
        while (node && node->cityIndex != to) node = node->next;
        if (node) {
            result->totalDistance += node->distance;
            result->totalTime += node->time;
            result->totalCost += node->cost;
        }
    }
    
    free(visited); free(parent); free(queue);
    return result;
}

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
        if (i < result->pathLength - 1) printf(" -> ");
    }
    
    printf("\n\nMetrics:\n");
    printf("Total Distance: %d km\n", result->totalDistance);
    printf("Total Time: %.1f hours\n", result->totalTime);
    printf("Total Cost: Rs.%d\n", result->totalCost);
}

void destroyPathResult(PathResult* result) {
    if (result) free(result);
}

// ============ SAMPLE DATA ============

void initializeSampleData(Graph* graph) {
    addCity(graph, "del", "Delhi", 28.6139, 77.2090);
    addCity(graph, "mum", "Mumbai", 19.0760, 72.8777);
    addCity(graph, "blr", "Bangalore", 12.9716, 77.5946);
    addCity(graph, "chen", "Chennai", 13.0827, 80.2707);
    addCity(graph, "kol", "Kolkata", 22.5726, 88.3639);
    addCity(graph, "jaipur", "Jaipur", 26.9124, 75.7873);
    addCity(graph, "pune", "Pune", 18.5204, 73.8567);
    addCity(graph, "ahm", "Ahmedabad", 23.0225, 72.5714);
    
    addRoute(graph, "del", "jaipur", 280, 3.5, 450, "Train");
    addRoute(graph, "del", "mum", 1400, 2.5, 3500, "Flight");
    addRoute(graph, "mum", "pune", 150, 2.5, 300, "Train");
    addRoute(graph, "mum", "ahm", 530, 7.0, 950, "Train");
    addRoute(graph, "blr", "chen", 350, 5.0, 650, "Train");
    addRoute(graph, "blr", "pune", 840, 2.0, 2800, "Flight");
    addRoute(graph, "jaipur", "ahm", 640, 9.0, 1200, "Train");
    addRoute(graph, "chen", "kol", 1670, 2.8, 4200, "Flight");
    
    printf("Initialized with %d cities and %d routes\n", graph->numCities, graph->numRoutes);
}

// ============ MAIN PROGRAM ============

int main() {
    printf("========================================\n");
    printf("  Travel Route Planner - India (C)    \n");
    printf("========================================\n\n");
    
    Graph* graph = createGraph(false);
    if (!graph) {
        printf("Failed to create graph\n");
        return 1;
    }
    
    initializeSampleData(graph);
    printGraph(graph);
    
    printf("\n========================================\n");
    printf("  Testing Route: Delhi to Mumbai       \n");
    printf("========================================\n");
    
    PathResult* result1 = dijkstra(graph, "del", "mum", "distance");
    if (result1) {
        printPath(graph, result1);
        destroyPathResult(result1);
    }
    
    printf("\n========================================\n");
    printf("  Testing Route: Bangalore to Chennai  \n");
    printf("========================================\n");
    
    PathResult* result2 = bfs(graph, "blr", "chen");
    if (result2) {
        printPath(graph, result2);
        destroyPathResult(result2);
    }
    
    printf("\n========================================\n");
    printf("Program completed successfully!\n");
    printf("========================================\n");
    
    destroyGraph(graph);
    return 0;
}
