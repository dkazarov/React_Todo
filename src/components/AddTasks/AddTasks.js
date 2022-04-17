import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';

import './AddTasks.scss';

const AddTasks = ({ tasks, setTasks, value, setValue, error, setError }) => {
  const inputRef = useRef();

  // Tracking state error <TextField> components & click beyond the borders input
  useEffect(() => {
    setError((error = false));
  }, [value]);
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
      setError((error = false));
      setValue('');
    } else {
      setError((error = true));
    }
  };

  return (
    <div ref={inputRef} className="add__task-inner">
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
