import './TodoContainer.scss'
import TodoForm from "../TodoForm/TodoForm";
import TodoItemContainer from "../TodoItemContainer/TodoItemContainer";
import {useState} from "react";
export default function TodoContainer(){
    const [newTodo, setNewTodo] = useState()
    const onNewTodo = (todo) => {
        setNewTodo(todo)
    }
    return (
        <div className={"Todo-container"}>
            <h1>Todos</h1>
            <TodoForm onNewTodo={onNewTodo}/>
            <TodoItemContainer newTodo={newTodo}/>
        </div>
    )
}