// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
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

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
