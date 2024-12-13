import React, { useState, useEffect } from "react";
import axios from "axios";
const TodoList = (props) => {
  const { id,task,onDelete } = props;
  // console.log(key,task)
  // console.log(props)
  // console.log("task",task);
  // console.log("onDelete",onDelete)
  const [isChecked, setIsChecked] = useState(task.isChecked); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentTask, setCurrentTask] = useState(task.task); 

  
  useEffect(() => {
    setIsChecked(task.isChecked); 
  }, [task.isChecked]);

  // console.log("Hii")
  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    axios.put(`http://localhost:3000/todos/${task.id}`, { isChecked: updatedChecked,task: currentTask})
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTaskChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleSave = async () => {
    // console.log(currentTask);
    try {
      await axios.put(`http://localhost:3000/todos/${task.id}`, { task: currentTask, isChecked:isChecked });
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async() => {
    onDelete(task.id);
  };

  return (
    <div className="todo-list" id={task.id} >
      <div className="task-mark-div" >
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        {isEditing ? (
          <input type="text" value={currentTask} onChange={handleTaskChange}/>
        ) : (
          <p style={{ textDecoration: isChecked ? "line-through" : "none" }}>
            {currentTask}
          </p>
        )}
      </div>
      <div className="buttons">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button onClick={handleDeleteTask}>Delete</button>
      </div>
    </div>
  );
};

export default TodoList;
