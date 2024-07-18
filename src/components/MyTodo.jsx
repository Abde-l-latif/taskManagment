/*mEDIAQuery*/
import "./todoContainer.css";
/*========mEDIAQuery========*/

/* material Ui*/
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";

/*=============== material Ui ==============*/

/* hooks */
import { useReContextTwo } from "../context/TaskList";
import { useBar } from "../context/SnackBarContext";

/*========== hooks======= */

export default function MyTodo({ todos, DeleteButton, editButton }) {
  const dispatch = useReContextTwo();

  const snackBar = useBar();
  /*handel buttons of todo*/

  function handelCheck() {
    dispatch({
      type: "check",
      payload: {
        id: todos.id,
      },
    });
    snackBar.handelsnackBar("the proccess has been completed successfully");
  }

  /*=========handel buttons of todo===========*/

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Card
          sx={{
            width: "100%",
            minWidth: "300px",
            maxHeight: "500px",
          }}
        >
          <CardContent sx={{ marginTop: "10px" }}>
            <Grid
              container
              spacing={2}
              sx={{
                alignItems: "center",
              }}
              className="cardContent"
            >
              <Grid xs={8}>
                <Typography
                  className="text"
                  variant="h7"
                  style={{
                    textDecoration: todos.completed ? "line-through" : "none",
                  }}
                >
                  {todos.details}
                </Typography>
              </Grid>
              <Grid xs={4} sx={{ gap: "20px", display: "flex" }}>
                <IconButton
                  onClick={() => {
                    handelCheck();
                  }}
                  style={{
                    border: "2px solid green",
                    color: todos.completed ? "white" : "green",
                    backgroundColor: todos.completed ? "green" : "white",
                  }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  style={{
                    border: "2px solid #2196f3",
                    color: "#2196f3",
                  }}
                  onClick={() => {
                    editButton(todos.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    DeleteButton(todos.id);
                  }}
                  style={{
                    border: "2px solid red",
                    color: "red",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
