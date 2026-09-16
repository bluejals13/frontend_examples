/* ---------------------------------------------------------
   메시지 표시 — 성공 / 실패 / 로딩
   --------------------------------------------------------- */

const formError = document.getElementById("formError");
const loadingMessage = document.getElementById("loadingMessage");

const COLORS = {
    error: "#f44336",
    success: "#4CAF50",
};

const MESSAGE_TIMEOUT = 3000;

let messageTimer = null;

/*
 * 메시지를 화면에 표시한다.
 *
 * type:
 *   error   → 빨간색
 *   success → 초록색
 *
 * timeout:
 *   0보다 크면 해당 시간 후 자동으로 사라진다.
 */
export function showMessage(
    text,
    type = "error",
    timeout = 0
) {
    clearTimeout(messageTimer);

    formError.textContent = text;

    formError.style.color =
        COLORS[type] ?? COLORS.error;

    formError.style.display = "block";

    if (timeout > 0) {
        messageTimer = setTimeout(
            clearMessages,
            timeout
        );
    }
}

/*
 * 오류 메시지
 */
export const showError = (text) =>
    showMessage(text, "error");

/*
 * 성공 메시지
 */
export const showSuccess = (text) =>
    showMessage(
        text,
        "success",
        MESSAGE_TIMEOUT
    );

/*
 * 메시지 삭제
 */
export function clearMessages() {
    clearTimeout(messageTimer);

    messageTimer = null;

    formError.textContent = "";
    formError.style.display = "none";
}

/*
 * 로딩 표시
 */
export function setLoading(isLoading = true) {
    loadingMessage.style.display =
        isLoading ? "block" : "none";
}
