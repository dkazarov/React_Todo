import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('title')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(null);

  // Add items to tasks []
  const addTask = () => {
    if (value) {
      setTasks([
        ...tasks,
        {
          id: nanoid(2),
          title: value,
          isCompleted: false,
        },
      ]);
      setValue('');
    }
  };

  // add item to local Storage when tasks changes
  useEffect(() => {
    localStorage.setItem(`title`, JSON.stringify([...tasks]));
  }, [tasks]);

  // Delete items from tasks []
  const deleteTask = (id) => {
    const newTodo = [...tasks].filter((items) => items.id !== id);
    setTasks(newTodo);
    setValue('');
  };

  //Edit item from tasks []
  const editTask = (id, title) => {
    setValue(id);
    setValue(title);
    setEdit(id);
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
    setEdit(false);
  };

  const checkedTasks = (id) => {
    const newTodo = [...tasks].find((item) => item.id === id);
    newTodo.isCompleted = !newTodo.isCompleted;
    console.log(newTodo);
    setChecked(newTodo);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setValue('')}>Reset</button>
      <div>
        <ul>
          {tasks.length !== 0 ? (
            tasks.map((items) => (
              <li key={nanoid(2)}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => checkedTasks(items.id)}
                  />
                  {items.title}
                  <button onClick={() => deleteTask(items.id)}>Delete</button>
                  <button onClick={() => editTask(items.id, items.title)}>
                    Edit
                  </button>
                  {edit === items.id ? (
                    <button onClick={() => saveTask(items.id)}>Save</button>
                  ) : null}
                </label>
              </li>
            ))
          ) : (
            <div>
              <h1>Додайте ваше перше завдання</h1>
            </div>
          )}
        </ul>
      </div>
      <button onClick={addTask}>Add</button>
    </>
  );
}

export default App;
