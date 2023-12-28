import React, { useState, useEffect } from "react";
import Create from "./create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';



const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:5000/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  }, [])


  const handleEdit = (id) => {
    axios.put(`http://localhost:5000/update/${id}`)
      .then(result => {
        // Update the state after a successful edit
        setTodos(prevTodos => {
          const updatedTodos = [...prevTodos];
          const editedIndex = updatedTodos.findIndex(todo => todo._id === id);
          updatedTodos[editedIndex].done = true;
          return updatedTodos;
        });
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(result => {
        // Update the state after a successful delete
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="home">
      <h2>Todo App</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
            <div key={index} className="task">
              <div className="checkbox" onClick={()=>handleEdit(todo._id)}>

                {todo.done?
                  <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                : <BsCircleFill className="icon"/>
                }
              <p className={todo.done? "line_through":""}>{todo.task}</p>
              </div>

              <div>
                <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)}/></span>
              </div>

            </div>
        ))
      )}
    </div>
  );
};

export default Home;
