import React, { useState, useMemo } from "react";
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

  const deleteTodo = ({ id }: Todo) =>
    setTodos(todos.filter(todo => todo.id !== id));

  const memoTodos = useMemo(
    () =>
      todos.sort((a, b) => {
        if (a.complete && !b.complete) {
          return 1;
        } else if (b.complete && !a.complete) {
          return -1;
        } else {
          return 0;
        }
      }),
    [todos]
  );

  return (
    <Container>
      <TodoList
        createTodo={createTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        todos={todos}
      ></TodoList>
    </Container>
  );
};

export default App;
