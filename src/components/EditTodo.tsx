import React, { useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

interface EditTodoProps {
  todo: Todo;
  onEdit: () => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todo, onEdit, onCancel }) => {
  const [task, setTask] = useState<string>(todo.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Update</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTodo;
