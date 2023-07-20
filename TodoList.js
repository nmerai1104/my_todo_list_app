import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index, newText) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    if (activeTab === 'active') {
      return todos.filter((todo) => !todo.completed);
    } else if (activeTab === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  };

  return (
    <div className="TodoList">
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {filterTodos().map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            {todo.completed ? (
              <del>{todo.text}</del>
            ) : (
              <span>{todo.text}</span>
            )}
            <button onClick={() => handleEditTodo(index, prompt('Enter new text', todo.text))}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="tabs">
        <button onClick={() => setActiveTab('all')}>All</button>
        <button onClick={() => setActiveTab('active')}>Active</button>
        <button onClick={() => setActiveTab('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
