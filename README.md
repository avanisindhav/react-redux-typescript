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
