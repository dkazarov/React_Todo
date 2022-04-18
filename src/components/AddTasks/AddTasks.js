import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './AddTasks.scss';

const AddTasks = ({
  tasks,
  setTasks,
  value,
  setValue,
  error,
  setError,
  enqueueSnackbar,
}) => {
  const inputRef = useRef();

  // Tracking state error <TextField> components & click beyond the borders input
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!e.path.includes(inputRef.current)) {
        setError((value = false));
      }
    });
    setError((error = false));
  }, [value]);
  // Add items to tasks []
  const addTodo = (variant) => () => {
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
      enqueueSnackbar('Завдання додано', { variant });
    } else {
      setError((error = true));
    }
  };

  return (
    <div ref={inputRef} className="add__task-inner">
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            flexGrow: 1,
            display: { md: 'none', sm: 'block' },
          }}
        >
          Reactive Todo
        </Typography>

        {!error ? (
          <TextField
            label="Додати нове завдання"
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: '80%', marginBottom: 2 }}
          />
        ) : (
          <TextField
            error
            label="Ви нічого не додали"
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: '80%', marginBottom: 2 }}
          />
        )}

        <Button variant="contained" onClick={addTodo('success')}>
          Додати
        </Button>
      </Box>
    </div>
  );
};

export default AddTasks;
