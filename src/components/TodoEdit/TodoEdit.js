import './TodoEdit.scss'
import TodoService from '../../services/todo.service'
import {useEffect, useRef, useState} from "react";
export default function TodoEdit(props){
    const editRef = useRef(null)
    const setShowEdit = (show) => props.setShowEdit(show)
    const [text, setText] = useState('')
    const [shouldDelete, setShouldDelete] = useState(false)
    const closeOnClickOutside = (ev) => {
        if(!editRef?.current?.contains(ev.target)) {
            removeOnClickOutsideListener()
            setShowEdit(false)
        }
    }
    const removeOnClickOutsideListener = () =>
        document.removeEventListener('mousedown', closeOnClickOutside)

    const onSubmit = (ev) => {
        ev.preventDefault()
        const updatedTodo = {
            ...props.editTodo,
            text: text
        }
        if(shouldDelete){
            TodoService.deleteTodo(updatedTodo.externalId).then(response=>{
                removeOnClickOutsideListener()
                setShowEdit(false)
                props.deleteTodoFromList(props.editTodo)
            })

        }else {
            TodoService.updateTodo(updatedTodo).then(response => {
                removeOnClickOutsideListener()
                setShowEdit(false)
                props.updateTodoList(updatedTodo)
            })
        }
    }
    useEffect(()=>{
        document.addEventListener('mousedown', closeOnClickOutside)
    })
    useEffect(()=>{
        setText(props.editTodo.text)
    }, [props])
    return (
        <div className="TodoEdit" ref={editRef}>
            <form onSubmit={onSubmit}>
                <label htmlFor="change-text">Change Text</label>
                <input type="text" id="change-text" value={text} onChange={ev => setText(ev.target.value)}/>
                <div className="button-group">
                    <button type="submit">Change</button>
                    <button type="submit" value="delete" onClick={_=>setShouldDelete(true)}>Delete</button>
                </div>
            </form>
        </div>
    )
}
