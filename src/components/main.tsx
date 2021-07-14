import * as React from "react";

interface MainProps {
  toggleCompleteAll?: Function;
}

export function Main({
  toggleCompleteAll,
  ...props
}: React.PropsWithChildren<MainProps>) {
  const setCompleteAll = toggleCompleteAll && toggleCompleteAll(true);
  const setUnCompleteAll = toggleCompleteAll && toggleCompleteAll(false);
  return (
    <section className="main">
      {setCompleteAll ? (
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={false}
          onChange={setCompleteAll}
        />
      ) : null}
      {setUnCompleteAll ? (
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={true}
          onChange={setUnCompleteAll}
        />
      ) : null}
      {toggleCompleteAll ? (
        <label htmlFor="toggle-all">Mark all as complete</label>
      ) : null}
      <ul className="todo-list">{props.children}</ul>
    </section>
  );
}
