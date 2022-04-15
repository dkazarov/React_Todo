import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';

import './AddTasks.scss';

const AddTasks = ({ tasks, setTasks }) => {
  // State
  const [value, setValue] = useState('');

  // Add items to tasks []
  const addTodo = () => {
    if (value) {
      setTasks([
        ...tasks,
        {
          id: nanoid(2),
          title: value,
        },
      ]);
      setValue('');
    }
  };

  console.log(value);

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
        Add Task
      </Button>
    </div>
  );
};

export default AddTasks;

// add item to local Storage when tasks changes
// useEffect(() => {
//   localStorage.setItem(`title`, JSON.stringify([...tasks]));
// }, [tasks]);
