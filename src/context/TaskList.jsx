import { createContext, useReducer, useContext } from "react";
import ReduceTodo from "../reducer/ReduceTodo";

const TaskList = createContext([]);
const TaskListTwo = createContext([]);

export const TodoReducerProvider = ({ children }) => {
  const [resultRducer, dispatch] = useReducer(ReduceTodo, []);
  return (
    <TaskList.Provider value={resultRducer}>
      <TaskListTwo.Provider value={dispatch}>{children}</TaskListTwo.Provider>
    </TaskList.Provider>
  );
};

export const useReContext = () => {
  return useContext(TaskList);
};
export const useReContextTwo = () => {
  return useContext(TaskListTwo);
};
