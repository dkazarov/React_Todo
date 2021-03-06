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
  const inputRef = useRef(null);

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
    if (value && value.length <= 50) {
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

  const AddTaskToKeyEnter = (e) => {
    if (value && e.key === 'Enter') {
      setTasks(addTodo('success'));
    }
  };

  return (
    <div ref={inputRef} className="add__task-inner">
      <Box sx={{ width: '100%' }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            flexGrow: 1,
            display: { xs: 'block', sm: 'none' },
            marginBottom: '3%',
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
            sx={{ width: '80%', marginBottom: '7%' }}
            onKeyDown={AddTaskToKeyEnter}
            ref={inputRef}
          />
        ) : (
          <TextField
            error
            label={
              !value
                ? 'Ви нічого не додали'
                : 'Максимальна кількість символів: 50'
            }
            //
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: '80%', marginBottom: '7%' }}
            ref={inputRef}
            onKeyDown={AddTaskToKeyEnter}
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
