import React from 'react';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

import './AddTasks.scss';

const AddTasks = ({
  setTasks,
  value,
  setValue,
  error,
  setError,
  enqueueSnackbar,
  inputRef,
}) => {
  // Add items to tasks []
  const addTodo = async (variant) => {
    if (value && value.length <= 75) {
      await addDoc(collection(db, 'todos'), {
        id: nanoid(3),
        title: value,
        isCompleted: false,
        createdAt: serverTimestamp(),
      });
      setError((error = false));
      setValue('');
      enqueueSnackbar('Завдання додано', { variant });
    } else {
      await setError((error = true));
    }
  };

  const AddTaskToKeyEnter = (e) => {
    if (value && e.key === 'Enter') {
      setTasks(addTodo('success'));
    }
  };

  return (
    <div ref={inputRef} className='add__task-inner'>
      <Box sx={{ width: '100%' }}>
        <Typography
          variant='h4'
          component='div'
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
            label='Додати нове завдання'
            variant='standard'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: '80%', marginBottom: '7%' }}
            onKeyDown={AddTaskToKeyEnter}
            ref={inputRef}
            autoFocus
          />
        ) : (
          <TextField
            error
            label={
              !value
                ? 'Ви нічого не додали'
                : 'Максимальна кількість символів: 50'
            }
            variant='standard'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: '80%', marginBottom: '7%' }}
            ref={inputRef}
            onKeyDown={AddTaskToKeyEnter}
          />
        )}

        <Button variant='contained' onClick={() => addTodo('success')}>
          Додати
        </Button>
      </Box>
    </div>
  );
};

export default AddTasks;
