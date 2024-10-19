import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { LuClipboardEdit } from 'react-icons/lu';
import { LuSaveAll } from 'react-icons/lu';
import { RiDeleteBin2Line } from 'react-icons/ri';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      settodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLS = (newArr) => {
    localStorage.setItem('todos', JSON.stringify(newArr));
  };

  const handleAdd = (e) => {
    const newArr = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    settodos(newArr);
    settodo('');
    saveToLS(newArr);
  };

  const toggleFinished = () => {
    setfinished(!finished);
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    handleDelete(id);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto my-5 p-3 rounded-xl bg-violet-200 min-h-[80vh] w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="font-bold text-center text-xl">iTask: Manage Your Tasks in One Place</h1>
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add Todo</h2>
          <form className="flex flex-col">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="rounded-md p-2 mb-3 w-full text-sm md:text-base"
              placeholder="Enter your task..."
            />
            <button
              type="submit"
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-700 hover:bg-violet-900 text-white font-bold p-3 rounded-md text-sm disabled:bg-black flex justify-center items-center"
            >
              <LuSaveAll className="mr-2" />
              Save
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Your Todo List</h1>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={toggleFinished}
              checked={finished}
              className="mr-2"
            />
            <span>Show Completed</span>
          </label>
        </div>

        <div className="todos mt-5">
          {todos.length === 0 && <div className="m-5">No Todo to display</div>}
          {todos.map((item) => {
            return (
              (finished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between items-center p-3 bg-white rounded-md shadow-md my-3"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      className="h-4 w-4"
                    />
                    <div className={`text-sm md:text-base ${item.isCompleted ? 'line-through' : ''}`}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex space-x-3">
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-900 text-white font-bold p-2 rounded-md text-sm"
                    >
                      <LuClipboardEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-700 hover:bg-violet-900 text-white font-bold p-2 rounded-md text-sm"
                    >
                      <RiDeleteBin2Line />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
