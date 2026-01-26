/**
 * Calculator - Global calculator object for emission calculations
 * 
 * Contains methods for:
 * - Calculating emissions for specific transport modes
 * - Comparing emissions across all transport modes
 * - Calculating savings between different modes
 * - Converting emissions to carbon credits
 * - Estimating carbon credit prices
 */

var Calculator = {
    /**
     * Calculate CO2 emission for a specific transport mode and distance
     * @param {number} distanceKm - Distance in kilometers
     * @param {string} transportMode - Transport mode key (bicycle, car, bus, truck)
     * @returns {number} CO2 emission in kg, rounded to 2 decimal places
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Get emission factor from CONFIG for the specified transport mode
        var emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];
        
        if (emissionFactor === undefined) {
            console.error('Transport mode not found: ' + transportMode);
            return 0;
        }
        
        // Calculate emission: distance * emission factor
        var emission = distanceKm * emissionFactor;
        
        // Round to 2 decimal places
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calculate emissions for all transport modes and compare with car as baseline
     * @param {number} distanceKm - Distance in kilometers
     * @returns {Array} Array of objects with mode, emission, and percentageVsCar, sorted by emission
     */
    calculateAllModes: function(distanceKm) {
        // Array to store results for each mode
        var results = [];
        
        // Calculate car emission as baseline for comparison
        var carEmission = this.calculateEmission(distanceKm, 'car');
        
        // Iterate through all transport modes
        for (var mode in CONFIG.EMISSION_FACTORS) {
            if (CONFIG.EMISSION_FACTORS.hasOwnProperty(mode)) {
                // Calculate emission for this mode
                var emission = this.calculateEmission(distanceKm, mode);
                
                // Calculate percentage compared to car
                // If car emission is 0, set percentage to 0 to avoid division by zero
                var percentageVsCar = carEmission > 0 ? (emission / carEmission) * 100 : 0;
                percentageVsCar = Math.round(percentageVsCar * 100) / 100;
                
                // Add result to array
                results.push({
                    mode: mode,
                    emission: emission,
                    percentageVsCar: percentageVsCar
                });
            }
        }
        
        // Sort array by emission (lowest first)
        results.sort(function(a, b) {
            return a.emission - b.emission;
        });
        
        return results;
    },

    /**
     * Calculate emission savings compared to a baseline
     * @param {number} emission - Actual emission in kg CO2
     * @param {number} baselineEmission - Baseline emission in kg CO2 (e.g., car emission)
     * @returns {Object} Object with savedKg and percentage, both rounded to 2 decimals
     */
    calculateSavings: function(emission, baselineEmission) {
        // Calculate saved kg: baseline minus actual emission
        var savedKg = baselineEmission - emission;
        
        // Calculate percentage saved: (saved / baseline) * 100
        // If baseline is 0, set percentage to 0 to avoid division by zero
        var percentage = baselineEmission > 0 ? (savedKg / baselineEmission) * 100 : 0;
        
        // Round both values to 2 decimal places
        savedKg = Math.round(savedKg * 100) / 100;
        percentage = Math.round(percentage * 100) / 100;
        
        return {
            savedKg: savedKg,
            percentage: percentage
        };
    },

    /**
     * Calculate carbon credits from emission amount
     * @param {number} emissionKg - Emission in kg CO2
     * @returns {number} Number of carbon credits, rounded to 4 decimal places
     */
    calculateCarbonCredits: function(emissionKg) {
        // Divide emission by kg per credit (default 1000 kg = 1 credit)
        var credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        
        // Round to 4 decimal places for precision
        return Math.round(credits * 10000) / 10000;
    },

    /**
     * Estimate carbon credit price range in BRL
     * @param {number} credits - Number of carbon credits
     * @returns {Object} Object with min, max, and average prices in BRL, rounded to 2 decimals
     */
    estimateCreditPrice: function(credits) {
        // Calculate minimum price: credits * minimum price per credit
        var min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        
        // Calculate maximum price: credits * maximum price per credit
        var max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        
        // Calculate average price: (min + max) / 2
        var average = (min + max) / 2;
        
        // Round all values to 2 decimal places
        min = Math.round(min * 100) / 100;
        max = Math.round(max * 100) / 100;
        average = Math.round(average * 100) / 100;
        
        return {
            min: min,
            max: max,
            average: average
        };
    }
};
