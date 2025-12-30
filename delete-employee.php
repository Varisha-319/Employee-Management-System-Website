<?php
header('Content-Type: application/json');
require_once 'config.php';

$emp_id = isset($_POST['emp_id']) ? intval($_POST['emp_id']) : 0;

if ($emp_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid employee ID']);
    exit;
}

$conn = getDB();

$stmt = $conn->prepare("SELECT id FROM employees WHERE id = ?");
$stmt->bind_param("i", $emp_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Employee not found']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
$stmt->bind_param("i", $emp_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Employee deleted successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete employee']);
}

$stmt->close();
$conn->close();
?>
