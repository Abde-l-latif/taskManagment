/*css file */
import "./App.css";
/* Material Ui*/
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { deepOrange } from "@mui/material/colors";
/* My Components*/
import TodoContainer from "./components/todoContainer";
import { TodoReducerProvider } from "./context/TaskList";
import BarComponent from "./context/SnackBarContext";

/* fontFamilly*/
const theme = createTheme({
  typography: {
    fontFamily: ["fontOne"],
  },
  palette: {
    primary: {
      main: deepOrange[600],
    },
    secondary: {
      main: deepOrange[400],
    },
  },
});
/* ==========fontFamilly========*/

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoReducerProvider>
        <BarComponent>
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
              justifyContent: "center",
              fontFamily: "fontOne",
            }}
          >
            <TodoContainer />
          </Container>
        </BarComponent>
      </TodoReducerProvider>
    </ThemeProvider>
  );
}

export default App;
