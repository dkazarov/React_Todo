import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import AddTasks from './components/TodoList/AddTasks';
import ToDoList from './components/TodoList/ToDoList';

import './App.scss';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('title')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  //add item on load to local Storage when tasks changes
  useEffect(() => {
    localStorage.setItem(`title`, JSON.stringify([...tasks]));
  }, [tasks]);

  return (
    <>
      <Header setSearchValue={setSearchValue} />
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <AddTasks
          setTasks={setTasks}
          tasks={tasks}
          setValue={setValue}
          value={value}
        />
        <ToDoList
          searchValue={searchValue}
          value={value}
          tasks={tasks}
          setTasks={setTasks}
          edit={edit}
          setEdit={setEdit}
          setValue={setValue}
        />
      </Container>
    </>
  );
}

export default App;
