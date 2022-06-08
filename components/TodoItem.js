import React from 'react'
import {
  ListItem,
  Checkbox,
  ListItemText,
} from '@mui/material'

const TodoItem = ({ title, divider, checked }) => (
  <ListItem divider={divider}>
    <Checkbox checked={checked} disableRipple />
    <ListItemText primary={title} />
  </ListItem>
);

export default TodoItem;
