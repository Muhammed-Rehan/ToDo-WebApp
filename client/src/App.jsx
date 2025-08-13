import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    console.log("Updated taskList:", taskList);
  }, [taskList]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTaskAdd = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task');
      return;
    }
    setTaskList(prev => [{ text: inputValue, completed: false }, ...prev]);
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
    setTaskList(prev => prev.filter((_, i) => i !== index));
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

