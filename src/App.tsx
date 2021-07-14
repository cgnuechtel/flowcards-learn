/* eslint-disable require-yield */
import * as React from "react";
import "todomvc-app-css/index.css";
import {Main} from "./components/main";
import {Footer} from "./components/footer";
import {TodoInput} from "./components/todoInput";
import {TodoItem} from "./components/todoItem";
import {askFor, CachedItem, scenario, set} from "@flowcards/core";
import {Todo} from "./models";
import * as utils from "./utils";
import {useScenarios} from "./useScenarios";
import "flowcards-debugger-wc";

const todoEvent = {
  addTodo: 'addTodo',
  todos: 'todos',
  toggleTodo: 'toggleTodo',
  toggleTodos: 'toggleTodos',
  deleteTodo: 'deleteTodo'
};

// REQUIREMENT: user can create a new to-do
// VALIDATION: user must not create an empty to-do
const addTodo = scenario(
  {
    id: "addTodo"
  },
  function* () {
    while (true) {
      const bid = yield askFor(todoEvent.addTodo, (todoTitle) => todoTitle?.length > 0);
      const todo = {
        id: utils.uuid(),
        title: bid.payload,
        isCompleted: false
      };
      yield set(todoEvent.todos, (todos: CachedItem<Todo[]>) => [todo, ...(todos?.value || [])]);
    }
  }
);

// REQUIREMENT: user can toggle complete state of all todos
function areAllCompleted(todos: Todo[]): boolean {
  return todos.every((t: Todo) => t.isCompleted === true);
}
function setAllCompleted(todos: Todo[], val: boolean): Todo[] {
  return todos.map((t: Todo) => ({ ...t, isCompleted: val }));
}
const toggleTodos = scenario(
  {
    id: "toggleTodos"
  },
  function* () {
    while (true) {
      yield askFor(todoEvent.toggleTodos);
      yield set(todoEvent.todos, (todos: CachedItem<Todo[]>) => {
        return setAllCompleted(todos.value, !areAllCompleted(todos.value));
      })
    }
  }
);

// REQUIREMENT: user can toggle the completion-state of a single to-do
function toggleItemCompleted(todos: Todo[], id: string): Todo[] {
  return todos.map((todo: Todo) =>
    id === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
}
const toggleTodo = scenario(
  {
    id: "toggleTodo"
  },
  function* () {
    while (true) {
      const bid = yield askFor(todoEvent.toggleTodo);
      const todoId = bid.payload;
      yield set(todoEvent.todos, (todos: CachedItem<Todo[]>) => toggleItemCompleted(todos.value, todoId));
    }
  }
);

// REQUIREMENT: user can delete a single to-do
function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo: Todo) => id !== todo.id);
}
const deleteTodo = scenario(
  {
    id: "deleteTodo"
  },
  function* () {
    while (true) {
      const bid = yield askFor(todoEvent.deleteTodo);
      const todoId = bid.payload;
      yield set(todoEvent.todos, (todos: CachedItem<Todo[]>) => removeTodo(todos.value, todoId));
    }
  }
);

// REQUIREMENT: user can change a to-do title
function changeItemTitle(todos: Todo[], id: string, newTitle: string): Todo[] {
  return todos.map((todo: Todo) =>
    id === todo.id ? { ...todo, title: newTitle } : todo
  );
}
const itemTitleCanBeChanged = scenario(
  {
    id: "itemTitleCanBeChanged"
  },
  function* () {
    // TODO
  }
);

// REQUIREMENT: user can clear all completed to-dos
function someCompleted(todos: Todo[]): boolean {
  return todos.some((t: Todo) => t.isCompleted);
}
const completedItemsCanBeCleared = scenario(
  {
    id: "completedItemsCanBeCleared"
  },
  function* () {
    // TODO
  }
);

// APP -----------------------------------------

export default function App() {
  const context = useScenarios((enable, event) => {
    enable(addTodo());
    enable(toggleTodo());
    enable(toggleTodos());
    enable(deleteTodo());
  });
  const { event, scenario } = context;
  const todos = event<Todo[]>(todoEvent.todos).value || [];
  // Requirement 1 - hide Main and Footer when no todos are in the list
  const mainAndFooterElement =
    todos.length === 0 ? null : (
      <React.Fragment>
        <Main toggleCompleteAll={event(todoEvent.toggleTodos).dispatch} allChecked={areAllCompleted(todos)}>
          {todos.map((todo: Todo) => (
            <TodoItem
              todoItem={todo}
              toggleCompletion={event(todoEvent.toggleTodo).dispatch}
              onDelete={event(todoEvent.deleteTodo).dispatch}
              dispatch={undefined}
              inEditMode={false}
              key={todo.id}
            />
          ))}
        </Main>
        <Footer todoCount={todos.length} clearCompleted={undefined} />
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <flowcards-debugger context={context}></flowcards-debugger>
      <header className="header">
        <h1>todos</h1>
        <TodoInput onEnter={event(todoEvent.addTodo).dispatch} />
      </header>
      {mainAndFooterElement}
    </React.Fragment>
  );
}
