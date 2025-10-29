/**
 * Sample Data for Indian Cities
 * Travel Route Planner - C Implementation
 */

#include "graph.h"

/**
 * Initialize graph with sample Indian cities and routes
 */
void initializeSampleData(Graph* graph) {
    if (!graph) return;
    
    // Add Indian cities with coordinates
    addCity(graph, "del", "Delhi", 28.6139, 77.2090);
    addCity(graph, "mum", "Mumbai", 19.0760, 72.8777);
    addCity(graph, "blr", "Bangalore", 12.9716, 77.5946);
    addCity(graph, "hyd", "Hyderabad", 17.3850, 78.4867);
    addCity(graph, "chen", "Chennai", 13.0827, 80.2707);
    addCity(graph, "kol", "Kolkata", 22.5726, 88.3639);
    addCity(graph, "ahm", "Ahmedabad", 23.0225, 72.5714);
    addCity(graph, "pune", "Pune", 18.5204, 73.8567);
    addCity(graph, "jaipur", "Jaipur", 26.9124, 75.7873);
    addCity(graph, "luck", "Lucknow", 26.8467, 80.9462);
    addCity(graph, "kochi", "Kochi", 9.9312, 76.2673);
    addCity(graph, "goa", "Goa", 15.2993, 74.1240);
    addCity(graph, "chand", "Chandigarh", 30.7333, 76.7794);
    addCity(graph, "indore", "Indore", 22.7196, 75.8577);
    addCity(graph, "bhopal", "Bhopal", 23.2599, 77.4126);
    addCity(graph, "nagpur", "Nagpur", 21.1458, 79.0882);
    addCity(graph, "vizag", "Visakhapatnam", 17.6868, 83.2185);
    addCity(graph, "surat", "Surat", 21.1702, 72.8311);
    addCity(graph, "varanasi", "Varanasi", 25.3176, 82.9739);
    addCity(graph, "amritsar", "Amritsar", 31.6340, 74.8723);
    
    // Add routes between cities (from, to, distance_km, time_hrs, cost_rs, mode)
    
    // Delhi connections
    addRoute(graph, "del", "jaipur", 280, 3.5, 450, "Train");
    addRoute(graph, "del", "chand", 250, 3.0, 400, "Train");
    addRoute(graph, "del", "luck", 550, 6.5, 800, "Train");
    addRoute(graph, "del", "mum", 1400, 2.5, 3500, "Flight");
    addRoute(graph, "del", "amritsar", 450, 5.5, 650, "Train");
    
    // Mumbai connections
    addRoute(graph, "mum", "pune", 150, 2.5, 300, "Train");
    addRoute(graph, "mum", "goa", 450, 8.0, 900, "Bus");
    addRoute(graph, "mum", "ahm", 530, 7.0, 950, "Train");
    addRoute(graph, "mum", "surat", 265, 4.0, 450, "Train");
    addRoute(graph, "mum", "indore", 590, 8.5, 1100, "Bus");
    
    // Bangalore connections
    addRoute(graph, "blr", "chen", 350, 5.0, 650, "Train");
    addRoute(graph, "blr", "hyd", 575, 7.5, 1050, "Bus");
    addRoute(graph, "blr", "kochi", 540, 8.0, 950, "Bus");
    addRoute(graph, "blr", "goa", 560, 9.0, 1000, "Bus");
    addRoute(graph, "blr", "pune", 840, 2.0, 2800, "Flight");
    
    // Chennai connections
    addRoute(graph, "chen", "hyd", 630, 8.5, 1150, "Train");
    addRoute(graph, "chen", "kochi", 680, 10.0, 1250, "Train");
    addRoute(graph, "chen", "vizag", 795, 11.0, 1400, "Train");
    addRoute(graph, "chen", "blr", 350, 5.0, 650, "Train");
    
    // Kolkata connections
    addRoute(graph, "kol", "varanasi", 680, 10.0, 1250, "Train");
    addRoute(graph, "kol", "luck", 980, 14.0, 1800, "Train");
    addRoute(graph, "kol", "hyd", 1500, 2.5, 4000, "Flight");
    addRoute(graph, "kol", "vizag", 680, 10.0, 1250, "Train");
    
    // Hyderabad connections
    addRoute(graph, "hyd", "nagpur", 500, 7.5, 900, "Train");
    addRoute(graph, "hyd", "vizag", 620, 9.0, 1150, "Train");
    addRoute(graph, "hyd", "bhopal", 770, 11.0, 1400, "Bus");
    
    // Ahmedabad connections
    addRoute(graph, "ahm", "jaipur", 640, 9.0, 1200, "Train");
    addRoute(graph, "ahm", "indore", 430, 6.5, 800, "Bus");
    addRoute(graph, "ahm", "surat", 265, 4.0, 450, "Train");
    
    // Jaipur connections
    addRoute(graph, "jaipur", "indore", 490, 7.0, 900, "Bus");
    addRoute(graph, "jaipur", "bhopal", 590, 8.5, 1100, "Bus");
    
    // Pune connections
    addRoute(graph, "pune", "goa", 450, 8.0, 850, "Bus");
    addRoute(graph, "pune", "indore", 540, 8.0, 1000, "Bus");
    
    // Goa connections
    addRoute(graph, "goa", "kochi", 590, 10.0, 1100, "Bus");
    
    // Chandigarh connections
    addRoute(graph, "chand", "amritsar", 230, 3.5, 400, "Train");
    
    // Lucknow connections
    addRoute(graph, "luck", "varanasi", 320, 5.0, 550, "Train");
    addRoute(graph, "luck", "bhopal", 700, 10.0, 1300, "Train");
    
    // Nagpur connections
    addRoute(graph, "nagpur", "indore", 390, 6.0, 700, "Train");
    addRoute(graph, "nagpur", "bhopal", 350, 5.5, 650, "Train");
    
    printf("Initialized graph with %d Indian cities and %d routes\n", 
           graph->numCities, graph->numRoutes);
}
