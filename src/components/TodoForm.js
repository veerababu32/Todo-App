import { useState } from 'react';
import { useTodo } from '../context';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useTodo();

  const add = (e) => {
    const ID = Math.floor(Math.random() * 100) + 30;
    const userId = Math.floor(Math.random() * 100) + 250;
    e.preventDefault();

    if (!todo) return;
    addTodo({
      id: ID,
      todo,
      completed: false,
      userId: userId,
    });

    setTodo('');
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        required
        type="text"
        value={todo}
        placeholder="Write Todo's"
        onChange={(e) => setTodo(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 py-1.5 outline-none duration-150 bg-white/20"
      />
      <button
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
