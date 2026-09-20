<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>도서 관리 시스템</title>

    <!-- favicon 404 에러 방지용 dummy tag 추가 -->
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
    <!-- CSS 파일 연결 확인 -->
    <link rel="stylesheet" href="style.css">
    <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
    <div class="app-container">
        <h1>도서 관리 시스템 <span class="app-mode test">TEST</span></h1>

        <!-- BookForm 영역 -->
        <div class="form-card">
            <form id="bookForm">
                <input type="hidden" name="id" id="editingId" value="">
                
                <!-- 1. 기본 정보 -->
<div class="form-section">
    <div class="form-section-title">📌 기본 정보</div>
    <div class="field-grid">
        <div class="form-group">
            <label><span>제목:</span> <input type="text" name="title" required></label>
        </div>
        <div class="form-group">
            <label><span>저자:</span> <input type="text" name="author" required></label>
        </div>
        <div class="form-group">
            <label><span>ISBN:</span> <input type="text" name="isbn" required></label>
        </div>
        <div class="form-group">
            <label><span>가격:</span> <input type="number" name="price"></label>
        </div>
        <div class="form-group">
            <label><span>출판일:</span> <input type="date" name="publishDate"></label>
        </div>
    </div>
</div>

<!-- 2. 출판사 정보 -->
<div class="form-section">
    <div class="form-section-title">🏢 출판사 정보</div>
    <div class="field-grid">
        <div class="form-group">
            <label><span>출판사:</span> <input type="text" name="publisher"></label>
        </div>
    </div>
</div>

<!-- 3. 상세 정보 -->
<div class="form-section">
    <div class="form-section-title">📖 상세 정보</div>
    <div class="field-grid">
        <div class="form-group">
            <label><span>언어:</span> <input type="text" name="language"></label>
        </div>
        <div class="form-group">
            <label><span>페이지 수:</span> <input type="number" name="pageCount"></label>
        </div>
        <div class="form-group">
            <label><span>에디션:</span> <input type="text" name="edition"></label>
        </div>
        <div class="form-group full-width">
            <label><span>표지 이미지 URL:</span> <input type="url" name="coverImageUrl"></label>
        </div>
        <div class="form-group full-width">
            <label><span>설명:</span> <textarea name="description"></textarea></label>
        </div>
    </div>
</div>

                <!-- 하단 버튼 및 메시지 박스 -->
                <div class="button-group">
                    <button type="submit" id="submitBtn">도서 등록</button>
                    <button type="button" id="cancelBtn" style="display:none;">취소</button>
                </div>
                <div id="messageBox" style="display:none;" class="message-box"></div>
            </form>
        </div>

        <!-- BookTable 영역 -->
        <div class="table-card">
            <table id="bookTable">
                <thead>
                    <tr>
                        <th>제목</th><th>저자</th><th>ISBN</th><th>가격</th><th>페이지 수</th><th>출판일</th><th>관리</th>
                    </tr>
                </thead>
                <tbody id="bookListBody">
                    <!-- app.js 동적 데이터 -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="app.js"></script>
</body>
</html>