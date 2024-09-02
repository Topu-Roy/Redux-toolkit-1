import { TodoType } from "../state/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

const todos: TodoType[] = [
  { id: uuidv4(), completed: false, text: "Demo todo 1" },
  { id: uuidv4(), completed: false, text: "Demo todo 2" },
  { id: uuidv4(), completed: false, text: "Demo todo 3" },
  { id: uuidv4(), completed: false, text: "Demo todo 4" },
  { id: uuidv4(), completed: false, text: "Demo todo 5" },
];

export async function fetchTodos(): Promise<TodoType[]> {
  return new Promise((resolve) => setTimeout(() => resolve(todos), 2000));
}
