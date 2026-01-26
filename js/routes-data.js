/**
 * RoutesDB - Database of Brazilian routes
 * 
 * Structure:
 * - routes: Array of route objects containing origin, destination, and distance
 * - getAllCities(): Returns sorted array of unique city names
 * - findDistance(origin, destination): Finds distance between two cities
 */

var RoutesDB = {
    /**
     * Array of route objects
     * Each route contains:
     * - origin: City name with state (e.g., "São Paulo, SP")
     * - destination: City name with state
     * - distanceKm: Distance in kilometers between cities
     */
    routes: [
        // Capital to capital connections
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1120 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2660 },
        { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3120 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1650 },
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Brasília, DF", destination: "Belo Horizonte, MG", distanceKm: 741 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Belo Horizonte, MG", destination: "Salvador, BA", distanceKm: 1372 },
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Manaus, AM", destination: "Belém, PA", distanceKm: 1306 },
        
        // Major regional routes - Southeast
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "Sorocaba, SP", distanceKm: 87 },
        { origin: "São Paulo, SP", destination: "São José dos Campos, SP", distanceKm: 94 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
        { origin: "Rio de Janeiro, RJ", destination: "Cabo Frio, RJ", distanceKm: 165 },
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 543 },
        
        // Major regional routes - South
        { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 637 },
        { origin: "Curitiba, PR", destination: "Londrina, PR", distanceKm: 381 },
        { origin: "Curitiba, PR", destination: "Paranaguá, PR", distanceKm: 91 },
        { origin: "Florianópolis, SC", destination: "Joinville, SC", distanceKm: 180 },
        { origin: "Florianópolis, SC", destination: "Blumenau, SC", distanceKm: 132 },
        { origin: "Porto Alegre, RS", destination: "Gramado, RS", distanceKm: 115 },
        { origin: "Porto Alegre, RS", destination: "Caxias do Sul, RS", distanceKm: 129 },
        
        // Major regional routes - Northeast
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 108 },
        { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 7 },
        { origin: "Fortaleza, CE", destination: "Juazeiro do Norte, CE", distanceKm: 491 }
    ],

    /**
     * Get all unique cities from the routes database
     * @returns {Array<string>} Sorted array of unique city names
     */
    getAllCities: function() {
        // Create a Set to store unique cities
        var cities = new Set();
        
        // Extract cities from both origin and destination
        for (var i = 0; i < this.routes.length; i++) {
            cities.add(this.routes[i].origin);
            cities.add(this.routes[i].destination);
        }
        
        // Convert Set to Array and sort alphabetically
        var citiesArray = Array.from(cities);
        citiesArray.sort();
        
        return citiesArray;
    },

    /**
     * Find distance between two cities
     * Searches in both directions (A->B and B->A)
     * @param {string} origin - Origin city name
     * @param {string} destination - Destination city name
     * @returns {number|null} Distance in km if found, null otherwise
     */
    findDistance: function(origin, destination) {
        // Normalize input: trim whitespace and convert to lowercase for comparison
        var normalizedOrigin = origin.trim().toLowerCase();
        var normalizedDestination = destination.trim().toLowerCase();
        
        // Search through all routes
        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            var routeOrigin = route.origin.toLowerCase();
            var routeDestination = route.destination.toLowerCase();
            
            // Check both directions (origin->destination and destination->origin)
            if ((routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)) {
                return route.distanceKm;
            }
        }
        
        // Return null if route not found
        return null;
    }
};
