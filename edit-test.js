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

    // Get test ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('testId');

    if (!testId) {
        alert('No test ID provided');
        window.location.href = 'reports.html';
        return;
    }

    // Load existing test data
    loadTestData(testId);

    // Handle form submission
    const form = document.getElementById('editTestForm');
    form.addEventListener('submit', handleUpdate);
});

async function loadTestData(testId) {
    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`http://localhost:3000/api/recommendations/${testId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Populate form with existing data
            document.getElementById('testId').value = testId;
            document.getElementById('pH').value = data.testData.pH;
            document.getElementById('nitrogen').value = data.testData.nitrogen;
            document.getElementById('phosphorus').value = data.testData.phosphorus;
            document.getElementById('potassium').value = data.testData.potassium;
        } else {
            alert(data.error || 'Failed to load test data');
            window.location.href = 'reports.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check if the server is running.');
    }
}

async function handleUpdate(e) {
    e.preventDefault();

    const testId = document.getElementById('testId').value;
    const pH = parseFloat(document.getElementById('pH').value);
    const nitrogen = parseFloat(document.getElementById('nitrogen').value);
    const phosphorus = parseFloat(document.getElementById('phosphorus').value);
    const potassium = parseFloat(document.getElementById('potassium').value);
    const messageDiv = document.getElementById('message');

    // Basic validation
    if (pH < 0 || pH > 14) {
        showMessage('pH must be between 0 and 14', 'error');
        return;
    }

    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`http://localhost:3000/api/soil-test/${testId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ pH, nitrogen, phosphorus, potassium })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Soil test updated successfully! Redirecting to results...', 'success');
            setTimeout(() => {
                window.location.href = `results.html?testId=${testId}`;
            }, 1500);
        } else {
            if (response.status === 401 || response.status === 403) {
                showMessage('Session expired. Please login again.', 'error');
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showMessage(data.error || 'Failed to update soil test', 'error');
            }
        }
    } catch (error) {
        showMessage('Network error. Please check if the server is running.', 'error');
        console.error('Error:', error);
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}
