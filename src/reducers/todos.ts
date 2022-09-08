import { Todo, todoActions, ActionTypes } from "../actions";

export const todosReducer = (state: Todo[] = [], actions: todoActions) => {
  switch (actions.type) {
    case ActionTypes.fetchTodos:
      return actions.payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo) => todo.id !== actions.payload);
    default:
      return state;
  }
};
