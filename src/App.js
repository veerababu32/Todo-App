import { useEffect, useState } from 'react';
import { TodoProvider } from './context';
import { TodoForm, TodoItem, Loader } from './components';
import axios from 'axios';
import conf from './conf/conf';

function App() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(true);
  const URL = conf.reactAppApiBaseUrl;

  const addTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
    // console.log(todo);

    // Not able to add todos server It's not accepting more than one
    // setLoader(true);
    // axios
    //   .post('https://dummyjson.com/todos/add', {
    //     id: todo.id,
    //     todo: todo.todo,
    //     completed: todo.completed,
    //     userId: todo.userId,
    //   })
    //   .then(function (res) {
    //     if (res?.data) {
    //       setTodos((prev) => [res.data, ...prev]);
    //     }
    //     console.log(res.data);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   })
    //   .finally(() => setLoader(false));
  };

  const updateTodo = (id, todo) => {
    setLoader(true);
    axios
      .put(`${URL}/todos/${id}`, {
        id: String(todo.id),
        todo: todo.todo,
        completed: todo.completed,
        userId: todo.userId,
      })
      .then(function (res) {
        if (res?.data) {
          setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? res.data : prevTodo))
          );
        }
        console.log(`Todo Updated Msg: ${res.data.todo}`);
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(() => setLoader(false));
  };

  const deleteTodo = (id) => {
    setLoader(true);
    axios
      .delete(`${URL}/todos/${String(id)}`)
      .then(function (res) {
        if (res?.data) {
          setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
        }
        console.log(`Deleted Todo: ${res.data.id}.${res.data.todo}`);
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(() => setLoader(false));
  };

  const toggleTodo = (id, todo) => {
    setLoader(true);
    axios
      .put(`${URL}/todos/${id}`, {
        id: String(todo.id),
        todo: todo.todo,
        completed: !todo.completed,
        userId: todo.userId,
      })
      .then(function (res) {
        if (res?.data?.todo) {
          setTodos((prev) =>
            prev.map((prevTodo) =>
              prevTodo.id === id
                ? { ...prevTodo, completed: res.data.completed }
                : prevTodo
            )
          );
          console.log(`Todo Checked: ${res.data.completed}`);
        }
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    axios
      .get(`${URL}/todos?limit=10`)
      .then(function (res) {
        if (res?.data?.todos) {
          setTodos(res.data.todos);
          // console.log(res.data);
        }
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(() => setLoader(false));
  }, [URL]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8 con">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3 todos-con scrollbar overflow-y-auto">
            {loader ? (
              <Loader />
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
