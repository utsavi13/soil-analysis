// Check admin authentication
document.addEventListener('DOMContentLoaded', () => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
        window.location.href = 'admin-login.html';
        return;
    }

    const adminData = JSON.parse(localStorage.getItem('adminData'));
    document.getElementById('adminName').textContent = `Admin: ${adminData.username}`;

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        window.location.href = 'admin-login.html';
    });

    // Load initial data
    loadCrops();
    loadFertilizers();
    loadStatistics();

    // Form submissions
    document.getElementById('cropForm').addEventListener('submit', handleCropSubmit);
    document.getElementById('fertilizerForm').addEventListener('submit', handleFertilizerSubmit);
});

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// CROPS CRUD OPERATIONS
async function loadCrops() {
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch('http://localhost:3000/api/admin/crops', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
            displayCrops(data.crops);
        }
    } catch (error) {
        console.error('Error loading crops:', error);
    }
}

function displayCrops(crops) {
    const tbody = document.getElementById('cropsTableBody');
    tbody.innerHTML = '';
    
    crops.forEach(crop => {
        const row = `
            <tr>
                <td>${crop.crop_id}</td>
                <td>${crop.crop_name}</td>
                <td>${crop.ideal_pH_min} - ${crop.ideal_pH_max}</td>
                <td>${crop.ideal_N}</td>
                <td>${crop.ideal_P}</td>
                <td>${crop.ideal_K}</td>
                <td class="action-btns">
                    <button class="btn btn-secondary btn-sm" onclick="editCrop(${crop.crop_id})">✏️ Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCrop(${crop.crop_id}, '${crop.crop_name}')">🗑️ Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openAddCropModal() {
    document.getElementById('cropModalTitle').textContent = 'Add New Crop';
    document.getElementById('cropForm').reset();
    document.getElementById('cropId').value = '';
    document.getElementById('cropModal').classList.add('active');
}

async function editCrop(cropId) {
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch(`http://localhost:3000/api/admin/crops/${cropId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('cropModalTitle').textContent = 'Edit Crop';
            document.getElementById('cropId').value = data.crop.crop_id;
            document.getElementById('cropName').value = data.crop.crop_name;
            document.getElementById('cropPHMin').value = data.crop.ideal_pH_min;
            document.getElementById('cropPHMax').value = data.crop.ideal_pH_max;
            document.getElementById('cropN').value = data.crop.ideal_N;
            document.getElementById('cropP').value = data.crop.ideal_P;
            document.getElementById('cropK').value = data.crop.ideal_K;
            document.getElementById('cropModal').classList.add('active');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleCropSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const cropId = document.getElementById('cropId').value;
    
    const cropData = {
        crop_name: document.getElementById('cropName').value,
        ideal_pH_min: document.getElementById('cropPHMin').value,
        ideal_pH_max: document.getElementById('cropPHMax').value,
        ideal_N: document.getElementById('cropN').value,
        ideal_P: document.getElementById('cropP').value,
        ideal_K: document.getElementById('cropK').value
    };
    
    try {
        const url = cropId ? 
            `http://localhost:3000/api/admin/crops/${cropId}` : 
            'http://localhost:3000/api/admin/crops';
        
        const response = await fetch(url, {
            method: cropId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cropData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            closeModal('cropModal');
            loadCrops();
        } else {
            alert(data.error || 'Operation failed');
        }
    } catch (error) {
        alert('Network error');
        console.error('Error:', error);
    }
}

async function deleteCrop(cropId, cropName) {
    if (!confirm(`Delete crop "${cropName}"? This will also delete its ideal requirements.`)) {
        return;
    }
    
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch(`http://localhost:3000/api/admin/crops/${cropId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            loadCrops();
        } else {
            alert(data.error || 'Delete failed');
        }
    } catch (error) {
        alert('Network error');
        console.error('Error:', error);
    }
}

// FERTILIZERS CRUD OPERATIONS
async function loadFertilizers() {
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch('http://localhost:3000/api/admin/fertilizers', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
            displayFertilizers(data.fertilizers);
        }
    } catch (error) {
        console.error('Error loading fertilizers:', error);
    }
}

function displayFertilizers(fertilizers) {
    const tbody = document.getElementById('fertilizersTableBody');
    tbody.innerHTML = '';
    
    fertilizers.forEach(fert => {
        const row = `
            <tr>
                <td>${fert.fert_id}</td>
                <td>${fert.fert_name}</td>
                <td>${fert.nitrogen_content}%</td>
                <td>${fert.phosphorus_content}%</td>
                <td>${fert.potassium_content}%</td>
                <td class="action-btns">
                    <button class="btn btn-secondary btn-sm" onclick="editFertilizer(${fert.fert_id})">✏️ Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteFertilizer(${fert.fert_id}, '${fert.fert_name}')">🗑️ Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function openAddFertilizerModal() {
    document.getElementById('fertilizerModalTitle').textContent = 'Add New Fertilizer';
    document.getElementById('fertilizerForm').reset();
    document.getElementById('fertilizerId').value = '';
    document.getElementById('fertilizerModal').classList.add('active');
}

async function editFertilizer(fertId) {
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch(`http://localhost:3000/api/admin/fertilizers/${fertId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('fertilizerModalTitle').textContent = 'Edit Fertilizer';
            document.getElementById('fertilizerId').value = data.fertilizer.fert_id;
            document.getElementById('fertilizerName').value = data.fertilizer.fert_name;
            document.getElementById('fertilizerN').value = data.fertilizer.nitrogen_content;
            document.getElementById('fertilizerP').value = data.fertilizer.phosphorus_content;
            document.getElementById('fertilizerK').value = data.fertilizer.potassium_content;
            document.getElementById('fertilizerModal').classList.add('active');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleFertilizerSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const fertId = document.getElementById('fertilizerId').value;
    
    const fertData = {
        fert_name: document.getElementById('fertilizerName').value,
        nitrogen_content: document.getElementById('fertilizerN').value,
        phosphorus_content: document.getElementById('fertilizerP').value,
        potassium_content: document.getElementById('fertilizerK').value
    };
    
    try {
        const url = fertId ? 
            `http://localhost:3000/api/admin/fertilizers/${fertId}` : 
            'http://localhost:3000/api/admin/fertilizers';
        
        const response = await fetch(url, {
            method: fertId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(fertData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            closeModal('fertilizerModal');
            loadFertilizers();
        } else {
            alert(data.error || 'Operation failed');
        }
    } catch (error) {
        alert('Network error');
        console.error('Error:', error);
    }
}

async function deleteFertilizer(fertId, fertName) {
    if (!confirm(`Delete fertilizer "${fertName}"?`)) {
        return;
    }
    
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch(`http://localhost:3000/api/admin/fertilizers/${fertId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            loadFertilizers();
        } else {
            alert(data.error || 'Delete failed');
        }
    } catch (error) {
        alert('Network error');
        console.error('Error:', error);
    }
}

// STATISTICS
async function loadStatistics() {
    const token = localStorage.getItem('adminToken');
    try {
        const response = await fetch('http://localhost:3000/api/admin/statistics', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('totalFarmers').textContent = data.stats.totalFarmers;
            document.getElementById('totalTests').textContent = data.stats.totalTests;
            document.getElementById('totalCrops').textContent = data.stats.totalCrops;
            document.getElementById('totalFertilizers').textContent = data.stats.totalFertilizers;
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
