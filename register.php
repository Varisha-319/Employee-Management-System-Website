<?php
header('Content-Type: application/json');
require_once 'config.php';

$fullname = trim($_POST['fullname'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (empty($fullname) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

$conn = getDB();

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (fullname, email, password, role, created_at) VALUES (?, ?, ?, 'admin', NOW())");
$stmt->bind_param("sss", $fullname, $email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}

$stmt->close();
$conn->close();
?>
