import React, {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  ChangeEvent
} from "react";
import { Todo } from "./types";
import { Card, Button, Form } from "react-bootstrap";

interface TodoItemProps {
  todo: Todo;
  onChange: (todoUpdate: Partial<Todo> & Pick<Todo, "id">) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onChange }) => (
  <Form.Check
    custom
    label={todo.task}
    id={`todo-${todo.id}`}
    checked={todo.complete}
    onChange={(event: ChangeEvent<HTMLInputElement>) =>
      onChange({ ...todo, complete: event.currentTarget.checked })
    }
  ></Form.Check>
);

interface TodoListProps {
  todos: Todo[];
  createTodo: (todo: string) => void;
  updateTodo: (todo: Partial<Todo> & Pick<Todo, "id">) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  createTodo,
  updateTodo
}) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setNewTodo(event.currentTarget.value);
  };

  const handleFormSubmit: FormEventHandler = event => {
    event.preventDefault();

    // Add task
    createTodo(newTodo);

    // Clear new todo
    setNewTodo("");
  };

  return (
    <Card>
      <Card.Body>
        <div className="todos">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={updateTodo}
            ></TodoItem>
          ))}
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Control
            type="text"
            value={newTodo}
            onChange={handleChange}
          ></Form.Control>
          <Button type="submit">Add</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TodoList;
