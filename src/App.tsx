/* eslint-disable require-yield */
import * as React from "react";
import "todomvc-app-css/index.css";
import {Main} from "./components/main";
import {Footer} from "./components/footer";
import {TodoInput} from "./components/todoInput";
import {TodoItem} from "./components/todoItem";
import {askFor, scenario, set} from "@flowcards/core";
import {Todo} from "./models";
import * as utils from "./utils";
import {useScenarios} from "./useScenarios";
import "flowcards-debugger-wc";

const todoEvent = {
  addTodo: 'addTodo',
  todos: 'todos'
};

// REQUIREMENT: user can create a new todo
function newTodo(title: string) {
  return { id: utils.uuid(), title: title, isCompleted: false };
}

const newTodoCanBeAdded = scenario(
  {
    id: "newTodoCanBeAdded"
  },
  function* () {
    while (true) {
      const bid = yield askFor(todoEvent.addTodo);
      const todo = newTodo(bid.payload);
      yield set(todoEvent.todos, (currentTodos: any) => [todo, ...(currentTodos?.value || [])]);
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
const toggleCompleteAll = scenario(
  {
    id: "toggleCompleteAll"
  },
  function* () {
    // TODO
  }
);

// REQUIREMENT: user can toggle the completion-state of a single todo
const toggleCompleteSingle = scenario(
  {
    id: "toggleCompleteSingle"
  },
  function* () {
    // TODO
  }
);

// REQUIREMENT: user can deleta a single todo
function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo: Todo) => id !== todo.id);
}
const itemCanBeDeleted = scenario(
  {
    id: "itemCanBeDeleted"
  },
  function* () {
    // TODO
  }
);

// REQUIREMENT: user can change a todo title
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

// REQUIREMENT: user can clear all completed todos
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
    enable(newTodoCanBeAdded());
  });
  const { event, scenario } = context;
  const todos = event<Todo[]>(todoEvent.todos).value || [];
  // Requirement 1 - hide Main and Footer when no todos are in the list
  const mainAndFooterElement =
    todos.length === 0 ? null : (
      <React.Fragment>
        <Main toggleCompleteAll={undefined}>
          {todos.map((todo: Todo) => (
            <TodoItem
              todoItem={todo}
              toggleCompletion={undefined}
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
