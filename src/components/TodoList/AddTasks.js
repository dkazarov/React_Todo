import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';

import './AddTasks.scss';

const AddTasks = ({ tasks, setTasks, value, setValue }) => {
  // Add items to tasks []
  const addTodo = () => {
    if (value) {
      setTasks([
        ...tasks,
        {
          id: nanoid(2),
          title: value,
          isCompleted: false,
        },
      ]);
      setValue('');
    }
  };

  return (
    <div className="add__task-inner">
      <TextField
        label="Додайте нове завдання"
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ width: '80%' }}
      />
      <Button variant="contained" onClick={addTodo}>
        Додати
      </Button>
    </div>
  );
};

export default AddTasks;

// add item to local Storage when tasks changes
// useEffect(() => {
//   localStorage.setItem(`title`, JSON.stringify([...tasks]));
// }, [tasks]);
