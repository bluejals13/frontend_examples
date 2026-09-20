// src/components/BookFormField.jsx

/*
 * [결정 사항] textarea는 어떻게 할까?
 * 선택: type="textarea" 도 다루게 한다.
 * 이유: 조건문이 하나 늘어나지만, 폼을 구성하는 파일 개수를 늘리지 않고 
 * 하나의 컴포넌트(BookFormField)로 모든 입력칸을 통일감 있게 관리하기 위함입니다.
 */
export default function BookFormField({ label, name, type = "text", required = false, value, onChange }) {
  return (
    <div>
      <label>{label}:</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          required={required}
          value={value ?? ""}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={value ?? ""}
          onChange={onChange}
        />
      )}
    </div>
  );
}