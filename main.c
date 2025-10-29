/**
 * Main Program - Travel Route Planner
 * C Implementation
 * 
 * This program demonstrates graph data structures and pathfinding algorithms
 * using Indian cities as nodes and routes as edges.
 */

#include "graph.h"

// Function prototypes
void initializeSampleData(Graph* graph);
void displayMenu();
void findRoute(Graph* graph);
void displayAllCities(Graph* graph);
void testAllAlgorithms(Graph* graph);

int main() {
    printf("========================================\n");
    printf("  Travel Route Planner - India (C)    \n");
    printf("  Graph Algorithms Mini Project        \n");
    printf("========================================\n\n");
    
    // Create graph
    Graph* graph = createGraph(false); // Undirected graph
    if (!graph) {
        fprintf(stderr, "Failed to create graph\n");
        return 1;
    }
    
    // Initialize with sample data
    initializeSampleData(graph);
    printf("\n");
    
    int choice;
    bool running = true;
    
    while (running) {
        displayMenu();
        printf("Enter your choice: ");
        scanf("%d", &choice);
        printf("\n");
        
        switch (choice) {
            case 1:
                findRoute(graph);
                break;
            case 2:
                displayAllCities(graph);
                break;
            case 3:
                printGraph(graph);
                break;
            case 4:
                testAllAlgorithms(graph);
                break;
            case 5:
                printf("Thank you for using Travel Route Planner!\n");
                running = false;
                break;
            default:
                printf("Invalid choice. Please try again.\n\n");
        }
    }
    
    // Clean up
    destroyGraph(graph);
    
    return 0;
}

/**
 * Display main menu
 */
void displayMenu() {
    printf("\n========================================\n");
    printf("              MAIN MENU                 \n");
    printf("========================================\n");
    printf("1. Find Route Between Cities\n");
    printf("2. Display All Cities\n");
    printf("3. Display Graph Information\n");
    printf("4. Test All Algorithms\n");
    printf("5. Exit\n");
    printf("========================================\n");
}

/**
 * Display all available cities
 */
void displayAllCities(Graph* graph) {
    printf("\n=== Available Indian Cities ===\n");
    for (int i = 0; i < graph->numCities; i++) {
        printf("%2d. %-20s (ID: %s)\n", 
               i + 1, 
               graph->cities[i].name, 
               graph->cities[i].id);
    }
    printf("\n");
}

/**
 * Find route between two cities
 */
void findRoute(Graph* graph) {
    char startId[10], endId[10];
    int algoChoice, optChoice;
    
    printf("\n=== Find Route ===\n");
    displayAllCities(graph);
    
    printf("Enter starting city ID (e.g., del, mum, blr): ");
    scanf("%s", startId);
    
    printf("Enter destination city ID: ");
    scanf("%s", endId);
    
    printf("\nSelect Algorithm:\n");
    printf("1. Dijkstra's Algorithm (Optimal)\n");
    printf("2. A* Algorithm (Fast Optimal)\n");
    printf("3. BFS (Minimum Stops)\n");
    printf("4. DFS (Any Path)\n");
    printf("Choice: ");
    scanf("%d", &algoChoice);
    
    char weightType[20] = "distance";
    
    if (algoChoice == 1 || algoChoice == 2) {
        printf("\nOptimize For:\n");
        printf("1. Distance (km)\n");
        printf("2. Time (hours)\n");
        printf("3. Cost (rupees)\n");
        printf("Choice: ");
        scanf("%d", &optChoice);
        
        switch (optChoice) {
            case 2:
                strcpy(weightType, "time");
                break;
            case 3:
                strcpy(weightType, "cost");
                break;
            default:
                strcpy(weightType, "distance");
        }
    }
    
    // Find path using selected algorithm
    PathResult* result = NULL;
    
    switch (algoChoice) {
        case 1:
            result = dijkstra(graph, startId, endId, weightType);
            break;
        case 2:
            result = aStar(graph, startId, endId, weightType);
            break;
        case 3:
            result = bfs(graph, startId, endId);
            break;
        case 4:
            result = dfs(graph, startId, endId);
            break;
        default:
            printf("Invalid algorithm choice.\n");
            return;
    }
    
    // Display result
    if (result) {
        printPath(graph, result);
        destroyPathResult(result);
    } else {
        printf("\nNo path found between %s and %s\n", startId, endId);
    }
    
    printf("\n");
}

/**
 * Test all algorithms on a sample route
 */
void testAllAlgorithms(Graph* graph) {
    char startId[10], endId[10];
    
    printf("\n=== Test All Algorithms ===\n");
    displayAllCities(graph);
    
    printf("Enter starting city ID: ");
    scanf("%s", startId);
    
    printf("Enter destination city ID: ");
    scanf("%s", endId);
    
    printf("\n========================================\n");
    printf("Testing all algorithms from %s to %s\n", startId, endId);
    printf("========================================\n");
    
    // Test Dijkstra
    PathResult* result1 = dijkstra(graph, startId, endId, "distance");
    if (result1) {
        printPath(graph, result1);
        destroyPathResult(result1);
    }
    
    printf("\n");
    
    // Test A*
    PathResult* result2 = aStar(graph, startId, endId, "distance");
    if (result2) {
        printPath(graph, result2);
        destroyPathResult(result2);
    }
    
    printf("\n");
    
    // Test BFS
    PathResult* result3 = bfs(graph, startId, endId);
    if (result3) {
        printPath(graph, result3);
        destroyPathResult(result3);
    }
    
    printf("\n");
    
    // Test DFS
    PathResult* result4 = dfs(graph, startId, endId);
    if (result4) {
        printPath(graph, result4);
        destroyPathResult(result4);
    }
    
    printf("\n========================================\n");
}
