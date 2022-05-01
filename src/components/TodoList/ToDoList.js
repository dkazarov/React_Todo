import React, { useRef } from 'react';
import { nanoid } from 'nanoid';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

import './ToDoList.scss';

const ToDoList = ({
  tasks,
  setEdit,
  setValue,
  edit,
  filteredRender,
  setFilteredRender,
  enqueueSnackbar,
  setEditTitle,
  editTitle,
  inputRef,
}) => {
  //Delete task from state tasks[]
  const deleteTask = async (id, variant) => {
    await deleteDoc(doc(db, 'todos', id));
    // let newList = [...tasks].filter((item) => item.id !== id);
    // setTasks(newList);
    await enqueueSnackbar('Завдання видалено', { variant });
  };

  // Edit item from tasks []
  const editTask = (id, title) => {
    setEditTitle(title);
    setEdit(id);
  };

  //Save item after edit to tasks []
  const saveTask = async (id, title, variant, e) => {
    const inputEditRef = doc(db, 'todos', id);
    await updateDoc(inputEditRef, {
      title: editTitle,
    });
    setEdit(false);
    setValue('');
    enqueueSnackbar('Завдання зміненно', { variant });
  };

  // Change status checkbox
  const changeStatusTask = async (items) => {
    const washingtonRef = doc(db, 'todos', items.id);

    await updateDoc(washingtonRef, {
      isCompleted: !items.isCompleted,
    });
  };

  // Render tabs
  const tabs = (status) => {
    if (status === 'all') {
      setFilteredRender(tasks);
    } else {
      let newTodo = [...tasks].filter((items) => items.isCompleted === status);
      setFilteredRender(newTodo);
    }
  };

  return (
    <ul className='todo__inner'>
      <ButtonGroup
        size='small'
        aria-label='small button group'
        sx={{ marginBottom: '7%' }}
      >
        <Button onClick={() => tabs('all')}>Всі</Button>
        <Button onClick={() => tabs(false)}>Відкриті</Button>
        <Button onClick={() => tabs(true)}>Завершені</Button>
      </ButtonGroup>
      {tasks.length !== 0 ? (
        filteredRender.map((items) => (
          <li
            key={nanoid(3)}
            className={!items.isCompleted ? 'todo__li' : 'todo__li finished'}
          >
            <div>
              <Checkbox
                checked={items.isCompleted}
                onChange={() => changeStatusTask(items)}
              />
            </div>
            <div className='todo__text'>
              {edit === items.id ? (
                <TextField
                  id='standard-basic'
                  label='Змінити на:'
                  variant='standard'
                  color='warning'
                  value={editTitle}
                  size='small'
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                  sx={{ textAlign: 'center', width: '100%' }}
                  ref={inputRef}
                />
              ) : (
                items.title
              )}
            </div>
            <div className='todo__icons-inner'>
              <span
                onChange={(e) => editTask(e.target.value)}
                onClick={() => editTask(items.id, items.title)}
                className='finished todo__li--hover todo__edit-icon'
              >
                <Tooltip title='Редагувати'>
                  {<EditIcon color='primary' sx={{ cursor: 'pointer' }} />}
                </Tooltip>
              </span>
              {edit === items.id ? (
                <span
                  className=''
                  onClick={() => saveTask(items.id, items.title, 'info')}
                >
                  <Tooltip title='Зберегти'>
                    <SaveAsIcon
                      sx={{
                        color: 'green',
                        cursor: 'pointer',
                        hover: { fontSize: '50px' },
                      }}
                    />
                  </Tooltip>
                </span>
              ) : (
                <span
                  onClick={() => deleteTask(items.id, 'error')}
                  className='todo__li--hover'
                >
                  <Tooltip title='Видалити'>
                    <DeleteIcon
                      sx={{
                        color: 'crimson',
                        cursor: 'pointer',
                        hover: { fontSize: '50px' },
                      }}
                    />
                  </Tooltip>
                </span>
              )}
            </div>
          </li>
        ))
      ) : (
        <div>
          <h1>Додайте ваше перше завдання</h1>
        </div>
      )}
    </ul>
  );
};

export default ToDoList;
