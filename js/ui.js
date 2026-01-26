/**
 * UI - Global UI management object
 * 
 * Contains methods for:
 * - Formatting numbers and currency
 * - Showing/hiding elements
 * - Rendering results, comparisons, and carbon credits
 * - Managing loading states
 */

var UI = {
    /* ========== UTILITY METHODS ========== */

    /**
     * Format number with specified decimals and thousand separators
     * @param {number} number - Number to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number string (e.g., "1.234,56")
     */
    formatNumber: function(number, decimals) {
        // Use toLocaleString for Brazilian Portuguese formatting
        // This automatically adds thousand separators (.) and comma for decimals (,)
        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Format value as Brazilian Real currency
     * @param {number} value - Value to format
     * @returns {string} Formatted currency string (e.g., "R$ 1.234,56")
     */
    formatCurrency: function(value) {
        // Use toLocaleString with currency style for pt-BR
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Show element by removing 'hidden' class
     * @param {string} elementId - ID of element to show
     */
    showElement: function(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        } else {
            console.error('Element not found: ' + elementId);
        }
    },

    /**
     * Hide element by adding 'hidden' class
     * @param {string} elementId - ID of element to hide
     */
    hideElement: function(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        } else {
            console.error('Element not found: ' + elementId);
        }
    },

    /**
     * Scroll to element with smooth behavior
     * @param {string} elementId - ID of element to scroll to
     */
    scrollToElement: function(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error('Element not found: ' + elementId);
        }
    },

    /* ========== RENDERING METHODS ========== */

    /**
     * Render calculation results
     * @param {Object} data - Results data containing origin, destination, distance, emission, mode, savings
     * @returns {string} HTML string with results cards
     */
    renderResults: function(data) {
        // Get mode metadata from CONFIG
        var modeMetadata = CONFIG.TRANSPORT_MODES[data.mode];
        
        // Build HTML string with results cards
        // Structure: Container > Multiple cards showing different result aspects
        var html = '<div class="results__container">';
        
        // Card 1: Route information (origin -> destination)
        html += '<div class="results__card">';
        html += '  <div class="results__card-icon">🗺️</div>';
        html += '  <div class="results__card-content">';
        html += '    <h3 class="results__card-title">Rota</h3>';
        html += '    <p class="results__card-value">' + data.origin + ' → ' + data.destination + '</p>';
        html += '  </div>';
        html += '</div>';
        
        // Card 2: Distance
        html += '<div class="results__card">';
        html += '  <div class="results__card-icon">📏</div>';
        html += '  <div class="results__card-content">';
        html += '    <h3 class="results__card-title">Distância</h3>';
        html += '    <p class="results__card-value">' + this.formatNumber(data.distance, 0) + ' km</p>';
        html += '  </div>';
        html += '</div>';
        
        // Card 3: CO2 Emission (with green leaf icon)
        html += '<div class="results__card results__card--highlight">';
        html += '  <div class="results__card-icon">🍃</div>';
        html += '  <div class="results__card-content">';
        html += '    <h3 class="results__card-title">Emissão de CO₂</h3>';
        html += '    <p class="results__card-value">' + this.formatNumber(data.emission, 2) + ' kg</p>';
        html += '  </div>';
        html += '</div>';
        
        // Card 4: Transport mode (with mode icon and label)
        html += '<div class="results__card">';
        html += '  <div class="results__card-icon">' + modeMetadata.icon + '</div>';
        html += '  <div class="results__card-content">';
        html += '    <h3 class="results__card-title">Meio de Transporte</h3>';
        html += '    <p class="results__card-value">' + modeMetadata.label + '</p>';
        html += '  </div>';
        html += '</div>';
        
        // Card 5: Savings (only if mode is not 'car' and savings exist)
        if (data.mode !== 'car' && data.savings) {
            html += '<div class="results__card results__card--savings">';
            html += '  <div class="results__card-icon">💰</div>';
            html += '  <div class="results__card-content">';
            html += '    <h3 class="results__card-title">Economia vs Carro</h3>';
            html += '    <p class="results__card-value">';
            html += this.formatNumber(data.savings.savedKg, 2) + ' kg';
            html += ' <span class="results__card-percentage">(' + this.formatNumber(data.savings.percentage, 1) + '%)</span>';
            html += '    </p>';
            html += '  </div>';
            html += '</div>';
        }
        
        html += '</div>';
        
        return html;
    },

    /**
     * Render comparison of all transport modes
     * @param {Array} modesArray - Array of mode objects from Calculator.calculateAllModes()
     * @param {string} selectedMode - Currently selected transport mode
     * @returns {string} HTML string with comparison items
     */
    renderComparison: function(modesArray, selectedMode) {
        // Build HTML string for comparison section
        var html = '<div class="comparison__container">';
        
        // Find maximum emission for progress bar scaling
        var maxEmission = 0;
        for (var i = 0; i < modesArray.length; i++) {
            if (modesArray[i].emission > maxEmission) {
                maxEmission = modesArray[i].emission;
            }
        }
        
        // Iterate through each mode and create comparison item
        for (var i = 0; i < modesArray.length; i++) {
            var modeData = modesArray[i];
            var modeMetadata = CONFIG.TRANSPORT_MODES[modeData.mode];
            
            // Calculate progress bar width percentage
            var barWidth = maxEmission > 0 ? (modeData.emission / maxEmission) * 100 : 0;
            
            // Determine color based on percentage vs car
            var barColor = '';
            if (modeData.percentageVsCar <= 25) {
                barColor = '#10b981'; // Green (0-25%)
            } else if (modeData.percentageVsCar <= 75) {
                barColor = '#eab308'; // Yellow (25-75%)
            } else if (modeData.percentageVsCar <= 100) {
                barColor = '#f59e0b'; // Orange (75-100%)
            } else {
                barColor = '#ef4444'; // Red (>100%)
            }
            
            // Create comparison item container
            // Add 'comparison__item--selected' class if this is the selected mode
            var itemClass = 'comparison__item';
            if (modeData.mode === selectedMode) {
                itemClass += ' comparison__item--selected';
            }
            
            html += '<div class="' + itemClass + '">';
            
            // Header with mode icon, label, and selected badge
            html += '  <div class="comparison__item-header">';
            html += '    <div class="comparison__item-mode">';
            html += '      <span class="comparison__item-icon">' + modeMetadata.icon + '</span>';
            html += '      <span class="comparison__item-label">' + modeMetadata.label + '</span>';
            html += '    </div>';
            
            // Add "Selecionado" badge if this is the selected mode
            if (modeData.mode === selectedMode) {
                html += '    <span class="comparison__item-badge">Selecionado</span>';
            }
            
            html += '  </div>';
            
            // Stats section showing emission and percentage
            html += '  <div class="comparison__item-stats">';
            html += '    <div class="comparison__item-emission">';
            html += '      <span class="comparison__item-value">' + this.formatNumber(modeData.emission, 2) + '</span>';
            html += '      <span class="comparison__item-unit">kg CO₂</span>';
            html += '    </div>';
            html += '    <div class="comparison__item-vs-car">';
            html += '      <span>' + this.formatNumber(modeData.percentageVsCar, 0) + '%</span>';
            html += '      <span class="comparison__item-vs-label">vs Carro</span>';
            html += '    </div>';
            html += '  </div>';
            
            // Progress bar showing relative emission
            html += '  <div class="comparison__item-bar-container">';
            html += '    <div class="comparison__item-bar" style="width: ' + barWidth + '%; background-color: ' + barColor + ';"></div>';
            html += '  </div>';
            
            html += '</div>';
        }
        
        // Add tip box with helpful message
        html += '<div class="comparison__tip">';
        html += '  <div class="comparison__tip-icon">💡</div>';
        html += '  <div class="comparison__tip-content">';
        html += '    <strong>Dica:</strong> Optar por meios de transporte com menor emissão de CO₂ ';
        html += '    contribui significativamente para a redução do impacto ambiental.';
        html += '  </div>';
        html += '</div>';
        
        html += '</div>';
        
        return html;
    },

    /**
     * Render carbon credits information
     * @param {Object} creditsData - Object containing credits and price information
     * @returns {string} HTML string with carbon credits cards
     */
    renderCarbonCredits: function(creditsData) {
        // Build HTML string for carbon credits section
        var html = '<div class="carbon__container">';
        
        // Grid with 2 main cards
        html += '<div class="carbon__grid">';
        
        // Card 1: Credits needed
        html += '  <div class="carbon__card">';
        html += '    <div class="carbon__card-icon">🌱</div>';
        html += '    <h3 class="carbon__card-title">Créditos Necessários</h3>';
        html += '    <p class="carbon__card-value">' + this.formatNumber(creditsData.credits, 4) + '</p>';
        html += '    <p class="carbon__card-helper">1 crédito = 1.000 kg CO₂</p>';
        html += '  </div>';
        
        // Card 2: Estimated price
        html += '  <div class="carbon__card">';
        html += '    <div class="carbon__card-icon">💵</div>';
        html += '    <h3 class="carbon__card-title">Valor Estimado</h3>';
        html += '    <p class="carbon__card-value">' + this.formatCurrency(creditsData.price.average) + '</p>';
        html += '    <p class="carbon__card-helper">';
        html += '      Faixa: ' + this.formatCurrency(creditsData.price.min);
        html += '      - ' + this.formatCurrency(creditsData.price.max);
        html += '    </p>';
        html += '  </div>';
        
        html += '</div>';
        
        // Info box explaining carbon credits
        html += '<div class="carbon__info">';
        html += '  <div class="carbon__info-icon">ℹ️</div>';
        html += '  <div class="carbon__info-content">';
        html += '    <h4 class="carbon__info-title">O que são créditos de carbono?</h4>';
        html += '    <p class="carbon__info-text">';
        html += '      Créditos de carbono são certificados que representam a redução de uma tonelada ';
        html += '      de CO₂ na atmosfera. Você pode compensar suas emissões investindo em projetos ';
        html += '      de preservação ambiental, reflorestamento ou energia renovável.';
        html += '    </p>';
        html += '  </div>';
        html += '</div>';
        
        // Action button (non-functional for demo)
        html += '<div class="carbon__action">';
        html += '  <button class="carbon__button" type="button">';
        html += '    <span class="carbon__button-icon">🌍</span>';
        html += '    <span class="carbon__button-text">Compensar Emissões</span>';
        html += '  </button>';
        html += '  <p class="carbon__action-note">* Recurso demonstrativo</p>';
        html += '</div>';
        
        html += '</div>';
        
        return html;
    },

    /* ========== LOADING STATE METHODS ========== */

    /**
     * Show loading state on button
     * @param {HTMLElement} buttonElement - Button element to show loading state
     */
    showLoading: function(buttonElement) {
        if (!buttonElement) {
            console.error('Button element not provided');
            return;
        }
        
        // Save original text in data attribute
        buttonElement.dataset.originalText = buttonElement.innerHTML;
        
        // Disable button
        buttonElement.disabled = true;
        
        // Change innerHTML to show spinner and "Calculando..." text
        buttonElement.innerHTML = '<span class="spinner"></span>Calculando...';
    },

    /**
     * Hide loading state and restore button
     * @param {HTMLElement} buttonElement - Button element to restore
     */
    hideLoading: function(buttonElement) {
        if (!buttonElement) {
            console.error('Button element not provided');
            return;
        }
        
        // Enable button
        buttonElement.disabled = false;
        
        // Restore original text from data attribute
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
};
