import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import AddTasks from './components/TodoList/AddTasks';
import ToDoList from './components/TodoList/ToDoList';

import './App.scss';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('title')) || []
  );
  // const [value, setValue] = useState('');
  // const [edit, setEdit] = useState(false);
  // const [checked, setChecked] = useState(null);

  // Delete items from tasks []
  // const deleteTask = (id) => {
  //   const newTodo = [...tasks].filter((items) => items.id !== id);
  //   setTasks(newTodo);
  //   setValue('');
  // };

  //Edit item from tasks []
  // const editTask = (id, title) => {
  //   setValue(id);
  //   setValue(title);
  //   setEdit(id);
  // };

  // Save item after edit to tasks []
  // const saveTask = (id) => {
  //   let newTodo = [...tasks].filter((item) => {
  //     if (item.id === id) {
  //       item.title = value;
  //     }
  //     return item;
  //   });
  //   setTasks(newTodo);
  //   setEdit(false);
  // };

  // const checkedTasks = (id) => {
  //   const newTodo = [...tasks].find((item) => item.id === id);
  //   newTodo.isCompleted = !newTodo.isCompleted;
  //   console.log(newTodo);
  //   setChecked(newTodo);
  // };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <AddTasks />
        <ToDoList tasks={tasks} setTasks={setTasks} />
      </Container>
    </>
  );
}

export default App;
