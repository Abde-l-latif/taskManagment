/*mEDIAQuery*/
import "./todoContainer.css";
/*========mEDIAQuery========*/

/*Material UI*/
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
/*==========Material UI=========*/

/* hooks */
import { useReContext, useReContextTwo } from "../context/TaskList";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useBar } from "../context/SnackBarContext";
/*========== hooks======= */

import MyTodo from "./MyTodo";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function setStorage(a) {
  localStorage.setItem("todo", JSON.stringify(a));
}

export default function TodoContainer() {
  const [title, setTitle] = useState("");
  const [UiRendering, SetUiRendering] = useState("All");
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [idOpen, setIdOpen] = useState("");
  const [Editpopup, setEditpopup] = useState(false);
  const [editedTask, setEditedTask] = useState("");
  const barFunction = useBar();
  const resultRducer = useReContext();
  const dispatch = useReContextTwo();
  /*localStorage*/

  useEffect(() => {
    dispatch({
      type: "getStorage",
    });
  }, []);

  /*==========localStorage==========*/

  function handelClick() {
    dispatch({
      type: "add",
      payload: {
        titles: title,
      },
    });
    setTitle("");
    barFunction.handelsnackBar("the task has been added seccussfully");
  }

  const complete = useMemo(() => {
    return resultRducer.filter((x) => {
      return x.completed;
    });
  }, [resultRducer]);

  const Uncomplete = useMemo(() => {
    return resultRducer.filter((x) => {
      return x.completed == false;
    });
  }, [resultRducer]);

  let switchUi = resultRducer;

  if (UiRendering == "Completed") {
    switchUi = complete;
  } else if (UiRendering == "Uncompleted") {
    switchUi = Uncomplete;
  } else {
    switchUi = resultRducer;
  }
  /*handel buttons */
  function ResetAllTask() {
    dispatch({
      type: "reset",
    });
    barFunction.handelsnackBar("Reset Tasks");
  }
  function handelDeleteConfirm() {
    dispatch({
      type: "delete",
      payloat: {
        id: id,
      },
    });
    handelClose();
    barFunction.handelsnackBar("the task has been deleted");
  }

  function handelEditConfirm() {
    dispatch({
      type: "edit",
      payload: {
        editId: idOpen,
        editedTasks: editedTask,
      },
    });
    setEditpopup(false);
    barFunction.handelsnackBar("the task has been edited");
  }

  function handelDelete(id) {
    setPopup(true);
    setId(id);
  }

  function handelClose() {
    setPopup(false);
  }

  function handelEditClose() {
    setEditpopup(false);
  }

  function handelEditOpen(idd) {
    setEditpopup(true);
    setIdOpen(idd);
  }

  const ListTodo = switchUi.map((x) => {
    return (
      <MyTodo
        key={x.id}
        todos={x}
        DeleteButton={handelDelete}
        editButton={handelEditOpen}
      />
    );
  });

  return (
    <>
      {/* delete dialog*/}
      <Dialog
        open={popup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you wanna delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you delete it you can't get the task back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClose}>Disagree</Button>
          <Button autoFocus onClick={handelDeleteConfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/*===== delete dialog =====*/}
      {/* edit dialog*/}
      <Dialog
        open={Editpopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title2">{"Edit tasks"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description2">
            write your new task in the field.
          </DialogContentText>
          <TextField
            sx={{ width: "400px" }}
            autoFocus
            required
            margin="dense"
            id="name"
            label="Edit the task"
            fullWidth
            variant="standard"
            value={editedTask}
            onChange={(x) => {
              setEditedTask(x.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelEditClose}>Disagree</Button>
          <Button autoFocus onClick={handelEditConfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {/*===== edit dialog =====*/}
      <Card
        sx={{
          minWidth: 280,
          width: 1000,
          minHeight: "100%",
          overflowY: "scroll",
          fontFamily: "fontOne",
        }}
      >
        <CardContent>
          <Typography
            className="title"
            variant="h4"
            color="primary"
            gutterBottom
          >
            Task Management
          </Typography>
          <Divider />
          {/* NAV BAR */}
          <div
            className="inputContainer"
            style={{ display: "flex", gap: "10px" }}
          >
            <Box
              sx={{
                height: "90vh",
                borderRight: "1px solid #E0E0E0",
                position: "relative",
                width: 170,
              }}
              className="contNav"
            >
              <ToggleButtonGroup
                value={UiRendering}
                onClick={(x) => {
                  SetUiRendering(x.target.value);
                }}
                style={{
                  flexDirection: "column",
                  gap: "10px",
                  margin: "5px",
                }}
                className="nav"
                color="primary"
              >
                <ToggleButton
                  value="All"
                  aria-label="left aligned"
                  style={{ border: "1px solid #EBEBEB" }}
                >
                  All
                </ToggleButton>
                <ToggleButton
                  value="Completed"
                  aria-label="centered"
                  style={{ border: "1px solid #EBEBEB" }}
                >
                  Completed
                </ToggleButton>
                <ToggleButton
                  value="Uncompleted"
                  aria-label="right aligned"
                  style={{ border: "1px solid #EBEBEB" }}
                >
                  Uncompleted
                </ToggleButton>
                <ToggleButton
                  aria-label="right aligned"
                  style={{
                    border: "1px solid orangered",
                    borderRadius: "5px",
                    color: "orangered",
                  }}
                  onClick={ResetAllTask}
                >
                  Reset All
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {/* =======NAV BAR========= */}

            {/*input field*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "50px",
                marginTop: "10px",
                gap: "10px",
              }}
            >
              <Box>
                <Grid container spacing={2} className="gridContainer">
                  <Grid xs={9}>
                    <TextField
                      id="outlined-basic"
                      label=" Add a task"
                      variant="outlined"
                      sx={{ height: "100%", width: "100%" }}
                      value={title}
                      onChange={(x) => {
                        setTitle(x.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Button
                      variant="contained"
                      sx={{
                        height: "100%",
                        width: "100%",
                        fontWeight: "700",
                        color: "white",
                      }}
                      color="secondary"
                      onClick={handelClick}
                      className="btn"
                      disabled={title == ""}
                    >
                      Add Task
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {ListTodo}
            </Box>
          </div>
          {/*======input field=====*/}
        </CardContent>
      </Card>
    </>
  );
}
