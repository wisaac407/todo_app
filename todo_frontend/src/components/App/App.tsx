import React, { useState, useMemo, useEffect } from "react";
import "./App.scss";
import { Container, Navbar } from "react-bootstrap";
import TodoList from "../TodoList/TodoList";
import { Todo } from "../../types";
import TodoService from "../../services/TodoService";

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

  const createTodo = (task: string) => {
    setTodos([
      ...todos,
      {
        task,
        id: -1,
        complete: false
      }
    ]);
    handleServiceRequest(TodoService.createTodo(task));
  };

  const updateTodo = (todo: Partial<Todo> & Pick<Todo, "id">) => {
    setTodos(
      todos.map(td =>
        td.id === todo.id
          ? {
              ...td,
              ...todo
            }
          : td
      )
    );
    handleServiceRequest(TodoService.updateTodo(todo));
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(todos.filter(td => td.id !== todo.id));
    handleServiceRequest(TodoService.deleteTodo(todo));
  };

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
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Task List</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <TodoList
          createTodo={createTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          todos={memoTodos}
          loading={loading}
        ></TodoList>
      </Container>
    </div>
  );
};

export default App;
