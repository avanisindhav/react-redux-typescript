import React from "react";
import ReactDOM from "react-dom";

interface AppProps {
  color: string;
}

const App = (props: AppProps): JSX.Element => {
  return <div>{`color is ${props.color}`}</div>;
};

// interface AppState {
//   counter: number;
// }

// class App extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     this.state = { counter: 0 };
//   }

//   onIncrement = () => {
//     this.setState({ counter: this.state.counter + 1 });
//   };

//   onDecrement = () => {
//     this.setState({ counter: this.state.counter - 1 });
//   };

//   render() {
//     return (
//       <div>
//         <button
//           style={{ margin: 5, borderRadius: 10 }}
//           onClick={this.onIncrement}
//         >
//           Increment
//         </button>
//         <button
//           style={{ margin: 5, borderRadius: 10 }}
//           onClick={this.onDecrement}
//         >
//           Decrement
//         </button>
//         <div style={{ margin: 5, borderRadius: 10 }}>
//           Counter is: {this.state.counter}
//         </div>
//       </div>
//     );
//   }
// }

ReactDOM.render(<App color="skyblue" />, document.querySelector("#root"));
