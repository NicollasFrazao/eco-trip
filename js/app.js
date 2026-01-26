/**
 * App - Main application initialization and event handling
 * 
 * This file contains:
 * - DOM initialization
 * - Form submission handling
 * - Calculation orchestration
 * - Results rendering
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========== INITIALIZATION ========== */
    
    // Step 1: Populate cities datalist for autocomplete functionality
    CONFIG.populateDatalist();
    
    // Step 2: Setup automatic distance filling based on selected cities
    CONFIG.setupDistanceAutofill();
    
    // Step 3: Get calculator form element
    var calculatorForm = document.getElementById('calculator-form');
    
    if (!calculatorForm) {
        console.error('Calculator form not found!');
        return;
    }
    
    // Step 4: Add submit event listener to form
    calculatorForm.addEventListener('submit', handleFormSubmit);
    
    // Step 5: Log initialization success
    console.log('Calculadora Inicializada!');
    
    
    /* ========== FORM SUBMIT HANDLER ========== */
    
    /**
     * Handle form submission and calculate emissions
     * @param {Event} event - Form submit event
     */
    function handleFormSubmit(event) {
        // Step 1: Prevent default form submission
        event.preventDefault();
        
        // Step 2: Get all form values
        
        // Get origin city (trim whitespace)
        var originInput = document.getElementById('origin');
        var origin = originInput ? originInput.value.trim() : '';
        
        // Get destination city (trim whitespace)
        var destinationInput = document.getElementById('destination');
        var destination = destinationInput ? destinationInput.value.trim() : '';
        
        // Get distance (parse as float)
        var distanceInput = document.getElementById('distance');
        var distance = distanceInput ? parseFloat(distanceInput.value) : 0;
        
        // Get selected transport mode (checked radio button value)
        var transportModeInput = document.querySelector('input[name="transport"]:checked');
        var transportMode = transportModeInput ? transportModeInput.value : '';
        
        // Step 3: Validate inputs
        
        // Check if all required fields are filled
        if (!origin) {
            alert('Por favor, preencha a cidade de origem.');
            return;
        }
        
        if (!destination) {
            alert('Por favor, preencha a cidade de destino.');
            return;
        }
        
        if (!distance || isNaN(distance)) {
            alert('Por favor, preencha a distância.');
            return;
        }
        
        // Check if distance is greater than 0
        if (distance <= 0) {
            alert('A distância deve ser maior que zero.');
            return;
        }
        
        if (!transportMode) {
            alert('Por favor, selecione um meio de transporte.');
            return;
        }
        
        // Step 4: Get submit button element
        var submitButton = calculatorForm.querySelector('button[type="submit"]');
        
        // Step 5: Show loading state on button
        if (submitButton) {
            UI.showLoading(submitButton);
        }
        
        // Step 6: Hide previous results sections
        UI.hideElement('results');
        UI.hideElement('comparison');
        UI.hideElement('carbon-credits');
        
        // Step 7: Simulate processing with setTimeout (1500ms delay)
        setTimeout(function() {
            
            // Try-catch block for error handling
            try {
                /* ========== CALCULATIONS ========== */
                
                // Calculate emission for selected transport mode
                var selectedEmission = Calculator.calculateEmission(distance, transportMode);
                
                // Calculate car emission as baseline for comparison
                var carEmission = Calculator.calculateEmission(distance, 'car');
                
                // Calculate savings compared to car (if not using car)
                var savings = null;
                if (transportMode !== 'car') {
                    savings = Calculator.calculateSavings(selectedEmission, carEmission);
                }
                
                // Calculate comparison for all transport modes
                var allModesComparison = Calculator.calculateAllModes(distance);
                
                // Calculate carbon credits needed
                var carbonCredits = Calculator.calculateCarbonCredits(selectedEmission);
                
                // Estimate carbon credit price
                var creditPrice = Calculator.estimateCreditPrice(carbonCredits);
                
                
                /* ========== BUILD DATA OBJECTS FOR RENDERING ========== */
                
                // Build results data object
                var resultsData = {
                    origin: origin,
                    destination: destination,
                    distance: distance,
                    emission: selectedEmission,
                    mode: transportMode,
                    savings: savings
                };
                
                // Build carbon credits data object
                var carbonCreditsData = {
                    credits: carbonCredits,
                    price: creditPrice
                };
                
                
                /* ========== RENDER RESULTS ========== */
                
                // Render main results
                var resultsHTML = UI.renderResults(resultsData);
                var resultsContent = document.getElementById('results-content');
                if (resultsContent) {
                    resultsContent.innerHTML = resultsHTML;
                }
                
                // Render comparison of all modes
                var comparisonHTML = UI.renderComparison(allModesComparison, transportMode);
                var comparisonContent = document.getElementById('comparison-content');
                if (comparisonContent) {
                    comparisonContent.innerHTML = comparisonHTML;
                }
                
                // Render carbon credits information
                var carbonCreditsHTML = UI.renderCarbonCredits(carbonCreditsData);
                var carbonCreditsContent = document.getElementById('carbon-credits-content');
                if (carbonCreditsContent) {
                    carbonCreditsContent.innerHTML = carbonCreditsHTML;
                }
                
                
                /* ========== SHOW RESULTS SECTIONS ========== */
                
                // Show all three result sections
                UI.showElement('results');
                UI.showElement('comparison');
                UI.showElement('carbon-credits');
                
                // Scroll to results section for better UX
                UI.scrollToElement('results');
                
                // Hide loading state on button
                if (submitButton) {
                    UI.hideLoading(submitButton);
                }
                
            } catch (error) {
                // Catch any errors during calculation or rendering
                
                // Log error to console for debugging
                console.error('Erro ao calcular emissões:', error);
                
                // Show user-friendly error message
                alert('Ocorreu um erro ao calcular as emissões. Por favor, tente novamente.');
                
                // Hide loading state on button
                if (submitButton) {
                    UI.hideLoading(submitButton);
                }
            }
            
        }, 1500); // 1500ms delay to simulate processing
    }
    
});
