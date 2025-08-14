import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    console.log("Updated taskList:", taskList);
  }, [taskList]);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => {
        setTaskList(data.map(task => ({ text: task.task, completed: task.completed })));
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [])

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTaskAdd = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task');
      return;
    }
    const newTask = { text: inputValue, completed: false };
    try{
      const response = await fetch(`http://localhost:5000/addTask?task=${encodeURIComponent(inputValue)}`, {
        method: 'GET',
      })
      console.log("Response from server:", response);
      const data = await response.json();
      setTaskList(prev => [...prev, newTask]);
      console.log("Updated taskList after adding:", data);
    }
    catch (error) {
      console.error('Error adding task:', error);
      return;
    }
    setInputValue("");
  };

  const handleCheckTask = (index) => {
    setTaskList(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (index) => {
    try{
      const response = fetch("http://localhost:5000/deleteTask?id=" + index, {
        method: 'GET',
      });
      console.log("Response from server:", response);
      setTaskList(prev => prev.filter((_,i) => i !==  index));
      console.log("Updated taskList after deletion:", taskList);
    }
    catch (error) {
      console.error('Error deleting task:', error);
      return;
    }
  };

  return (
    <div className="App">
      <div className='InputFeild'>
        <input type="text" value={inputValue} onChange={handleInputChange}/>
        <button className='Add' onClick={handleTaskAdd}>Add</button>
      </div>

      <div className='taskList'>
        {taskList.map((task, index) => (
          <div className='taskItemContainer' key={index}>
            <div className='Check'>
              <button onClick={() => handleCheckTask(index)}>Check</button>
            </div>
            <div
              className='taskItem'
              style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.text}
            </div>
            <div className='Delete'>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default App;

