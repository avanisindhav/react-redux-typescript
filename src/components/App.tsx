import React from "react";
import { connect } from "react-redux";
import { Todo, fetchToDos } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchToDos: any;
}

class _App extends React.Component<AppProps> {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, {
  fetchToDos,
})(_App);
