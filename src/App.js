import { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');

  console.log(value);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: nanoid(2),
        title: value,
      },
    ]);
  };

  console.log(tasks);
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <button>Delete</button>
      <button>Edit</button>
      <div>
        <ul>
          {tasks.map((items) => (
            <li key={nanoid(2)}>{items.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
