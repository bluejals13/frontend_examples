import TodoItem from "./TodoItem";
import { memo } from "react";

const TodoItemList = ({ myTodos, myToggle, myRemove }) => {

    const ids = myTodos.map(todo => todo.id);

    console.log("myTodos 개수:", myTodos.length);
    console.log("IDs:", ids);
    console.log("중복 여부:", ids.length !== new Set(ids).size);

    const todoList = myTodos.map(
        ({ id, text, checked }) => (
            <TodoItem
                id={id}
                text={text}
                checked={checked}
                onToggle={myToggle}
                onRemove={myRemove}
                key={id}
            />
        )
    );

    return (
        <div>
            {todoList}
        </div>
    );
};


 
//export default TodoItemList;
// myTodos 가 바뀔 때만 다시 그린다
export default memo(
    TodoItemList,
    (prevProps, nextProps) => prevProps.myTodos === nextProps.myTodos
);