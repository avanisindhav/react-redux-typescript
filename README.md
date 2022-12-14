## 1. npx create-react-app rrts --template typescript

## 2. delete all file inside src folder

add below code in index.tsx file and npm start

```
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    render() {
        return <div>Hi there</div>;
    }
}
ReactDOM.render(<App />,document.querySelector("#root"));

```

## 3. Interfaces with Props

while try to add props in App components in ReactDom.render named color its props some error in the screen as React.Component is generic class and if we want to pass any props we need to create interface explaning/defining all the props and types class going to receive and all them in the class declaration time that way we can work with the props

```
interface AppProps {
 color : string
}

class App extends React.Component<AppProps> {

}

<App color="red" />

```

## 4. Handling Component State and Confusing Component State

<br>
Lets try to understand state using counter app

in index.tsx

        import React from "react";
        import ReactDOM from "react-dom";

        interface AppProps {
            color: string;
        }

        class App extends React.Component<AppProps> {
            state = { counter: 0 };

            onIncrement = () => {
                this.setState({ counter: this.state.counter + 1 });
            };

            onDecrement = () => {
                this.setState({ counter: this.state.counter - 1 });
            };

            render() {
                return (
                <div>
                    <button
                        style={{ margin: 5, borderRadius: 10 }}
                        onClick={this.onIncrement}
                        >
                        Increment
                    </button>
                    <button
                        style={{ margin: 5, borderRadius: 10 }}
                        onClick={this.onDecrement}
                        >
                        Decrement
                    </button>
                    <div style={{ margin: 5, borderRadius: 10 }}>
                        Counter is: {this.state.counter}
                    </div>
                </div>
                );
            }
        }

        ReactDOM.render(<App color="skyblue" />, document.querySelector("#root"));

this works well and perfect but if we uses same with the constructor function it start props error

```
TS2339: Property 'counter' does not exist on type 'Readonly<{}>
```

is because when we use first appox due to we extending component its override the state but it this appoch we need to pass typed state in components generics

like this

```
import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color: string;
}

interface AppState {
  counter: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { counter: 0 };
  }

  onIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  onDecrement = () => {
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return (
      <div>
        <button
          style={{ margin: 5, borderRadius: 10 }}
          onClick={this.onIncrement}
        >
          Increment
        </button>
        <button
          style={{ margin: 5, borderRadius: 10 }}
          onClick={this.onDecrement}
        >
          Decrement
        </button>
        <div style={{ margin: 5, borderRadius: 10 }}>
          Counter is: {this.state.counter}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App color="skyblue" />, document.querySelector("#root"));
```

### choose either one of the appox

<br>

## 5. Function components

```
const App = (props: AppProps): JSX.Element => {
  return <div>{`color is ${props.color}`}</div>;
};
```

[link](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/) found during some search for cheetsheet how to work with typescript with react

## 6. Redux SetUp

npm install redux react-redux redux-thunk axios

remove code from the index.tsx

replace below code in index.tsx

```
import ReactDOM from "react-dom";
import {
  createStore /* will continyue as we have to use redux only*/,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { App } from "./components/App";

/* will continue as we have to use redux only we can use redux toolkit to eliminate error */
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
```

add reducers folder in src and index.ts file in reducers folder with below code

```
import { combineReducers } from "redux";

export const reducers = combineReducers({
  counter: () => 1,
});

```

add componets folder in src and add App.tsx file in components folder with below code

```
import React from "react";

export class App extends React.Component {
  render() {
    return <div>Hi there !!!</div>;
  }
}

```

## 7. Action Creators with Typescript

- add actions->index.ts folder->file in src
- using this api endpoint https://jsonplaceholder.typicode.com/todos we will create async action in that
- start most difficult part to work with react/ redux with typescript
- as we dont know what is the type of dispatch is so import redux and go to type definition part and get type of dispatch and then import that type and use that
- code inside index.ts in actions folder

```
import axios from "axios";
import { Dispatch } from "redux";

const url = `https://jsonplaceholder.typicode.com/todos`;

export const fetchToDos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get(url);

    dispatch({
      type: "FETCH_TODOS",
      payload: response.data,
    });
  };
};

```

Problem we have Using above code

1. beside 1 single annotation(Dispatch) we have no type safety
2. we have no idea which kind of data axios request returns
3. FETCH_TODOS is hardcorded
4. dispatch is generic so we can use in better way by providing more info which kind of args it should allow

## 8. Add type for response from axios and the remove hardcorded ActionTypes

- add file named ActionTypes.ts in actions folder add below code

```
export enum ActionTypes {
  fetchTodos,
}
```

- in index.ts file in actions folder add below code

interface named Todo

```
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

inside return dispatch function added Todo[] type that will help us to identify return data from axios and payload data type and import ActionTypes and use that in type in dispatch

```
const response = await axios.get<Todo[]>(url);
dispatch({
  type: ActionTypes.fetchTodos,
  payload: response.data,
});
```

## 9. The Generic Dispatch Function

in index.ts in actions added

```
interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[];
}
dispatch<FetchTodosAction>({
  type: ActionTypes.fetchTodos,
  payload: response.data,
});
```

## 10. Reducers with ENUM

