import { Todo } from "./types";

// Stand-in service file that simulates api latency.

function sleep(time: number) {
  return new Promise(done => setTimeout(done, time));
}

const todos: Record<number, Todo> = {
  1: {
    id: 1,
    complete: false,
    task: "Build Frontend"
  },
  2: {
    id: 2,
    complete: false,
    task: "Build Backend"
  }
};
let last_id = 2;

function _getTodos() {
  return Object.values(todos);
}

export async function getTodos() {
  await sleep(500);
  return _getTodos();
}

export async function createTodo(task: string) {
  const id = ++last_id;
  todos[id] = {
    task,
    id: last_id++,
    complete: false
  };
  await sleep(500);
  return _getTodos();
}

export async function updateTodo(todo: Partial<Todo> & Pick<Todo, "id">) {
  todos[todo.id] = {
    ...todos[todo.id],
    ...todo
  };
  await sleep(500);
  return _getTodos();
}

export async function deleteTodo({ id }: Todo) {
  delete todos[id];
  await sleep(500);
  return _getTodos();
}

export default {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo
};
