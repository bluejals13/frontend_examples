export const bookForm = document.getElementById("bookForm");
export const cancelButton = document.getElementById("cancelButton");

const submitButton = bookForm.querySelector('button[type="submit"]');
const formContainer = bookForm.closest(".form-container");

function toNumberOrNull(value) {
    if (!value || !value.trim()) {
        return null;
    }

    const number = Number(value);

    return Number.isNaN(number) ? null : number;
}

export function collectBookData() {
    const formData = new FormData(bookForm);

    const publisherIdValue = formData.get("publisherId");

    return {
        title: (formData.get("title") || "").trim(),

        author: (formData.get("author") || "").trim(),

        isbn: (formData.get("isbn") || "").trim(),

        price: toNumberOrNull(formData.get("price")),

        publishDate: formData.get("publishDate") || null,

        publisherId:
            publisherIdValue && publisherIdValue.trim()
                ? Number(publisherIdValue)
                : null,

        detailRequest: {
            description: (formData.get("description") || "").trim(),

            language: (formData.get("language") || "").trim(),

            pageCount: toNumberOrNull(
                formData.get("pageCount")
            ),

            publisher: (formData.get("publisher") || "").trim(),

            coverImageUrl: (
                formData.get("coverImageUrl") || ""
            ).trim(),

            edition: (
                formData.get("edition") || ""
            ).trim(),
        },
    };
}

export function fillForm(book) {
    const {
        title,
        author,
        isbn,
        price,
        publishDate,
        publisher,
        detail,
    } = book;

    bookForm.title.value = title ?? "";
    bookForm.author.value = author ?? "";
    bookForm.isbn.value = isbn ?? "";

    bookForm.price.value = price ?? "";
    bookForm.publishDate.value = publishDate ?? "";

    if (bookForm.publisherId) {
        bookForm.publisherId.value =
            publisher?.id ?? "";
    }

    bookForm.description.value =
        detail?.description ?? "";

    bookForm.language.value =
        detail?.language ?? "";

    bookForm.pageCount.value =
        detail?.pageCount ?? "";

    bookForm.publisher.value =
        detail?.publisher ?? "";

    bookForm.coverImageUrl.value =
        detail?.coverImageUrl ?? "";

    bookForm.edition.value =
        detail?.edition ?? "";
}

export function setEditMode(isEditing = false) {
    submitButton.textContent =
        isEditing ? "도서 수정" : "도서 등록";

    cancelButton.style.display =
        isEditing ? "inline-block" : "none";

    formContainer.classList.toggle(
        "editing",
        isEditing
    );
}

export function resetForm() {
    bookForm.reset();
    setEditMode(false);
}

export function scrollToForm() {
    bookForm.scrollIntoView({
        behavior: "smooth",
    });
}
