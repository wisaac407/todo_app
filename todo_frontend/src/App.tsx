import React, { useState, useMemo, useEffect } from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import TodoList from "./TodoList";
import { Todo } from "./types";
import TodoService from "./TodoService";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  function handleServiceRequest(request: Promise<Todo[]>) {
    setLoading(true);
    request.then(todos => {
      setLoading(false);
      setTodos(todos);
    });
  }

  useEffect(() => {
    // Load todos for the first time
    handleServiceRequest(TodoService.getTodos());
  }, []);

  const createTodo = (task: string) =>
    handleServiceRequest(TodoService.createTodo(task));

  const updateTodo = (todo: Partial<Todo> & Pick<Todo, "id">) =>
    handleServiceRequest(TodoService.updateTodo(todo));

  const deleteTodo = (todo: Todo) =>
    handleServiceRequest(TodoService.deleteTodo(todo));

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
        todos={memoTodos}
        loading={loading}
      ></TodoList>
    </Container>
  );
};

export default App;
