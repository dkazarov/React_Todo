import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');

  console.log(value);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: 1,
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
        {tasks.map((items) => (
          <li>{items.title}</li>
        ))}
      </div>
    </>
  );
}

export default App;
