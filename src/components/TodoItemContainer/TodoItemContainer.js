import './TodoItemContainer.scss'
import TodoEdit from "../TodoEdit/TodoEdit";
import TodoItem from "../TodoItem/TodoItem";
import {useEffect, useState} from "react";
import TodoService from '../../services/todo.service'
export default function TodoItemContainer(props){
    const [todos, setTodos] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [editTodo, setEditTodo] = useState(null)
    useEffect(()=>{
        TodoService.getAllTodos().then(response=>{
            setTodos(response.data)
        })
    }, [])
    const AllTodoItems = () =>
        todos.map(
            (todo,index) =>
                <TodoItem todo={todo} key={index} showEdit={show=>setShowEdit(show)} editTodo={todo=>setEditTodo(todo)} />
    )
    useEffect(()=>{
        if(props.newTodo)
            setTodos(todos => [...todos, props.newTodo])
    }, [props.newTodo])
    return (
    <div className="TodoItemContainer">
        <div>
            <AllTodoItems />
        </div>
        {showEdit&&editTodo?<TodoEdit
            deleteTodoFromList={todo=>{
                let copyTodos = [...todos]
                copyTodos = copyTodos.filter(t=>t.externalId!==todo.externalId)
                setTodos(copyTodos)
            }}
            updateTodoList={todo=>{
            const copyTodos = [...todos]
            const oldTodo = copyTodos.filter(t=>t.externalId===todo.externalId)[0]
            copyTodos[todos.indexOf(oldTodo)] = todo
            setTodos(copyTodos)
        }} editTodo={editTodo} setShowEdit={show=>setShowEdit(show)}/>:null}
    </div>
)
}
