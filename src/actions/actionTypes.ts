import { FetchTodosAction, deleteTodoAction } from "./todos";

export enum ActionTypes {
  fetchTodos,
  deleteTodo,
}

export type todoActions = FetchTodosAction | deleteTodoAction;
