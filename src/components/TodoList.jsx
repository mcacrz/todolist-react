import React, { useState, useContext } from 'react'
import { deleteStorage, selectStorage, updateStorage } from '../libraries/storageMethods'
import {KeyAppContext} from '../App'
import { BsTrash, BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const TodoList = () => {
  //constants
  const KEYAPP = useContext(KeyAppContext)
  //state values
  const [todosList, setTodosList] = useState([])

  const deleteTodo = (id) => {
    deleteStorage(KEYAPP,'list', id)
    orderPosition()
    setTodosList(selectStorage(KEYAPP,'list')) 
  }

  const loadTodoList = () => {
    if(Array.isArray(todosList) && todosList.length > 0){
      return todosList
    }

    return selectStorage(KEYAPP,'list',null,null,['position|asc'])
  }

  const updateTodo = (event) => {
    updateStorage(
      KEYAPP,
      'list',
      event.currentTarget.value,
      {checked : (event.currentTarget.checked) ? 1 : 0}
    )
    setTodosList(selectStorage(KEYAPP,'list',null,null,['position|asc']))
  }

  const upPosition = (id) => {
    const todo = selectStorage(KEYAPP,'list',null,['id|===|'+id])
    
    if(todo.position > 1){
      const todoAhead = selectStorage(KEYAPP, 'list',null,['position|<|'+todo.position],['position|desc'])[0]
      if(todoAhead !== null && todoAhead !== undefined){
        updateStorage(KEYAPP, 'list', todoAhead.id, {position:++todoAhead.position})
        updateStorage(KEYAPP, 'list', todo.id, {position:--todo.position})
        setTodosList(selectStorage(KEYAPP,'list',null,null,['position|asc']))
      }
    }
  }

  const downPosition = (id) => {
    const todo = selectStorage(KEYAPP,'list', null, ['id|===|'+id])
    const storageList = selectStorage(KEYAPP,'list')

    if(todo.position < storageList.length)
    {
      const todoAhead = selectStorage(KEYAPP, 'list',null,['position|>|'+todo.position],['position|asc'])[0]
      if(todoAhead !== null && todoAhead !== undefined){
        updateStorage(KEYAPP, 'list', todoAhead.id, {position:--todoAhead.position})
        updateStorage(KEYAPP, 'list', todo.id, {position:++todo.position})
        setTodosList(selectStorage(KEYAPP,'list',null,null,['position|asc']))
      }
    }
  }

  const orderPosition = () => {
    const storageList = selectStorage(KEYAPP,'list',null,null,['position|asc'])
    const result = storageList.map((item, index) => {
      item.position = ++index
      return item
    })

    localStorage.setItem(KEYAPP+'/'+'list', JSON.stringify(result))
  }

  return (
    <div>
      <ul className="shadow-xl bg-white p-2 rounded-md flex-row">
        {
          loadTodoList().map(item => 
            <li className="mb-4 border-solid border-b-2 border-gray-200" key={item.id}>
              <a className="float-left mr-3 p-0.5" href="" onClick={() => deleteTodo(item.id)}><BsTrash /></a>
              <input className="mr-3 rounded-md box-border h-4 w-4" type="checkbox" value={item.id} onClick={updateTodo} defaultChecked={(item.checked === 1) ? true : false} />
              <span className={(item.checked === 1) ? 'text-gray-400 line-through' : 'text-black'+' align-baseline'}>{item.value}</span>
              <div  className="float-right -mt-2">
                <a href="" onClick={()=>upPosition(item.id)}><i><BsFillCaretUpFill /></i></a>
                <a href="" onClick={()=>downPosition(item.id)}><i><BsFillCaretDownFill /></i></a>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default TodoList