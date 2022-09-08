import React from "react";
import { connect } from "react-redux";
import { Todo, fetchToDos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchToDos: Function;
  deleteTodo: typeof deleteTodo;
}

class App1 extends React.Component<AppProps> {
  handleOnButtonClick = (): void => {
    this.props.fetchToDos();
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div
          // datatooltip="Delete"
          style={{ margin: 7, padding: 3, border: "0.5px solid #f0e1e3" }}
          onClick={() => this.onTodoClick(todo.id)}
          key={todo.id}
        >
          {todo.id} :- {todo.title} - {todo.completed ? "✔️" : "🚩"}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button style={{ marginBottom: 20 }} onClick={this.handleOnButtonClick}>
          Fetch Data
        </button>

        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, {
  fetchToDos,
  deleteTodo,
})(App1);
