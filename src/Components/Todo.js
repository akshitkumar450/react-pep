import React, { useState } from 'react'

function Todo() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const addTodos = (e) => {
        e.preventDefault()
        setTodos([...todos, { title: todo, id: todos.length + 1 }])
        setTodo('')
    }
    const deleteTodo = (id) => {
        // alert(id) // unique id for every todo
        let newTodos = todos.filter((value) => {
            return value.id !== id
        })
        setTodos(newTodos)
    }
    console.log(todos);
    return (
        <div>
            <form>
                <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type='submit' onClick={addTodos}>add</button>
            </form>
            {
                todos.map((value, idx) => {
                    return (
                        <ul key={idx} style={{ display: 'flex', alignItems: 'center ' }}>
                            <li>{value.title}</li>
                            <button style={{ marginLeft: '20px', marginTop: '10px' }} onClick={() => deleteTodo(value.id)}>delete</button>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Todo
