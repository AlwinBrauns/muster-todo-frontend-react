import './TodoItem.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import TodoService from "../../services/todo.service"
export default function TodoItem(props){
    const [todo, setTodo]
        = useState(props.todo
        || {text: "...", checked: false}
    )
    const onCheck = () => {
        const updatedTodo = {
            ...todo,
            checked: !todo.checked
        }
        TodoService.updateTodo(updatedTodo).then(
            response=>{
                setTodo(response.data)
            }
        )
    }
    const onShowEdit = () => {
        props.editTodo(todo)
        props.showEdit(true)
    }
    return (
    <div className="TodoItem" onDoubleClick={onCheck}>
        <div className="lead">
            <div hidden={!todo.checked}>
                <FontAwesomeIcon className="icon" icon={faCheck}/>
            </div>
        </div>
        <div className="content">
            <p>{todo.text}</p>
        </div>
        <div className="trail">
            <div onClick={onShowEdit}>
                <FontAwesomeIcon className="edit" icon={faEdit}/>
            </div>
        </div>
    </div>
    )
}
