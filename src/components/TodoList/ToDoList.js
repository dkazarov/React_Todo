import React from 'react';
import { nanoid } from 'nanoid';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './ToDoList.scss';

const ToDoList = ({ tasks, setTasks }) => {
  //Delete task from state tasks[]
  const deleteTask = (id) => {
    let newList = [...tasks].filter((item) => item.id !== id);
    setTasks(newList);
  };

  return (
    <ul>
      {tasks.map((items) => (
        <label key={nanoid(2)}>
          <li className="todo__li">
            <Checkbox />
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
