import { Todo, FetchTodosAction, ActionTypes } from "../actions";

export const todosReducer = (state: Todo[] = [], actions: FetchTodosAction) => {
  switch (actions.type) {
    case ActionTypes.fetchTodos:
      return actions.payload;
    default:
      return state;
  }
};
