document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('farmerData');
        window.location.href = 'index.html';
    });

    // Get test ID from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('testId') || localStorage.getItem('lastTestId');

    if (!testId) {
        alert('No test data found');
        window.location.href = 'dashboard.html';
        return;
    }

    loadRecommendations(testId);
});

async function loadRecommendations(testId) {
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`http://localhost:3000/api/recommendations/${testId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            displayResults(data);
        } else {
            alert(data.error || 'Failed to load recommendations');
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check if the server is running.');
    }
}

function displayResults(data) {
    console.log('Full API Response:', data);
    
    const testData = data.testData;
    const recommendations = data.recommendations;

    console.log('Test Data:', testData);
    console.log('Recommendations:', recommendations);
    console.log('Crops:', recommendations.crops);
    console.log('Fertilizers:', recommendations.fertilizers);

    // Display soil summary
    document.getElementById('soilPH').textContent = testData.pH;
    document.getElementById('soilN').textContent = `${testData.nitrogen} kg/ha`;
    document.getElementById('soilP').textContent = `${testData.phosphorus} kg/ha`;
    document.getElementById('soilK').textContent = `${testData.potassium} kg/ha`;

    // Parse JSON if needed
    let crops = recommendations.crops;
    let fertilizers = recommendations.fertilizers;

    // Check if crops is a string (JSON) and parse it
    if (typeof crops === 'string') {
        try {
            crops = JSON.parse(crops);
            console.log('Parsed crops:', crops);
        } catch (e) {
            console.error('Error parsing crops:', e);
        }
    }

    // Check if fertilizers is a string (JSON) and parse it
    if (typeof fertilizers === 'string') {
        try {
            fertilizers = JSON.parse(fertilizers);
            console.log('Parsed fertilizers:', fertilizers);
        } catch (e) {
            console.error('Error parsing fertilizers:', e);
        }
    }

    // Display crop recommendations
    displayCropRecommendations(crops);

    // Display fertilizer recommendations
    displayFertilizerRecommendations(fertilizers);
}

function displayCropRecommendations(crops) {
    const container = document.getElementById('cropRecommendations');
    container.innerHTML = '';

    if (!crops || crops.length === 0) {
        container.innerHTML = '<p>No crop recommendations available</p>';
        return;
    }

    crops.forEach((crop, index) => {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';
        
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;

        cropCard.innerHTML = `
            <h4>${medal} ${crop.cropName}</h4>
            <p><strong>Suitability Score:</strong> ${crop.score.toFixed(2)}</p>
            <div class="crop-details">
                <div class="detail-item">
                    <span>Ideal pH:</span>
                    <span>${crop.idealRequirements.pH}</span>
                </div>
                <div class="detail-item">
                    <span>Ideal N:</span>
                    <span>${crop.idealRequirements.N} kg/ha</span>
                </div>
                <div class="detail-item">
                    <span>Ideal P:</span>
                    <span>${crop.idealRequirements.P} kg/ha</span>
                </div>
                <div class="detail-item">
                    <span>Ideal K:</span>
                    <span>${crop.idealRequirements.K} kg/ha</span>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <p><strong>Nutrient Deviations:</strong></p>
                <p style="font-size: 14px; color: #666;">
                    N: ${crop.deviations.nitrogen > 0 ? '+' : ''}${crop.deviations.nitrogen.toFixed(2)} | 
                    P: ${crop.deviations.phosphorus > 0 ? '+' : ''}${crop.deviations.phosphorus.toFixed(2)} | 
                    K: ${crop.deviations.potassium > 0 ? '+' : ''}${crop.deviations.potassium.toFixed(2)}
                </p>
            </div>
        `;

        container.appendChild(cropCard);
    });
}

function displayFertilizerRecommendations(fertilizers) {
    const container = document.getElementById('fertilizerRecommendations');
    container.innerHTML = '';

    if (!fertilizers || fertilizers.length === 0) {
        container.innerHTML = '<div class="fertilizer-card"><p>No fertilizer recommendations needed. Your soil nutrients are balanced!</p></div>';
        return;
    }

    fertilizers.forEach(fert => {
        const fertCard = document.createElement('div');
        fertCard.className = 'fertilizer-card';

        const statusClass = fert.status ? fert.status.toLowerCase() : 'normal';

        fertCard.innerHTML = `
            <h4>${fert.nutrient} ${fert.status ? `<span class="status ${statusClass}">${fert.status}</span>` : ''}</h4>
            ${fert.deficiency ? `<p><strong>Deficiency:</strong> ${fert.deficiency} kg/ha</p>` : ''}
            <p><strong>Recommended Fertilizer:</strong> ${fert.fertilizer}</p>
            <p><strong>Composition:</strong> ${fert.composition}</p>
            <p><strong>Estimated Amount:</strong> ${fert.estimatedAmount}</p>
        `;

        container.appendChild(fertCard);
    });
}
