document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    // Get farmer data
    const farmerData = JSON.parse(localStorage.getItem('farmerData'));
    if (farmerData) {
        document.getElementById('farmerName').textContent = farmerData.name;
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        localStorage.removeItem('farmerData');
        window.location.href = 'index.html';
    });
});
