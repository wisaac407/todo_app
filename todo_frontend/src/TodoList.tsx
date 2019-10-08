import React, {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  ChangeEvent
} from "react";
import { Todo } from "./types";
import { Card, Button, Form, InputGroup, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./TodoList.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface TodoItemProps {
  todo: Todo;
  onChange: (todoUpdate: Partial<Todo> & Pick<Todo, "id">) => void;
  onDelete: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onChange, onDelete }) => (
  <Form.Row className={todo.complete ? "todo todo-complete" : "todo"}>
    <Col>
      <Form.Check
        custom
        label={todo.task}
        id={`todo-${todo.id}`}
        checked={todo.complete}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange({ ...todo, complete: event.currentTarget.checked })
        }
      ></Form.Check>
    </Col>
    <Col>
      <Button className="todo-trash" onClick={() => onDelete(todo)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Col>
  </Form.Row>
);

interface TodoListProps {
  todos: Todo[];
  createTodo: (todo: string) => void;
  updateTodo: (todo: Partial<Todo> & Pick<Todo, "id">) => void;
  deleteTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  createTodo,
  updateTodo,
  deleteTodo
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
        <Card.Title>Task List:</Card.Title>
        <div className="todos">
          <TransitionGroup>
            {todos.length > 0 ? (
              todos.map(todo => (
                <CSSTransition timeout={150} classNames="todo" key={todo.id}>
                  <TodoItem
                    todo={todo}
                    onChange={updateTodo}
                    onDelete={deleteTodo}
                  ></TodoItem>
                </CSSTransition>
              ))
            ) : (
              <CSSTransition timeout={0} key={"no-tasks"}>
                <div>No tasks</div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
        <Form onSubmit={handleFormSubmit} inline>
          <InputGroup className="todo-input-group">
            <Form.Control
              className="todo-input"
              type="text"
              value={newTodo}
              onChange={handleChange}
            ></Form.Control>
            <InputGroup.Append>
              <Button type="submit">Add</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TodoList;
