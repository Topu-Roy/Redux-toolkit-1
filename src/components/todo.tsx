import { useDispatch } from "react-redux";
import { DispatchType } from "../state/store";
import { useEffect, useRef, useState } from "react";
import {
  markComplete,
  markIncomplete,
  removeTodo,
  TodoType,
  updateTodo,
} from "../state/slices/todoSlice";
import { cn } from "../lib/utils";

export default function Todo({ todo }: { todo: TodoType }) {
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch<DispatchType>();
  const editTextInputRef = useRef<HTMLInputElement>(null);

  function handleEditToggle() {
    setShowInput((prev) => !prev);
  }

  function handleSaveEdit() {
    if (editTextInputRef.current) {
      if (editTextInputRef.current.value === "") return;
      dispatch(
        updateTodo({
          id: todo.id,
          text: editTextInputRef.current.value,
        }),
      );
      handleEditToggle();
    }
  }

  function handleStatusChange() {
    if (todo.completed) {
      dispatch(markIncomplete({ id: todo.id }));
    } else {
      dispatch(markComplete({ id: todo.id }));
    }
  }

  useEffect(() => {
    if (editTextInputRef.current) {
      editTextInputRef.current.focus();
    }
  }, [showInput]);

  return (
    <div className="w-full rounded-md bg-black/5 p-4 ring-[1px] ring-black/10 hover:ring">
      {showInput ? (
        <input
          type="text"
          className="w-full rounded-md border border-black/20 bg-black/5 p-4"
          ref={editTextInputRef}
          defaultValue={todo.text}
        />
      ) : (
        <p
          className={cn(
            "line-clamp-2 text-lg font-semibold leading-5",
            todo.completed ? "italic line-through" : "",
          )}
        >
          {todo.text}
        </p>
      )}

      <p className="pb-6 pt-2">
        Status: {todo.completed ? "Finished" : "Pending"}
      </p>
      <button
        className="mr-3 rounded-md border border-black/5 bg-black/10 px-4 py-2 text-black hover:bg-rose-800 hover:text-white active:scale-105"
        onClick={() => dispatch(removeTodo({ id: todo.id }))}
      >
        Delete
      </button>
      {showInput ? (
        <button
          className="mr-3 rounded-md border border-black/5 bg-black/10 px-4 py-2 text-black hover:bg-rose-800 hover:text-white active:scale-105"
          onClick={handleSaveEdit}
        >
          Save
        </button>
      ) : (
        <button
          className="mr-3 rounded-md border border-black/5 bg-black/10 px-4 py-2 text-black hover:bg-gray-800 hover:text-white active:scale-105"
          onClick={handleEditToggle}
        >
          Edit
        </button>
      )}
      <button
        className="rounded-md border border-black/5 bg-black/10 px-4 py-2 text-black hover:bg-gray-800 hover:text-white active:scale-105"
        onClick={handleStatusChange}
      >
        {todo.completed ? "Finished" : "Finish"}
      </button>
    </div>
  );
}
