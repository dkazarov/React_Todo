import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';

import './AddTasks.scss';

const AddTasks = ({ tasks, setTasks, value, setValue, error, setError }) => {


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
      setError((error = false));
    } else {
      setError((error = true));
    }
  };

  return (
    <div className="add__task-inner">
      {!error ? (
        <TextField
          label="Додати нове завдання"
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: '80%' }}
        />
      ) : (
        <TextField
          error
          label="Ви нічого не додали"
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: '80%' }}
        />
      )}

      <Button variant="contained" onClick={addTodo}>
        Додати
      </Button>
    </div>
  );
};

export default AddTasks;