in previos video we are done with action creator now create reducers for todos

create todos.ts file in reducers

```
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

```

## 11. Validating Store Structure

- in reducers index.ts file
- add StoreState interface and combineReducers generic tye

```
export interface StoreState {
  todos: Todo[];
}

export const reducers = combineReducers<StoreState>({
  todos: todosReducer,
});

```

## 12. Connecting a Components to Redux

- access to action creator
- access to todos store
- code added in App.tsx

```
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

```

## 13. Rendering a List

- define lifecycle method
- to fetch todos
- added below code in App.tsx file

- above render

```
handleOnButtonClick = (): void => {
  this.props.fetchToDos();
};

renderList(): JSX.Element[] {
  return this.props.todos.map((todo: Todo) => {
    return (
      <div key={todo.id}>
        {todo.id} - {todo.title} -
        {todo.completed ? "Completed" : "Not Completed"}
      </div>
    );
  });
}
```

inside render

```
return (
  <div>
    <button onClick={this.handleOnButtonClick}>Fetch Data</button>
    {this.renderList()}
  </div>
);
```

## 14. Adding a Delete Functionality in this add action first

- in actions->actionType.ts add deleteTodo type
- in index.js add below code

```
export interface deleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

export const deleteTodo = (id: number): deleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id,
  };
};

```

## 15. Breaking Out Action Creators

- just added the file named todos.ts in actions add cut code from index.ts to that file
- in index.ts just export all the files of actions folder like below

```
export * from "./todos";
export * from "./actionTypes";
```

and adjust imports

## 16. Expressing Actions as Type Union

- in actions folder actionnTypes added below code

```
import { FetchTodosAction, deleteTodoAction } from "./todos";

export type todoActions = FetchTodosAction | deleteTodoAction;
```

- in reducers folder in import the action union type and add as action type and now we handle delete action

## 17. DeleteTodo type handle in reducer

-in reducers todos.ts reducer added below code to handle delete action

```
case ActionTypes.deleteTodo:
  return state.filter((todo) => todo.id !== actions.payload);
```

## 18. Wiring up deleteToDo Action

1. Add the deleteTodo action creator to the import: in App.tsx

```
import { Todo, fetchTodos, deleteTodo } from '../actions';
```

2. Add the deleteTodo property and type and change the fetchTodos type in our interface:

```
interface AppProps {
  todos: Todo[];
  fetchTodos: typeof fetchTodos;
  deleteTodo: typeof deleteTodo;
}
```

3. Create the onTodoClick method directly after the onButtonClick method.

```
onTodoClick = (id: number): void => {
  this.props.deleteTodo(id);
};
```

4. Refactor the return in our renderList method to include the onClick handler:

From this:

```
renderList(): JSX.Element[] {
  return this.props.todos.map((todo: Todo) => {
    return <div key={todo.id}>{todo.title}</div>;
  });
}
```

To This:

```
renderList(): JSX.Element[] {
  return this.props.todos.map((todo: Todo) => {
    return (
        <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
    );
  });
}
```

5. Finally, add the deleteTodo action creator to the connect function's mapDispatchToProps argument:

```
export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App);

```

Finally At point we are seeing some error like

This will get us caught up to where we need to be for the next lecture Again, Type Definition Files. In that lecture, we will discuss why we are getting the error and how to fix it.

```
ERROR in src/components/App.tsx:48:4

TS2345: Argument of type 'typeof App1' is not assignable to parameter of type 'ComponentType<Matching<{ todos: Todo[]; } & { fetchToDos: () => Promise<void>; deleteTodo: (id: number) => deleteTodoAction; }, ClassAttributes<App1> & AppProps>>'.
  Type 'typeof App1' is not assignable to type 'ComponentClass<Matching<{ todos: Todo[]; } & { fetchToDos: () => Promise<void>; deleteTodo: (id: number) => deleteTodoAction; }, ClassAttributes<App1> & AppProps>, any>'.
    Types of parameters 'props' and 'props' are incompatible.
      Type 'Matching<{ todos: Todo[]; } & { fetchToDos: () => Promise<void>; deleteTodo: (id: number) => deleteTodoAction; }, ClassAttributes<App1> & AppProps>' is not assignable to type 'AppProps | Readonly<AppProps>'.
```

## 19. Again type definition file

- type definition of connect function expect second argument is object but due to we use thunk fetchTodos its return Promise<void> so to avoid this in AppProps we declare type o`f fetchTodos to Function to foll TypeScript

## 20. Tracking Loading with component state

- add loading state in App.tsx and in

```
import React from "react";
import { connect } from "react-redux";
import { Todo, fetchToDos, deleteTodo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchToDos: Function;
  deleteTodo: typeof deleteTodo;
}

//added
interface AppState {
  loading: boolean;
}

class App1 extends React.Component<AppProps, AppState /* added */> {
  //added
  constructor(props: AppProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

 //added
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
    this.setState({ loading: true });  //added
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
          {todo.id} :- {todo.title} - {todo.completed ? "??????" : "????"}
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

        <!-- added -->
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
```

## 21. Wrapup

- AppProps
- AppState two approach
- types file actionTypes enum
- type union
- action type-guard
