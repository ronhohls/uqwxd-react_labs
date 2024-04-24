import React, {useState, useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setToDos] = useState([]);
  const [toDoEditing, setToDoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos){
        setToDos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if(todos.length > 0){
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
  function handleSubmit(e){
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newToDo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
    };

    if (newToDo.text.length > 0){
        setToDos([...todos].concat(newToDo));
    }else{
        alert("Enter a valid task");
    }

    document.getElementById('todoAdd').value = ""
  }
  
  // Add the deleteToDo code here
  function deleteToDo(id) {
    let updatedToDos = [...todos].filter((todo) => todo.id !== id);
    setToDos(updatedToDos);
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id){
    let updatedToDos = [...todos].map((todo) =>{
        if (todo.id === id){
            todo.completed = !todo.completed;
        }
        return todo;
    });
    setToDos(updatedToDos);
  }
  
  // Add the submitEdits code here
  function submitEdits(newToDo){
    const updatedToDos = [...todos].map((todo) =>{
        if (todo.id === newToDo.id){
            todo.text = document.getElementById(newToDo.id).value;
        }
        return todo;
    });
    setToDos(updatedToDos);
    setToDoEditing(null);
  }

  
return(
    <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
            <input type ="text" id= 'todoAdd'/>
            <button type ="submit">Add Todo</button>
        </form>
        {todos.map((todo) =>
            <div className="todo" key={todo.id}>
                <div className="todo-text">
                    <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
                {/* if edit mode, display input box, else display text */}   
                    {todo.id === toDoEditing ?
                        (<input type="text" id={todo.id} defaultValue={todo.text} />) 
                    :(<div>{todo.text}</div>)
                    }
                </div>
                <div className="todo-actions">
                    {todo.id === toDoEditing ?
                        (<button onClick={()=> submitEdits(todo)}>Submit Edits</button>)
                    :(<button onClick={()=> setToDoEditing(todo.id)}>Edit</button>)
                    }
                    <button onClick={() => deleteToDo(todo.id)}>Delete</button>
                </div>
            </div>
        )}
    </div>
);
};
export default App;
