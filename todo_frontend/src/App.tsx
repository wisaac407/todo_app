import React from "react";
import "./App.scss";
import { Container, Card } from "react-bootstrap";
import TodoList from "./TodoList";

const App: React.FC = () => {
  return (
    <Container>
      <TodoList></TodoList>
    </Container>
  );
};

export default App;
