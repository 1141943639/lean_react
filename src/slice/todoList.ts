import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { List } from "pages/TodoList/interface";

interface TodoListState {
  list: List;
}

const initialState: TodoListState = {
  list: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<List>) {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodoList } = todoListSlice.actions;

export default todoListSlice.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.todoList;
