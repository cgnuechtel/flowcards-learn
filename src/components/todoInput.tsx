import * as React from "react";

export function TodoInput({ onEnter }: any) {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onEnter?.(e.target.value);
      e.target.value = "";
    }
  };
  return (
    <input
      onKeyDown={handleKeyDown}
      className="new-todo"
      placeholder="What needs to be done?"
    />
  );
}
