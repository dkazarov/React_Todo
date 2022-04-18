import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import './ToDoList.scss';

const ToDoList = ({
  tasks,
  setTasks,
  setEdit,
  setValue,
  value,
  edit,
  searchValue,
  filteredRender,
  setFilteredRender,
}) => {
  //Delete task from state tasks[]
  const deleteTask = (id) => {
    let newList = [...tasks].filter((item) => item.id !== id);
    setTasks(newList);
  };

  // Edit item from tasks []
  const editTask = (id, title) => {
    setValue(id);
    setValue(title);
    setEdit(id);
  };

  //Save item after edit to tasks []
  const saveTask = (id) => {
    let newTodo = [...tasks].filter((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    setTasks(newTodo);
    setEdit(false);
  };

  // Change status checkbox
  const changeStatusTask = (id) => {
    setTasks(
      tasks.map((todo) => {
        if (todo.id !== id) return todo;

        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      })
    );
  };

  // Filtered data
  const filteredTasks = tasks.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const tabs = (status) => {
    if (status === 'all') {
      setFilteredRender(tasks);
    } else {
      let newTodo = [...tasks].filter((items) => items.isCompleted === status);
      setFilteredRender(newTodo);
    }
  };

  return (
    <ul className="todo__inner">
      <ButtonGroup
        size="small"
        aria-label="small button group"
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
                onChange={() => changeStatusTask(items.id)}
              />
            </div>
            <div className="todo__text">{items.title}</div>
            <div className="todo__icons-inner">
              <span
                onChange={(e) => editTask(e.target.value)}
                onClick={() => editTask(items.id, items.title)}
                className="finished todo__li--hover todo__edit-icon"
              >
                <Tooltip title="Редагувати">
                  {<EditIcon color="primary" sx={{ cursor: 'pointer' }} />}
                </Tooltip>
              </span>
              {edit === items.id ? (
                <span
                  className=""
                  onClick={() => saveTask(items.id, items.title)}
                >
                  <Tooltip title="Зберегти">
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
                  onClick={() => deleteTask(items.id)}
                  className="todo__li--hover"
                >
                  <Tooltip title="Видалити">
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
