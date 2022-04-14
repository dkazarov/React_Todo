import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState('');

  // Add items to tasks []
  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: nanoid(2),
        title: value,
      },
    ]);
    setValue('');
  };

  // Delete items from tasks []
  const deleteTask = (id) => {
    const newTodo = [...tasks].filter((items) => items.id !== id);
    setTasks(newTodo);
    setValue('');
  };

  //Edit item from tasks []
  const editTask = (id, title) => {
    setEdit(id);
    setValue(title);
  };

  // Save item after edit to tasks []
  const saveTask = (id) => {
    let newTodo = [...tasks].filter((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    setTasks(newTodo);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <button onClick={() => setValue('')}>Reset</button>
      <div>
        <ul>
          {tasks.length !== 0 ? (
            tasks.map((items) => (
              <li key={nanoid(2)}>
                {items.title}
                <button onClick={() => deleteTask(items.id)}>Delete</button>
                <button onClick={() => editTask(items.id, items.title)}>
                  Edit
                </button>
                <button onClick={() => saveTask(items.id)}>Save</button>
              </li>
            ))
          ) : (
            <div>
              <h1>Додайте ваше перше завдання</h1>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
