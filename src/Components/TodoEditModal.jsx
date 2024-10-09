import React, { useContext } from 'react';
import { TodoContext } from '../App';

const TodoEditModal = ({handleOk}) => {
    const {setCurrentEditable,editTask,setEditTask} = useContext(TodoContext)

    

    return (
        <div className='bg-warning position-fixed h-100 w-100 align-content-center top-0 start-0 '>
            <div className='w-100 h-25 d-flex flex-column gap-2 align-items-center'>
                <input type="text" placeholder='Edit Task' className='rounded-1 w-25 h-25' onChange={(item) => {setEditTask(item.target.value)}} value={editTask}/>
                <button onClick={handleOk} className='btn btn-sm btn-outline-success w-25'>OK</button>
                <button onClick={() => setCurrentEditable("")} className='btn btn-sm btn-outline-danger w-25'>Close</button>
            </div>
            
        </div>
    );
}

export default TodoEditModal;
