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

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setNewTodo(event.currentTarget.value);
  };

  const handleFormSubmit: FormEventHandler = event => {
    console.log(event);
    event.preventDefault();

    // Add task
    setTodos([
      ...todos,
      {
        complete: false,
        id: Math.floor(Math.random() * 100000),
        task: newTodo
      }
    ]);

    // Clear new todo
    setNewTodo("");
  };

  const updateTodo = (todoUpdate: Partial<Todo> & Pick<Todo, "id">) => {
    setTodos(
      todos.map(todo =>
        todo.id === todoUpdate.id ? { ...todo, ...todoUpdate } : todo
      )
    );
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
