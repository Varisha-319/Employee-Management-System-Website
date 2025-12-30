<?php
header('Content-Type: application/json');
require_once 'config.php';

$conn = getDB();

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;

if ($limit > 0) {
    $stmt = $conn->prepare("SELECT id, name, email, phone, department, position, salary, join_date, status FROM employees ORDER BY id DESC LIMIT ?");
    $stmt->bind_param("i", $limit);
} else {
    $stmt = $conn->prepare("SELECT id, name, email, phone, department, position, salary, join_date, status FROM employees ORDER BY id DESC");
}

$stmt->execute();
$result = $stmt->get_result();

$employees = [];
while ($row = $result->fetch_assoc()) {
    $employees[] = $row;
}

echo json_encode(['success' => true, 'employees' => $employees]);

$stmt->close();
$conn->close();
?>
