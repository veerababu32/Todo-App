import { createContext, useContext } from 'react';

// sample data
// todos: [
//   {
//     id: 1,
//     todo: 'Hey this is todo!',
//     completed: 'false',
//     userId: 100
//   }
// ]

export const TodoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  toggleTodo: (id, todo) => {},
  deleteTodo: (id) => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
