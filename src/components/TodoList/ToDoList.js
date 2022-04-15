import React from 'react';
import { nanoid } from 'nanoid';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './ToDoList.scss';

const ToDoList = ({ tasks, setTasks, setEdit, setValue }) => {
  //Local State
  const [checked, setChecked] = React.useState(false);

  //Delete task from state tasks[]
  const deleteTask = (id) => {
    let newList = [...tasks].filter((item) => item.id !== id);
    setTasks(newList);
  };

  // Change state checkbox
  const changeTaskStatus = (event) => {
    setChecked(event.target.checked);
  };

  // Edit item from tasks []
  // const editTask = (id, title) => {
  //   setValue(id);
  //   setValue(title);
  //   setEdit(id);
  //   console.log(1)
  // };

  // Save item after edit to tasks []
  // const saveTask = (id) => {
  //   let newTodo = [...tasks].filter((item) => {
  //     if (item.id === id) {
  //       item.title = value;
  //     }
  //     return item;
  //   });
  //   setTasks(newTodo);
  //   setEdit(false);
  // };

  return (
    <ul>
      {tasks &&
        tasks.map((items) => (
          <label key={nanoid(2)}>
            <li className="todo__li">
              <Checkbox
                checked={items.checked}
                onChange={changeTaskStatus}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              {items.title}
              <div className="todo__icons-inner">
                <span className="finished">
                  {<EditIcon color="primary" sx={{ cursor: 'pointer' }} />}
                </span>
                <span onClick={() => deleteTask(items.id)}>
                  <DeleteIcon sx={{ color: 'crimson', cursor: 'pointer' }} />
                </span>
              </div>
            </li>
          </label>
        ))}
    </ul>
  );
};

export default ToDoList;
