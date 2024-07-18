import { v4 as uuidv4 } from "uuid";
import { setStorage } from "../components/todoContainer";

export default function ReduceTodo(currentReducer, Action) {
  switch (Action.type) {
    case "add": {
      const status = {
        details: Action.payload.titles,
        completed: false,
        id: uuidv4(),
      };
      const state = [...currentReducer, status];

      setStorage(state);

      return state;
    }
    case "delete": {
      const Delete = currentReducer.filter((x) => {
        return x.id !== Action.payloat.id;
      });
      setStorage(Delete);
      return Delete;
    }
    case "edit": {
      const Edit = currentReducer.map((x) => {
        if (x.id == Action.payload.editId) {
          return { ...x, details: Action.payload.editedTasks };
        } else {
          return x;
        }
      });
      setStorage(Edit);
      return Edit;
    }
    case "getStorage": {
      const getStorage = JSON.parse(localStorage.getItem("todo")) ?? [];
      return getStorage;
    }
    case "check": {
      const Check = currentReducer.map((x) => {
        if (x.id == Action.payload.id) {
          return {
            ...x,
            completed: !x.completed,
          };
        }
        return x;
      });
      setStorage(Check);
      return Check;
    }
    case "reset": {
      const reset = [];
      localStorage.clear();
      return reset;
    }

    default:
      throw Error("undefined type " + Action.type);
  }
}
