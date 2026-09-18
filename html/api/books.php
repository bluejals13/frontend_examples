<?php
// html/api/books.php
session_start();

// 세션에 초기 도서 목록 배열이 없으면 생성
if (!isset($_SESSION['books'])) {
    $_SESSION['books'] = [];
    $_SESSION['auto_increment'] = 1;
}

$method = $_SERVER['REQUEST_METHOD'];

// GET 요청 (조회)
if ($method === 'GET') {
    // 1. 단건 삭제 요청인 경우
    if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $_SESSION['books'] = array_filter($_SESSION['books'], function($b) use ($id) {
            return $b['id'] !== $id;
        });
        echo json_encode(['success' => true]);
        exit;
    }
    
    // 2. 단건 조회 요청인 경우
    if (isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        foreach ($_SESSION['books'] as $book) {
            if ($book['id'] === $id) {
                echo json_encode($book);
                exit;
            }
        }
    }
    
    // 3. 전체 목록 조회
    // array_values를 통해 인덱스를 재정렬하여 깨끗한 JSON 배열 형태로 반환
    echo json_encode(array_values($_SESSION['books']));
    exit;
}

// POST 요청 (등록 및 수정)
if ($method === 'POST') {
    // 폼 데이터 받기
    $id = isset($_POST['id']) && $_POST['id'] !== '' ? (int)$_POST['id'] : null;
    
    $bookData = [
        'title' => $_POST['title'] ?? '',
        'author' => $_POST['author'] ?? '',
        'isbn' => $_POST['isbn'] ?? '',
        'price' => $_POST['price'] !== '' ? (int)$_POST['price'] : null,
        'pageCount' => $_POST['pageCount'] !== '' ? (int)$_POST['pageCount'] : null,
        'publishDate' => $_POST['publishDate'] ?? null,
    ];

    if ($id) {
        // 수정 로직
        foreach ($_SESSION['books'] as &$book) {
            if ($book['id'] === $id) {
                $book = array_merge($book, $bookData);
                break;
            }
        }
    } else {
        // 등록 로직
        $bookData['id'] = $_SESSION['auto_increment']++;
        $_SESSION['books'][] = $bookData;
    }

    echo json_encode(['success' => true]);
    exit;
}
?>
