import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}

export interface deleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

const url = ` https://jsonplaceholder.typicode.com/todos`;

export const fetchToDos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(url);

    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data,
    });
  };
};

export const deleteTodo = (id: number): deleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id,
  };
};
