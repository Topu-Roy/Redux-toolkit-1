import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StoreType } from "../state/store";
import { useEffect, useRef } from "react";
import { addTodo, addTodoAsync } from "../state/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

import Todo from "../components/todo";

export default function Home() {
  const { todos, isLoading, isError } = useSelector(
    (state: StoreType) => state.todo,
  );
  const dispatch = useDispatch<DispatchType>();
  const todoTextInputRef = useRef<HTMLTextAreaElement>(null);

  function handleAddTodo() {
    if (todoTextInputRef.current) {
      if (todoTextInputRef.current.value === "") return;
      dispatch(
        addTodo({
          todo: {
            id: uuidv4(),
            text: todoTextInputRef.current.value,
            completed: false,
          },
        }),
      );

      todoTextInputRef.current.value = "";
    }
  }

  useEffect(() => {
    dispatch(addTodoAsync());
  }, []);

  return (
    <main className="min-h-screen w-full bg-zinc-100 px-2 pb-8 xl:px-0">
      <h1 className="mx-auto max-w-7xl py-8 text-center text-3xl font-bold underline">
        Todo App with Redux Toolkit
      </h1>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="col-span-1">
          <h2 className="py-4 text-xl font-medium">Add new todo</h2>
          <div className="flex flex-col items-start justify-center gap-3">
            <textarea
              className="w-full rounded-md border border-black/20 bg-black/5 p-4"
              ref={todoTextInputRef}
              placeholder="todo text"
            />
            <button
              className="rounded-md bg-black px-8 py-3 text-white hover:bg-gray-800 active:scale-105"
              onClick={() => handleAddTodo()}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="py-4 text-xl font-medium">Todos</h2>
          {isError ? (
            <p className="font-semibold text-rose-500">Something went wrong.</p>
          ) : null}

          {isLoading ? <p>Loading...</p> : null}

          {!isLoading && todos.length < 1 ? <p>No todo found.</p> : null}
          <div className="w-full space-y-4">
            {todos.map((todo) => (
              <Todo todo={todo} key={todo.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
