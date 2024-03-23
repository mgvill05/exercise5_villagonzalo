import React from 'react';
import { useTodoContext } from '../TodoContext.tsx';

const TodoList = () => {
  const { todos, completedTodos, editTodo, deleteTodo, markAsCompleted } = useTodoContext();

  const handleEdit = (id, newTask) => {
    editTodo(id, newTask);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleCheckboxChange = (id) => {
    markAsCompleted(id);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '20px' }}>
        <h2>Tasks</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
                style={{ marginRight: '0.5rem' }}
              />
              <span>{todo.task}</span>
              <button onClick={() => handleEdit(todo.id, prompt('Enter new task:', todo.task))}>
                Edit
              </button>
              <button onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ borderLeft: '1px solid gray', paddingLeft: '20px' }}>
        <h2>Completed</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {completedTodos.map(todo => (
            <li key={todo.id} style={{ marginBottom: '0.5rem' }}>
              <span>{todo.task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
