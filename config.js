// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Helper function to get farmer data
function getFarmerData() {
    const data = localStorage.getItem('farmerData');
    return data ? JSON.parse(data) : null;
}

// Helper function to check if user is logged in
function isLoggedIn() {
    return !!getAuthToken();
}

// Helper function to logout
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('farmerData');
    window.location.href = 'index.html';
}

// Add logout functionality to all pages
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});
