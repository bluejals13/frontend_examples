<!-- html/index.php -->
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>도서 관리 시스템 (PHP+jQuery)</title>
    <link rel="stylesheet" href="style.css">
    <!-- jQuery 최신 CDN -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <h1>도서 관리 시스템</h1>

    <!-- BookForm 영역 -->
    <div>
        <form id="bookForm">
            <!-- 상태 관리를 위한 hidden input (React의 editingId 역할) -->
            <input type="hidden" name="id" id="editingId" value="">
            
            <div><label>제목:</label><input type="text" name="title" required></div>
            <div><label>저자:</label><input type="text" name="author" required></div>
            <div><label>ISBN:</label><input type="text" name="isbn" required></div>
            <div><label>가격:</label><input type="number" name="price"></div>
            <div><label>페이지 수:</label><input type="number" name="pageCount"></div>
            <div><label>출판일:</label><input type="date" name="publishDate"></div>
            <div><label>언어:</label><input type="text" name="language"></div>
            <div><label>출판사:</label><input type="text" name="publisher"></div>
            <div><label>에디션:</label><input type="text" name="edition"></div>
            <div><label>표지 이미지 URL:</label><input type="url" name="coverImageUrl"></div>
            <div><label>설명:</label><textarea name="description"></textarea></div>

            <div class="button-group">
                <button type="submit" id="submitBtn">도서 등록</button>
                <button type="button" id="cancelBtn" style="display:none;">취소</button>
            </div>
            
            <!-- MessageBox 영역 -->
            <div id="messageBox" style="display:none;" class="message-box"></div>
        </form>
    </div>

    <!-- BookTable 영역 -->
    <table id="bookTable">
        <thead>
            <tr>
                <th>제목</th><th>저자</th><th>ISBN</th><th>가격</th><th>페이지 수</th><th>출판일</th><th>관리</th>
            </tr>
        </thead>
        <tbody id="bookListBody">
            <!-- app.js가 이 곳에 데이터를 밀어넣습니다. -->
        </tbody>
    </table>

    <!-- 로직 스크립트 연결 -->
    <script src="app.js"></script>
</body>
</html>
