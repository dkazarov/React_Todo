import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');

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
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <button>Edit</button>
      <div>
        <ul>
          {tasks.map((items) => (
            <li key={nanoid(2)}>
              {items.title}
              <button onClick={() => deleteTask(items.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
