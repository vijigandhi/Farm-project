<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


require './db/Connection.php';

// Function to send a JSON response
function send_response($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);


// Validate required fields
$required_fields = ['first_name', 'last_name', 'email', 'password', 'address_line1', 'city', 'state', 'pincode', 'country', 'telephone'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        send_response('error', "The field '$field' is required.");
    }
}

// Extract data
$first_name = $data['first_name'];
$last_name = $data['last_name'];
$email = $data['email'];
$password = $data['password'];
$address_line1 = $data['address_line1'];
$address_line2 = $data['address_line2'] ?? '';
$address_line3 = $data['address_line3'] ?? '';
$city = $data['city'];
$state = $data['state'];
$pincode = $data['pincode'];
$country = $data['country'];
$telephone = $data['telephone'];

// Hash the password
$password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into database
try {

    $stmt = $pdo->prepare("INSERT INTO CustomerDetails (first_name, last_name, email, password_hash, address_line1, address_line2, address_line3, city, state, pincode, country, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$first_name, $last_name, $email, $password_hash, $address_line1, $address_line2, $address_line3, $city, $state, $pincode, $country, $telephone]);
    
    // Send success response
    send_response('success', 'User registered successfully');
    
} catch (PDOException $e) {
    // Send error response
    send_response('error', 'Database error: ' . $e->getMessage());
}
?>
