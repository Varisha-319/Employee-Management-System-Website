<?php
header('Content-Type: application/json');
require_once 'config.php';

$conn = getDB();

$result = $conn->query("SELECT COUNT(*) as total FROM employees");
$total_employees = $result->fetch_assoc()['total'];

$result = $conn->query("SELECT COUNT(*) as active FROM employees WHERE status = 'Active'");
$active_employees = $result->fetch_assoc()['active'];

echo json_encode([
    'success' => true,
    'stats' => [
        'total' => $total_employees,
        'active' => $active_employees
    ]
]);

$conn->close();
?>
