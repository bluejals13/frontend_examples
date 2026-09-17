import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({ text, checked, id, onToggle, onRemove }) => {
    return (
        <div className="todo-item" onClick={() => onToggle(id)}>
            <div
                className="remove"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                }}
            >
                &times;
            </div>

            <div className={`todo-text ${checked && "checked"}`}>
                <div>{text}</div>
            </div>

            {checked && (
                <div className="check-mark">✓</div>
            )}
        </div>
    );
};

export default memo(TodoItem);

 
//export default TodoItem;
// checked 가 바뀔 때만 다시 그린다
//export default memo(
//    TodoItem,
//    (prevProps, nextProps) => prevProps.checked === //nextProps.checked
//);
