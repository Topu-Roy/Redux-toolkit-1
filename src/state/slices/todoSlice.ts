import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchTodos } from "../../server/fetchTodos";

export type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoStateType = {
  todos: TodoType[];
  isLoading: boolean;
  isError: string | null;
};

const initialState: TodoStateType = {
  todos: [],
  isLoading: false,
  isError: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ todo: TodoType }>) => {
      const isExist = state.todos.findIndex(
        (item) => item.id === action.payload.todo.id,
      );

      if (isExist === -1) {
        state.todos.unshift(action.payload.todo);
      }
    },
    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.todos.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    markComplete: (state, action: PayloadAction<{ id: string }>) => {
      const targetTodo = state.todos.find(
        (item) => item.id === action.payload.id,
      );

      if (targetTodo) {
        if (!targetTodo.completed) {
          targetTodo.completed = true;
        }
      }
    },
    markIncomplete: (state, action: PayloadAction<{ id: string }>) => {
      const targetTodo = state.todos.find(
        (item) => item.id === action.payload.id,
      );

      if (targetTodo) {
        if (targetTodo.completed) {
          targetTodo.completed = false;
        }
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{ text: string; id: string }>,
    ) => {
      const targetTodo = state.todos.find(
        (item) => item.id === action.payload.id,
      );

      if (targetTodo) {
        targetTodo.text = action.payload.text;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addTodoAsync.fulfilled,
        (state, action: PayloadAction<TodoType[]>) => {
          state.isLoading = false;
          state.todos = action.payload;
        },
      );
  },
});

export const addTodoAsync = createAsyncThunk("todo/addTodoAsync", async () => {
  const todos = await fetchTodos();
  return todos;
});

export const { addTodo, markComplete, markIncomplete, removeTodo, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
