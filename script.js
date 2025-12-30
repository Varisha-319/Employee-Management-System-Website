// EMPLOYEE MANAGEMENT SYSTEM - Single JavaScript File

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Dashboard Sidebar Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Employee Form Toggle
const toggleForm = document.getElementById('toggleForm');
const employeeForm = document.getElementById('employeeForm');

if (toggleForm && employeeForm) {
    toggleForm.addEventListener('click', () => {
        if (employeeForm.style.display === 'none' || employeeForm.style.display === '') {
            employeeForm.style.display = 'block';
            toggleForm.textContent = 'Hide Form';
        } else {
            employeeForm.style.display = 'none';
            toggleForm.textContent = 'Show Form';
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const alertDiv = document.getElementById('alert');
        
        try {
            const response = await fetch('login.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                alertDiv.className = 'alert success';
                alertDiv.textContent = data.message;
                alertDiv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                alertDiv.className = 'alert error';
                alertDiv.textContent = data.message;
                alertDiv.style.display = 'block';
            }
        } catch (error) {
            alertDiv.className = 'alert error';
            alertDiv.textContent = 'An error occurred. Please try again.';
            alertDiv.style.display = 'block';
        }
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const alertDiv = document.getElementById('alert');
        
        if (password !== confirmPassword) {
            alertDiv.className = 'alert error';
            alertDiv.textContent = 'Passwords do not match!';
            alertDiv.style.display = 'block';
            return;
        }
        
        const formData = new FormData(signupForm);
        
        try {
            const response = await fetch('register.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                alertDiv.className = 'alert success';
                alertDiv.textContent = data.message;
                alertDiv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                alertDiv.className = 'alert error';
                alertDiv.textContent = data.message;
                alertDiv.style.display = 'block';
            }
        } catch (error) {
            alertDiv.className = 'alert error';
            alertDiv.textContent = 'An error occurred. Please try again.';
            alertDiv.style.display = 'block';
        }
    });
}

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        const response = await fetch('get-stats.php');
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('totalEmployees').textContent = data.stats.total || 0;
            document.getElementById('activeEmployees').textContent = data.stats.active || 0;
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Load Recent Employees
async function loadRecentEmployees() {
    try {
        const response = await fetch('get-employees.php?limit=5');
        const data = await response.json();
        
        const tableBody = document.querySelector('#recentEmployeesTable tbody');
        
        if (data.success && data.employees.length > 0) {
            tableBody.innerHTML = '';
            
            data.employees.forEach(emp => {
                const row = `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.email}</td>
                        <td>${emp.department}</td>
                        <td><span class="badge ${emp.status === 'Active' ? 'success' : 'danger'}">${emp.status}</span></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No employees found</td></tr>';
        }
    } catch (error) {
        console.error('Failed to load employees:', error);
        document.querySelector('#recentEmployeesTable tbody').innerHTML = 
            '<tr><td colspan="5" class="text-center">Error loading employees</td></tr>';
    }
}

// Load All Employees
async function loadAllEmployees() {
    try {
        const response = await fetch('get-employees.php');
        const data = await response.json();
        
        const tableBody = document.querySelector('#employeesTable tbody');
        
        if (data.success && data.employees.length > 0) {
            tableBody.innerHTML = '';
            
            data.employees.forEach(emp => {
                const row = `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.email}</td>
                        <td>${emp.department}</td>
                        <td>${emp.position}</td>
                        <td><span class="badge ${emp.status === 'Active' ? 'success' : 'danger'}">${emp.status}</span></td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No employees found</td></tr>';
        }
    } catch (error) {
        console.error('Failed to load employees:', error);
        document.querySelector('#employeesTable tbody').innerHTML = 
            '<tr><td colspan="7" class="text-center">Error loading employees</td></tr>';
    }
}

// Add Employee Form Handler
if (employeeForm) {
    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(employeeForm);
        
        try {
            const response = await fetch('add-employee.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('Employee added successfully!');
                employeeForm.reset();
                loadAllEmployees();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Failed to add employee:', error);
            alert('Error adding employee');
        }
    });
}

// Delete Employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }
    
    try {
        const response = await fetch('delete-employee.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `emp_id=${id}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            loadAllEmployees();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Failed to delete employee:', error);
        alert('Error deleting employee');
    }
}

// Search Employees
const searchInput = document.getElementById('searchEmployee');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#employeesTable tbody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
    // Dashboard page
    if (document.getElementById('recentEmployeesTable')) {
        loadDashboardStats();
        loadRecentEmployees();
    }
    
    // Employees page
    if (document.getElementById('employeesTable')) {
        loadAllEmployees();
    }
});

console.log('EMS - Employee Management System Loaded');
