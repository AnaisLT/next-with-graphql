import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Paper
} from '@mui/material'

const TodoAppBar = ({ children }) => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#2cb492" }}
  >
    <AppBar position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64, backgroundColor: "#2cb492" }}>
        <Typography color="inherit">TODO APP</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </Paper>
);

export default TodoAppBar;
