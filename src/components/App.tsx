import React from "react";
import { connect } from "react-redux";
import { Todo, fetchToDos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchToDos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  loading: boolean;
}

class App1 extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<AppProps>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ): void {
    if (
      (!prevProps.todos.length && this.props.todos.length) ||
      prevState.loading
    ) {
      this.setState({ loading: false });
    }
  }

  handleOnButtonClick = (): void => {
    this.props.fetchToDos();
    this.setState({ loading: true });
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

        {this.state.loading ? (
          <div style={{ fontSize: 50, margin: 30 }}>Loading.....</div>
        ) : (
          this.renderList()
        )}
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
