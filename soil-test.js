document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('soilTestForm');
    const messageDiv = document.getElementById('message');

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('farmerData');
        window.location.href = 'index.html';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const pH = parseFloat(document.getElementById('pH').value);
        const nitrogen = parseFloat(document.getElementById('nitrogen').value);
        const phosphorus = parseFloat(document.getElementById('phosphorus').value);
        const potassium = parseFloat(document.getElementById('potassium').value);

        // Basic validation
        if (pH < 0 || pH > 14) {
            showMessage('pH must be between 0 and 14', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/soil-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ pH, nitrogen, phosphorus, potassium })
            });

            const data = await response.json();

            if (response.ok) {
                // Store test ID and recommendations
                localStorage.setItem('lastTestId', data.testId);
                localStorage.setItem('lastRecommendations', JSON.stringify(data.recommendations));

                showMessage('Soil test submitted successfully! Redirecting to results...', 'success');
                setTimeout(() => {
                    window.location.href = `results.html?testId=${data.testId}`;
                }, 1500);
            } else {
                if (response.status === 401 || response.status === 403) {
                    showMessage('Session expired. Please login again.', 'error');
                    setTimeout(() => {
                        localStorage.clear();
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    showMessage(data.error || 'Failed to submit soil test', 'error');
                }
            }
        } catch (error) {
            showMessage('Network error. Please check if the server is running.', 'error');
            console.error('Error:', error);
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
    }
});
