/**
 * node src/notepad.js
 * to see how redux works
 * https://youtu.be/FGCsuwIORb0
 */

const redux = require("redux");

const initState = {
  todos: [],
  posts: []
};

const addTodo = { type: "ADD_TODO", payload: "купить молоко" };
const delTodo = { type: "DEL_LAST", payload: "" };

function myReducer(state = initState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "DEL_LAST":
      state.todos.pop();
      return {
        ...state,
        todos: state.todos
      };
    default:
      break;
  }
}

const store = redux.createStore(myReducer);

store.subscribe(() => {
  console.log("state updated", store.getState());
});

store.dispatch({ type: "ADD_TODO", payload: "больше спать" });
store.dispatch({ type: "ADD_TODO", payload: "меньше программировать" });
store.dispatch(delTodo);
store.dispatch(delTodo);
