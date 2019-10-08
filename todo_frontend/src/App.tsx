import React, { useState } from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import TodoList from "./TodoList";
import { Todo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = (task: string) =>
    setTodos([
      ...todos,
      {
        task,
        id: Math.floor(Math.random() * 10000),
        complete: false
      }
    ]);

  const updateTodo = (todoUpdate: Partial<Todo> & Pick<Todo, "id">) =>
    setTodos(
      todos.map(todo =>
        todo.id === todoUpdate.id ? { ...todo, ...todoUpdate } : todo
      )
    );

  return (
    <Container>
      <TodoList
        createTodo={createTodo}
        updateTodo={updateTodo}
        todos={todos}
      ></TodoList>
    </Container>
  );
};

export default App;
