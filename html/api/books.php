<?php
// html/api/books.php
header('Content-Type: application/json; charset=utf-8');

// ★ 도커 컴포즈 내부 네트워크에서는 서비스명(backend)으로 100% 통신 가능!
$API_BASE_URL = 'http://backend:8081/api/books';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $targetUrl = isset($_GET['id']) ? ($API_BASE_URL . '/' . (int)$_GET['id']) : $API_BASE_URL;

    $ch = curl_init($targetUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4); // ★ IPv4 통신 강제 추가
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        echo json_encode(["error" => "cURL 실패", "message" => $curlError]);
        exit;
    }

    if (trim($response) === '' || $httpCode !== 200) {
        echo json_encode([
            "error" => "Spring Boot 응답 이상",
            "http_code" => $httpCode,
            "raw_response" => $response
        ]);
        exit;
    }

    echo $response;
    exit;
}

// POST 처리
if ($method === 'POST') {
    $id = isset($_POST['id']) && $_POST['id'] !== '' ? (int)$_POST['id'] : null;

    $requestData = [
        'title'        => $_POST['title'] ?? '',
        'author'       => $_POST['author'] ?? '',
        'isbn'         => $_POST['isbn'] ?? '',
        'price'        => ($_POST['price'] !== '' && $_POST['price'] !== null) ? (int)$_POST['price'] : null,
        'publishDate'  => !empty($_POST['publishDate']) ? $_POST['publishDate'] : null,
        'publisher'    => [
            'name' => $_POST['publisher'] ?? ''
        ],
        'detail'       => [
            'language'      => $_POST['language'] ?? '',
            'pageCount'     => ($_POST['pageCount'] !== '' && $_POST['pageCount'] !== null) ? (int)$_POST['pageCount'] : null,
            'edition'       => $_POST['edition'] ?? '',
            'coverImageUrl' => $_POST['coverImageUrl'] ?? '',
            'description'   => $_POST['description'] ?? ''
        ]
    ];

    $targetUrl = $id ? ($API_BASE_URL . '/' . $id) : $API_BASE_URL;
    $httpMethod = $id ? 'PUT' : 'POST';

    $ch = curl_init($targetUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $httpMethod);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);

    echo json_encode(['success' => true]);
    exit;
}
?>