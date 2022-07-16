import './TodoForm.scss'
import TodoService from '../../services/todo.service'
import {useState} from "react";
export default function TodoForm(props){
    const [text, setText] = useState('')
    const onSubmit = (event) => {
        event.preventDefault()
        const newTodo = {
            text: text,
            checked: false
        }
        TodoService.postTodo(newTodo).then(response=>{
            props.onNewTodo(response.data)
        })
        setText('')
    }
    return (
    <div className="TodoForm">
        <form onSubmit={onSubmit}>
            <input title="todo text" aria-label="todo text" type="text" placeholder="todo"
                value={text} onChange={e=>setText(e.target.value)}
            />
            <button title="add todo" aria-label="add todo" type="submit">Add</button>
        </form>
    </div>
)
}
