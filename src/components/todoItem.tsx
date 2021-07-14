import * as React from "react";
import { Todo } from "../models";

interface TodoItemProps {
  todoItem: Todo;
  onDelete?: any;
  dispatch?: any;
  inEditMode?: boolean;
  toggleCompletion?: Function;
}

export const TodoItem = React.memo(function({ todoItem, onDelete, dispatch, toggleCompletion, inEditMode }: TodoItemProps) {
  const onToggleComplete = toggleCompletion
    ? (e: any) => {
        toggleCompletion(todoItem.id);
      }
    : undefined;

  const onEditStart =
    dispatch?.startEditItem && dispatch.startEditItem(todoItem.id)
      ? (e: any) => {
          dispatch.startEditItem(todoItem.id);
          if (inputRef && inputRef.current) inputRef.current.value = todoItem.title;
        }
      : undefined;

  const onChangeTitle = (e: any) => {
    if (e.key === "Enter" && dispatch.setNewTodoTitle) dispatch?.setNewTodoTitle(e.target.value);
    else if (e.key === "Escape" && dispatch.abortEditItem) dispatch?.abortEditItem();
  };

  const onStopEdit =
    dispatch?.setNewTodoTitle && dispatch.setNewTodoTitle()
      ? (e: any) => {
          dispatch.setNewTodoTitle(e.target.value);
        }
      : undefined;

  //Requirement:  focus input if in EditMode
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inEditMode) {
      if (inputRef.current) inputRef.current.focus();
    }
  }, [inEditMode]);

  const completedClass = todoItem.isCompleted ? "completed" : "";
  const editingClass = inEditMode ? "editing" : "";
  return (
    <li className={[completedClass, editingClass].join(" ")}>
      <div className="view">
        {onToggleComplete ? (
          <input className="toggle" type="checkbox" checked={todoItem.isCompleted} onChange={onToggleComplete} />
        ) : null}
        <label onDoubleClick={onEditStart}>{todoItem.title}</label>
        {onDelete ? <button className="destroy" onClick={() => onDelete(todoItem.id)} /> : null}
      </div>
      <input ref={inputRef} className="edit" onKeyUp={onChangeTitle} onBlur={onStopEdit} />
    </li>
  );
});
