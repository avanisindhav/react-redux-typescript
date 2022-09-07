import axios from "axios";
import { Dispatch } from "redux";
import { actionTypes } from "./actionTypes";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const url = ` https://jsonplaceholder.typicode.com/todos`;

export const fetchToDos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(url);

    dispatch({
      type: actionTypes.fetchTodos,
      payload: response.data,
    });
  };
};
