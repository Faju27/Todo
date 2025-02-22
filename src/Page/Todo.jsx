import React, {useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as createId} from 'uuid';
import { MdDelete, MdEdit, MdUpdate } from 'react-icons/md'
import { TodoContext } from '../App';
import TodoEditModal from '../Components/TodoEditModal';

const Todo = () => {

    const {currentEditable,setCurrentEditable,editTask,setEditTask} = useContext(TodoContext)
    
    const [todoList, setTodoList]= useState([])
    const [todo, setTodo] = useState("")

    const handleTodo = () => {
        if (!todo) {    //(todo == "") / (todo == NIL) /(todo == undefined)
            return toast.error("Please enter input!") //to alert errors.
        }
        if (todo.length < 3) {
            return toast.error("Please enter minimum 3 charecter.")
        }

        // to display
        const todoObject = {
            id: createId(),
            task: todo,
            completed: false,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
            }
            console.log(todoObject.completed);

            //to find the todo already existed or not.
        const exist = todoList.findIndex((item) => { 
            return item.task.toLowerCase() == todo.toLowerCase()})
        // const exist = todoList.findIndex((Element) => Element.task.toLowerCase() == todo.toLowerCase())
        if (exist > -1) {
            return toast.error("Todo already exist.")
        }
        
        setTodoList([todoObject, ...todoList]) //to display one by one.
        setTodo("")    //to remove input text.
        return toast.success("Todo added successfully.") //to alert success.
    }

    const handleRemove = (deleteId) => {
        const res = todoList.filter((todo) => todo.id !=deleteId)
        setTodoList(res)        
    }
    
    const handleStatusUpdate = (updateId) => {
        const res = todoList.map(todo => {
            if (todo.id == updateId) {
                return {...todo, completed: !todo.completed, updatedAt: new Date().toLocaleString()}
            }
            return todo
        })
        setTodoList(res)
    }

    const handleEdit = (todo) =>{
        // setCurrentEditable(todo.id)
        setCurrentEditable(todo)
        setEditTask(todo.task)
    }
    
    const handleOk = () =>{
        if (!editTask) {
            return toast.error("Please enter input!")
        }
        if (editTask.length < 3) {
            return toast.error("Please enter minimum 3 charecter.")
        }
        const exist = todoList.findIndex((item) => { 
            return item.task.toLowerCase() == editTask.toLowerCase()})
        if (exist > -1 && exist.id != currentEditable.id) {
            return toast.error("Todo already exist.")
        }
        const res = todoList.map(todo => {
            if (todo.id == currentEditable.id) {
                return {...todo, task : editTask, updatedAt : new Date().toLocaleString("en-IN")
                }
            }
        })
        setTodoList(res)
        setEditTask("")
        setCurrentEditable("")
        return toast.success("Todo edited successfully.")
    }
    
    return (
        <div>
            <div className='d-flex flex-column gap-3 align-items-center py-4'>
                <input type="text" placeholder='Enter Task' value={todo} onChange={(item) => setTodo(item.target.value)} className='w-50 bg-body-tertiary rounded-2 px-5 py-2'/>
                <button onClick={handleTodo} className='w-25 btn btn-outline-success'> Add Todo </button>
            </div>
            <div className='d-flex flex-column gap-3 align-items-center py-4 gap-3'>
                <h4>Pending Tasks - ({todoList.filter((todo) => !todo.completed).length}) </h4>
                
                {
                    todoList.filter((todo) => !todo.completed).map((todo) => {
                        return (
                        <div key={todo.id} className='d-flex bg-light border-black border p-3 justify-content-between  w-50'>
                            <div>
                                <p> ID : {todo.id}</p>
                                {/* <div className='position-relative  mb-3'>Task : {currentEditable == todo.id ?
                                    <div className='d-flex top-0 position-absolute' style={{left:"40px"}}>
                                        <input className='rounded-1 w-50' type="text" placeholder='Edit Task' onChange={(item) => setEditTask(item.target.value)} value={editTask}/>
                                        <button onClick={handleOk} className='btn btn-sm btn-outline-primary'>Ok</button>
                                    </div> : todo.task} </div> */}
                                {currentEditable && <TodoEditModal 
                                    handleOk = {handleOk}
                                />}
                                <p> Task : {todo.task} </p>
                                <p> Status : {todo.completed ? "Completed" : "Pending"}</p>
                                <p> Updated : {todo.updatedAt}</p>
                            </div>
                            <div className='d-flex flex-column justify-content-between' >
                                <button className='btn btn-danger' onClick={() => handleRemove(todo.id)}><MdDelete /> Delete</button>
                                <button className='btn btn-primary' onClick={() => handleEdit(todo)}><MdEdit /> Edit </button>
                                <button className='btn btn-success' onClick={() => handleStatusUpdate(todo.id)}><MdUpdate />Update</button>
                            </div>
                        </div>
                        )
                    })
                }
                <h4>Completed Tasks - ({todoList.filter((todo) => todo.completed).length}) </h4>
                {
                    todoList.filter((todo) => todo.completed).map((todo) => {
                        return (
                        <div key={todo.id} className='d-flex bg-light border-black border p-3 justify-content-between w-50'>
                            <div>
                                <p> ID : {todo.id}</p>
                                <p>Task: {todo.task}</p>
                                <p> Status : {todo.completed ? "Completed" : "Pending"}</p>
                                <p> Updated : {todo.updatedAt}</p>
                            </div>
                            <div className='d-flex flex-column justify-content-between' >
                                <button className='btn btn-danger' onClick={() => handleRemove(todo.id)}><MdDelete /> Delete</button>
                                <button className='btn btn-success' onClick={() => handleStatusUpdate(todo.id)}><MdUpdate /> Update</button>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Todo;
