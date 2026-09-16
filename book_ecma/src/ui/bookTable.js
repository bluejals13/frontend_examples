/* ---------------------------------------------------------
   도서 목록 표 그리기
   --------------------------------------------------------- */

export const bookTableBody =
    document.getElementById("bookTableBody");

const COLUMN_COUNT = 7;

function formatPrice(price) {
    if (price == null) return "-";
    return `₩${price.toLocaleString()}`;
}

function createMessageRow(
    message,
    className = "empty-row"
) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = COLUMN_COUNT;
    cell.className = className;
    cell.textContent = message;

    row.appendChild(cell);

    return row;
}

function addCell(row, value) {
    const cell = document.createElement("td");

    cell.textContent = value ?? "-";

    row.appendChild(cell);
}

function createActionButton(
    action,
    label,
    className,
    id
) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = className;
    button.textContent = label;

    button.dataset.action = action;
    button.dataset.id = id;

    return button;
}

function createBookRow(book) {
    const {
        id,
        title,
        author,
        isbn,
        price,
        publishDate,
        publisher,
        detail
    } = book;

    const row = document.createElement("tr");

    addCell(row, title);
    addCell(row, author);
    addCell(row, isbn);
    addCell(row, formatPrice(price));
    addCell(row, publishDate);

    /*
     * Spring BookDTO.Response 구조에서는
     *
     * publisher = 출판사 Entity
     * detail    = BookDetail
     *
     * 이므로 상세 출판사가 아니라
     * Publisher의 name을 목록에 표시한다.
     */
    addCell(
        row,
        publisher?.name ?? "-"
    );

    const actionCell = document.createElement("td");

    actionCell.appendChild(
        createActionButton(
            "edit",
            "수정",
            "edit-btn",
            id
        )
    );

    actionCell.appendChild(
        createActionButton(
            "delete",
            "삭제",
            "delete-btn",
            id
        )
    );

    actionCell.appendChild(
        createActionButton(
            "detail",
            "상세",
            "detail-btn",
            id
        )
    );

    row.appendChild(actionCell);

    return row;
}

export function renderBookTable(books = []) {
    bookTableBody.innerHTML = "";

    if (books.length === 0) {
        bookTableBody.appendChild(
            createMessageRow("등록된 도서가 없습니다.")
        );

        return;
    }

    books.forEach((book) => {
        bookTableBody.appendChild(
            createBookRow(book)
        );
    });
}

export function renderTableError(
    message = "오류: 데이터를 불러올 수 없습니다."
) {
    bookTableBody.innerHTML = "";

    bookTableBody.appendChild(
        createMessageRow(
            message,
            "error-row"
        )
    );
}
