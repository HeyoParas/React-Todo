import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList"; 
import Login from "./login";

const Body = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    console.log("useEffect")
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setTasks(response.data); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []); 

  const handleAddTask = async () => {
    if (input.trim()) {
      const newTask = { task: input }; 

      try {
        const response = await axios.post("http://localhost:3000/todos", newTask);
        setTasks([...tasks, { ...newTask, id: response.data.id, isChecked: false }]);
        setInput("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  // console.log("afteroperation",tasks)

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${taskId}`);
      let updatedTasks = tasks.filter(task => task.id !== taskId)
    
      // console.log("updatedTask",updatedTasks)
      setTasks(updatedTasks)
      // console.log("afteroperation",tasks)
      // setTasks([...tasks, { ...newTask, id: response.data.id, isChecked: false }]);

    } catch (error) {
      console.error("Error deleting task:", error);
    }

  };
      // console.log("afteroperation",tasks)
  console.log("all re render")
  console.log("task",tasks)
  return (
    <div className="todo-body">
      <div className="todo-container">
        <div className="add-task-section">
          <input
            type="text"
            placeholder="Add a new task"
            id="inputBox"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button id="addBtn" onClick={handleAddTask}>
            Add
          </button>
        </div>
        <div className="todos">
          {tasks.map((task) => (
            <TodoList
              id={task.id} 
              task={task} 
              onDelete={handleDeleteTask} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
