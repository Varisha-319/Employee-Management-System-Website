<?php
header('Content-Type: application/json');
require_once 'config.php';

$name = trim($_POST['emp_name'] ?? '');
$email = trim($_POST['emp_email'] ?? '');
$phone = trim($_POST['emp_phone'] ?? '');
$department = trim($_POST['emp_department'] ?? '');
$position = trim($_POST['emp_position'] ?? '');
$salary = trim($_POST['emp_salary'] ?? '');
$join_date = trim($_POST['emp_join_date'] ?? '');
$status = trim($_POST['emp_status'] ?? 'Active');

if (empty($name) || empty($email) || empty($phone) || empty($department) || empty($position) || empty($salary) || empty($join_date)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

$conn = getDB();

$stmt = $conn->prepare("SELECT id FROM employees WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Employee with this email already exists']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO employees (name, email, phone, department, position, salary, join_date, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("sssssdss", $name, $email, $phone, $department, $position, $salary, $join_date, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Employee added successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add employee']);
}

$stmt->close();
$conn->close();
?>
