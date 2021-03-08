import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./firebase";

export function App(props) {
  let history = useHistory();
  
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [new_task, setNewTask] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        history.push("/");
      }
    });

    return unsubscribe;
  }, [history]);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = db.collection('users').doc(user.uid).collection('tasks').onSnapshot((snapshot) => {
        const updated_tasks = [];
      snapshot.forEach((doc) => {
        const data = doc.data()
        updated_tasks.push({text: data.text, checked: data.checked, id: doc.id})
      })
      setTasks(updated_tasks)

      })
      
    }
    
    return unsubscribe;
  }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAddTask = () => {
    db.collection('users').doc(user.uid).collection('tasks').add({text: new_task, checked: false}).then(() => {
      setNewTask("")
    })

  }
  const handleDeleteTask = (task_id) => {
    db.collection('users').doc(user.uid).collection('tasks').doc(task_id).delete()
  }
  const handleCheckTask = (checked, task_id) => {
    db.collection('users').doc(user.uid).collection('tasks').doc(task_id).update({checked: checked})
  }

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}>
            To Do List
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{display: "flex", justifyContent: "center", marginTop: 30}}>
        <Paper style={{padding: 30, width: 700}}>
        <Typography variant="h6">To Do List</Typography>
        <div style={{display: "flex", marginTop: 30}}>
          <TextField fullWidth={true} placeholder="Add a new task here" style={{marginRight: 30}} value={new_task} onChange={(e) => {setNewTask(e.target.value)}}/>
          <Button variant="contained" color="primary" onClick={handleAddTask}>Add</Button>
        </div>
        <List>
          {tasks.map(value => (
              <ListItem key={value.id}>
                <ListItemIcon>
                  <Checkbox
                    checked={value.checked}
                    onChange={(e, checked) => {handleCheckTask(checked, value.id)}}
                    //checked={checked.indexOf(value) !== -1}
                  />
              </ListItemIcon>
              <ListItemText primary={value.text} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => {handleDeleteTask(value.id)}}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          </List>
        </Paper>
      </div>
    </div>
  );
}
