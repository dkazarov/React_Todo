import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header/Header';
import AddTasks from './components/AddTasks/AddTasks';
import ToDoList from './components/TodoList/ToDoList';
import { useSnackbar } from 'notistack';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.config';

import './App.scss';

function App() {
  const [tasks, setTasks] = useState(
    []
    // JSON.parse(localStorage.getItem('title')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [filteredRender, setFilteredRender] = useState(tasks);

  const { enqueueSnackbar } = useSnackbar();

  //add item on load to local Storage when tasks changes
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({...doc.data(), id: doc.id});
      });
      setTasks(todos);
      setFilteredRender(todos);
      console.log(todos);
    });
  }, []);

  // Filtered data
  const search = (searchText, tasks) => {
    if (!searchText) {
      return tasks;
    }
    return tasks.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <>
      <Header setSearchValue={setSearchValue} search={search} />
      <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
        <AddTasks
          filteredRender={filteredRender}
          setFilteredRender={setFilteredRender}
          error={error}
          setError={setError}
          setTasks={setTasks}
          tasks={tasks}
          setValue={setValue}
          value={value}
          enqueueSnackbar={enqueueSnackbar}
        />
        <ToDoList
          filteredRender={filteredRender}
          setFilteredRender={setFilteredRender}
          searchValue={searchValue}
          value={value}
          tasks={tasks}
          setTasks={setTasks}
          edit={edit}
          setEdit={setEdit}
          setValue={setValue}
          enqueueSnackbar={enqueueSnackbar}
        />
      </Container>
    </>
  );
}

export default App;
