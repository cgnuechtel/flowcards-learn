import * as React from "react";

export function TodoInput({ onEnter }: any) {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      const trigger = onEnter?.(e.target.value);
      if (trigger) {
        e.target.value = "";
        trigger();
      }
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
