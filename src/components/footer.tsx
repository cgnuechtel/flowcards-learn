import * as React from "react";
import * as utils from "../utils";

interface FooterProps {
  todoCount?: number;
  clearCompleted?: Function;
}

export function Footer({ todoCount, clearCompleted }: FooterProps) {
  const onClearCompleted = () => {
    clearCompleted?.()();
  };
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todoCount}</strong> {utils.pluralize(todoCount || 0, "item")}{" "}
        left
      </span>
      <ul className="filters" />
      {clearCompleted ? (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}
