import axios from "axios";

class TodoService {
    API = "http://localhost:8080/api/todo"
    getAllTodos(){
        return axios.get(this.API + "/all")
    }
    updateTodo(todo){
        return axios.put(this.API, todo)
    }
    postTodo(todo){
        return axios.post(this.API, todo)
    }
    deleteTodo(externalId){
        return axios.delete(this.API + '/' + externalId)
    }
}

export default new TodoService()