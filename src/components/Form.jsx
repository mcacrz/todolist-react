import React, {useState, useEffect, useRef, useContext} from 'react'
import TodoList from './TodoList'
import {KeyAppContext} from '../App'
import {insertStorage, getStorageLength} from '../libraries/storageMethods'

const Form = () => {
  useEffect(() => {
    listeners()

    return setIsInserted(0)
  })

  //constants
  const KEYAPP = useContext(KeyAppContext)
  //ref values
  const inputText = useRef(null)
  //state values
  const [isInserted, setIsInserted] = useState(0)

  //Insert the todo registry into Local Storage
  const handleClick = (event) => {
    (inputText.current.value !== null && inputText.current.value.length > 0)
      ? (
        (todo) => insertTodo(todo)
      )(inputText.current.value)
      : null
  }

  const listeners = () => {
    document.addEventListener('keyup', (event) => {
      (event.keyCode === 13)
        ? insertTodo(inputText.current.value)
        : null
    })
  }

  const insertTodo = (todo) => {
    (todo.length >= 3)
      ?(
        (todo) => {
          const positionValue = getStorageLength(KEYAPP, 'list') + 1
          insertStorage(
            KEYAPP, 
            'list', 
            {value:todo, checked:0, position: positionValue}
          )
          clearInput()
          setIsInserted(1)
        }
      )(todo)
      : null
  }

  const clearInput = () => {
    inputText.current.value = ''
  }

  return (
    <div>
      <div className="shadow-xl bg-white rounded-md p-3 mb-5 flex-row">       
        <input className="rounded-sm focus:outline-none w-8/12" type="text" id="todo" ref={inputText}></input>
        <button className="shadow-md bg-blue-700 rounded font-black text-white w-1/4 float-right" type="button" id="insert" onClick={handleClick}>OK</button>
      </div>
      <TodoList />
    </div>
  )
}

export default Form