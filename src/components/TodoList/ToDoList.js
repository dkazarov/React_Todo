import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Tooltip from '@mui/material/Tooltip';

import './ToDoList.scss';

const ToDoList = ({ tasks, setTasks, setEdit, setValue, value, edit }) => {
  //Local State
  const [checked, setChecked] = useState(false);

  //Delete task from state tasks[]
  const deleteTask = (id) => {
    let newList = [...tasks].filter((item) => item.id !== id);
    setTasks(newList);
  };

  // Change state checkbox
  const changeTaskStatus = (event) => {
    event.stopPropagation();
    setChecked(event.target.checked);
  };

  console.log(checked);

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

  return (
    <ul>
      {tasks &&
        tasks.map((items) => (
          <label key={nanoid(2)}>
            <li className={!checked ? 'todo__li' : 'todo__li finished'}>
              <Checkbox
                // defaultChecked
                checked={items.checked}
                onChange={changeTaskStatus}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              {items.title}
              <div className="todo__icons-inner">
                <span
                  onChange={(e) => editTask(e.target.value)}
                  onClick={() => editTask(items.id, items.title)}
                  className="finished todo__li--hover"
                >
                  <Tooltip title="Редагувати">
                    {<EditIcon color="primary" sx={{ cursor: 'pointer' }} />}
                  </Tooltip>
                </span>
                {edit === items.id ? (
                  <span onClick={() => saveTask(items.id, items.title)}>
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
          </label>
        ))}
    </ul>
  );
};

export default ToDoList;
