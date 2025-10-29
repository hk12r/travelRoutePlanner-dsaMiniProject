/**
 * Graph Data Structure Header File
 * Travel Route Planner - C Implementation
 */

#ifndef GRAPH_H
#define GRAPH_H

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

// City structure
typedef struct {
    char id[10];
    char name[MAX_NAME_LENGTH];
    double latitude;
    double longitude;
    int x;  // For visualization
    int y;  // For visualization
} City;

// Route (Edge) structure
typedef struct {
    char from[10];
    char to[10];
    int distance;     // in km
    double time;      // in hours
    int cost;         // in rupees
    char mode[20];    // Train, Bus, Flight
} Route;

// Adjacency list node
typedef struct AdjNode {
    int cityIndex;
    int distance;
    double time;
    int cost;
    char mode[20];
    struct AdjNode* next;
} AdjNode;

// Graph structure
typedef struct {
    City cities[MAX_CITIES];
    AdjNode* adjList[MAX_CITIES];
    int numCities;
    int numRoutes;
    bool isDirected;
} Graph;

// Path result structure
typedef struct {
    int path[MAX_CITIES];
    int pathLength;
    int totalDistance;
    double totalTime;
    int totalCost;
    char algorithm[30];
} PathResult;

// Function declarations

// Graph operations
Graph* createGraph(bool isDirected);
void destroyGraph(Graph* graph);
int addCity(Graph* graph, const char* id, const char* name, double lat, double lon);
int addRoute(Graph* graph, const char* from, const char* to, int distance, 
             double time, int cost, const char* mode);
int findCityIndex(Graph* graph, const char* id);
void printGraph(Graph* graph);
int getNodeCount(Graph* graph);
int getEdgeCount(Graph* graph);

// Algorithm functions
PathResult* dijkstra(Graph* graph, const char* startId, const char* endId, const char* weightType);
PathResult* aStar(Graph* graph, const char* startId, const char* endId, const char* weightType);
PathResult* bfs(Graph* graph, const char* startId, const char* endId);
PathResult* dfs(Graph* graph, const char* startId, const char* endId);

// Helper functions
double calculateHeuristic(Graph* graph, int fromIndex, int toIndex);
int getWeight(AdjNode* node, const char* weightType);
void printPath(Graph* graph, PathResult* result);
void destroyPathResult(PathResult* result);

#endif // GRAPH_H
