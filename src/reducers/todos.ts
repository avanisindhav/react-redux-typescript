import { Todo, FetchTodosAction } from "../actions";
import { ActionTypes } from "../actions/actionTypes";

export const todosReducer = (state: Todo[] = [], actions: FetchTodosAction) => {
  switch (actions.type) {
    case ActionTypes.fetchTodos:
      return actions.payload;
    default:
      return state;
  }
};
