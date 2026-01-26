/**
 * CONFIG - Global configuration object
 * 
 * Contains:
 * - EMISSION_FACTORS: CO2 emission factors for each transport mode (kg CO2 per km)
 * - TRANSPORT_MODES: Metadata for each transport mode (label, icon, color)
 * - CARBON_CREDIT: Carbon credit configuration
 * - populateDatalist(): Populates cities datalist
 * - setupDistanceAutofill(): Sets up automatic distance filling
 */

var CONFIG = {
    /**
     * Emission factors in kg CO2 per km for each transport mode
     */
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    /**
     * Transport modes metadata
     * Each mode contains label (Portuguese), icon (emoji), and color (hex)
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚲",
            color: "#10b981"
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#3b82f6"
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#f59e0b"
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#ef4444"
        }
    },

    /**
     * Carbon credit configuration
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    /**
     * Populate the cities datalist with all available cities from RoutesDB
     */
    populateDatalist: function() {
        // Get cities list from RoutesDB
        var cities = RoutesDB.getAllCities();
        
        // Get datalist element
        var datalist = document.getElementById('cities-list');
        
        if (!datalist) {
            console.error('Datalist element with id "cities-list" not found');
            return;
        }
        
        // Clear existing options
        datalist.innerHTML = '';
        
        // Create option elements for each city
        for (var i = 0; i < cities.length; i++) {
            var option = document.createElement('option');
            option.value = cities[i];
            datalist.appendChild(option);
        }
    },

    /**
     * Setup automatic distance filling based on origin and destination
     * Integrates with RoutesDB to find distances between cities
     */
    setupDistanceAutofill: function() {
        // Get input elements
        var originInput = document.getElementById('origin');
        var destinationInput = document.getElementById('destination');
        var distanceInput = document.getElementById('distance');
        var manualCheckbox = document.getElementById('manual-distance');
        var helperText = document.querySelector('.form-group__helper');
        
        // Verify all elements exist
        if (!originInput || !destinationInput || !distanceInput) {
            console.error('Required input elements not found');
            return;
        }
        
        /**
         * Try to find and fill distance automatically
         */
        function tryAutoFillDistance() {
            // Check if manual mode is enabled
            if (manualCheckbox && manualCheckbox.checked) {
                // Skip auto-fill in manual mode
                return;
            }
            
            // Get trimmed values
            var origin = originInput.value.trim();
            var destination = destinationInput.value.trim();
            
            // Check if both fields are filled
            if (origin && destination) {
                // Try to find distance in database
                var distance = RoutesDB.findDistance(origin, destination);
                
                if (distance !== null) {
                    // Distance found - fill and make readonly
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;
                    
                    // Show success message
                    if (helperText) {
                        helperText.textContent = 'Distância encontrada automaticamente!';
                        helperText.style.color = '#10b981'; // Green
                    }
                } else {
                    // Distance not found - clear and suggest manual input
                    distanceInput.value = '';
                    distanceInput.readOnly = false;
                    
                    if (helperText) {
                        helperText.textContent = 'Rota não encontrada. Por favor, insira a distância manualmente.';
                        helperText.style.color = '#f59e0b'; // Orange/warning
                    }
                }
            } else {
                // Clear distance if origin or destination is empty
                distanceInput.value = '';
                distanceInput.readOnly = true;
                
                if (helperText) {
                    helperText.textContent = 'A distância será preenchida automaticamente';
                    helperText.style.color = '#6b7280'; // Gray
                }
            }
        }
        
        // Add change event listeners to origin and destination
        originInput.addEventListener('change', tryAutoFillDistance);
        destinationInput.addEventListener('change', tryAutoFillDistance);
        
        // Add change listener to manual checkbox if it exists
        if (manualCheckbox) {
            manualCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Manual mode - allow editing
                    distanceInput.readOnly = false;
                    distanceInput.focus();
                    
                    if (helperText) {
                        helperText.textContent = 'Modo manual: insira a distância';
                        helperText.style.color = '#6b7280'; // Gray
                    }
                } else {
                    // Auto mode - try to find route again and set readonly
                    var origin = originInput.value.trim();
                    var destination = destinationInput.value.trim();
                    
                    if (origin && destination) {
                        // Try to find distance automatically
                        tryAutoFillDistance();
                    } else {
                        // No cities selected - clear and set readonly
                        distanceInput.value = '';
                        distanceInput.readOnly = true;
                        
                        if (helperText) {
                            helperText.textContent = 'A distância será preenchida automaticamente';
                            helperText.style.color = '#6b7280'; // Gray
                        }
                    }
                }
            });
        }
    }
};
