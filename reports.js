document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    const farmerData = JSON.parse(localStorage.getItem('farmerData'));
    if (!farmerData) {
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

    loadReports(farmerData.id);
});

async function loadReports(farmerId) {
    const authToken = localStorage.getItem('authToken');
    const container = document.getElementById('reportsList');

    try {
        const response = await fetch(`http://localhost:3000/api/reports/${farmerId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            displayReports(data.reports);
        } else {
            container.innerHTML = '<p>Failed to load reports</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Network error. Please check if the server is running.</p>';
    }
}

function displayReports(reports) {
    const container = document.getElementById('reportsList');
    container.innerHTML = '';

    if (!reports || reports.length === 0) {
        container.innerHTML = '<p>No previous reports found. Submit your first soil test!</p>';
        return;
    }

    reports.forEach(report => {
        const reportCard = document.createElement('div');
        reportCard.className = 'report-card';

        const date = new Date(report.test_date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        reportCard.innerHTML = `
            <div class="report-header">
                <div class="report-date">📅 ${formattedDate}</div>
                <div>Test ID: ${report.test_id}</div>
            </div>
            <div class="report-data">
                <div class="detail-item">
                    <span>pH:</span>
                    <span>${report.pH}</span>
                </div>
                <div class="detail-item">
                    <span>Nitrogen:</span>
                    <span>${report.nitrogen} kg/ha</span>
                </div>
                <div class="detail-item">
                    <span>Phosphorus:</span>
                    <span>${report.phosphorus} kg/ha</span>
                </div>
                <div class="detail-item">
                    <span>Potassium:</span>
                    <span>${report.potassium} kg/ha</span>
                </div>
            </div>
            <div class="report-actions">
                <button class="btn btn-primary btn-sm" onclick="viewReport(${report.test_id}); event.stopPropagation();">
                    👁️ View
                </button>
                <button class="btn btn-secondary btn-sm" onclick="editReport(${report.test_id}); event.stopPropagation();">
                    ✏️ Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteReport(${report.test_id}); event.stopPropagation();">
                    🗑️ Delete
                </button>
            </div>
        `;

        container.appendChild(reportCard);
    });
}

function viewReport(testId) {
    window.location.href = `results.html?testId=${testId}`;
}

function editReport(testId) {
    window.location.href = `edit-test.html?testId=${testId}`;
}

async function deleteReport(testId) {
    if (!confirm('Are you sure you want to delete this soil test? This action cannot be undone.')) {
        return;
    }

    const authToken = localStorage.getItem('authToken');

    try {
        const response = await fetch(`http://localhost:3000/api/soil-test/${testId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert('Soil test deleted successfully!');
            // Reload reports
            const farmerData = JSON.parse(localStorage.getItem('farmerData'));
            loadReports(farmerData.id);
        } else {
            alert(data.error || 'Failed to delete soil test');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check if the server is running.');
    }
}
