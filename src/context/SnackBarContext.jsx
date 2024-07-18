import { createContext, useState, useContext } from "react";
import Snackbars from "../components/snackBar";

const BarContext = createContext({});

export default function BarComponent({ children }) {
  const [open, setOpen] = useState({ bar: false, message: "" });
  function handelsnackBar(messageProp) {
    setOpen({ ...open, bar: true, message: messageProp });
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <BarContext.Provider value={{ handelsnackBar }}>
      <Snackbars open={open.bar} message={open.message} />
      {children}
    </BarContext.Provider>
  );
}

export const useBar = () => {
  return useContext(BarContext);
};
