import * as React from "react";

interface MainProps {
  toggleCompleteAll?: Function;
  allChecked: boolean;
}

export function Main({
  toggleCompleteAll,
  allChecked,
  ...props
}: React.PropsWithChildren<MainProps>) {
  return (
    <section className="main">
      {toggleCompleteAll ? (
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={allChecked}
          onChange={() => {
            toggleCompleteAll();
          }}
        />
      ) : null}
      {toggleCompleteAll ? (
        <label htmlFor="toggle-all">Mark all as complete</label>
      ) : null}
      <ul className="todo-list">{props.children}</ul>
    </section>
  );
}
