import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header/Header';
import AddTasks from '../components/AddTasks/AddTasks';
import ToDoList from '../components/TodoList/ToDoList';
import { useSnackbar } from 'notistack';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';

import '../App.scss';

function Home() {
  const [tasks, setTasks] = useState(
    []
    // Save to local storage
    // JSON.parse(localStorage.getItem('title')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [filteredRender, setFilteredRender] = useState(tasks);
  const [editTitle, setEditTitle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const inputEditRef = useRef(null);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'todos'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTasks(todos);
      setFilteredRender(search(searchValue, todos));
      setIsLoading(false);
    });
    /// Add listener click to global object window
    window.addEventListener('click', (e) => {
      if (!e.path.includes(inputRef.current)) setError(false);
      if (!e.path.includes(inputEditRef.current)) setEdit(true);
    });
  }, [searchValue]);

  // Filtered data
  const search = (searchText, tasks) => {
    console.log(searchText);
    if (!searchText) return tasks;
    return filteredRender.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <>
      <Header setSearchValue={setSearchValue} search={search} />
      <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
        <AddTasks
          error={error}
          setError={setError}
          setTasks={setTasks}
          tasks={tasks}
          setValue={setValue}
          value={value}
          enqueueSnackbar={enqueueSnackbar}
          inputRef={inputRef}
        />
        <ToDoList
          filteredRender={filteredRender}
          setFilteredRender={setFilteredRender}
          tasks={tasks}
          edit={edit}
          setEdit={setEdit}
          setValue={setValue}
          enqueueSnackbar={enqueueSnackbar}
          setEditTitle={setEditTitle}
          editTitle={editTitle}
          inputEditRef={inputEditRef}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
}

export default Home;