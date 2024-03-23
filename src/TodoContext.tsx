import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  completedTodos: Todo[];
  addTodo: (task: string) => void;
  editTodo: (id: number, newTask: string) => void;
  deleteTodo: (id: number) => void;
  markAsCompleted: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTodo = (task: string) => {
    const newTodo: Todo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id: number, newTask: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, task: newTask } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const markAsCompleted = (id: number) => {
    const completedTodo = todos.find(todo => todo.id === id);
    if (completedTodo) {
      setCompletedTodos([...completedTodos, completedTodo]);
      deleteTodo(id);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, completedTodos, addTodo, editTodo, deleteTodo, markAsCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};