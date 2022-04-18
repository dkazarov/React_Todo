import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import AddTasks from './components/AddTasks/AddTasks';
import ToDoList from './components/TodoList/ToDoList';
import { SnackbarProvider, useSnackbar } from 'notistack';

import './App.scss';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('title')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [filteredRender, setFilteredRender] = useState(tasks);

  const { enqueueSnackbar } = useSnackbar();

  //add item on load to local Storage when tasks changes
  useEffect(() => {
    localStorage.setItem(`title`, JSON.stringify([...tasks]));
    setFilteredRender(tasks);
  }, [tasks]);

  return (
    <>
      <Header setSearchValue={setSearchValue} />
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <AddTasks
          filteredRender={filteredRender}
          setFilteredRender={setFilteredRender}
          error={error}
          setError={setError}
          setTasks={setTasks}
          tasks={tasks}
          setValue={setValue}
          value={value}
        />
        <ToDoList
          filteredRender={filteredRender}
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
