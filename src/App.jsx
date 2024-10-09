import React, { createContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Todo from './Page/Todo';
import TodoEditModal from './Components/TodoEditModal';

export const TodoContext = createContext()

const App = () => {

  const [currentEditable, setCurrentEditable] = useState("")
  const [editTask , setEditTask] = useState("")

  return (
    <div>
      <TodoContext.Provider value={{currentEditable,setCurrentEditable,editTask,setEditTask}}>
       <Todo />
      </TodoContext.Provider>
      <Toaster position='top-left'/>
    </div>
  );
}

export default App;

