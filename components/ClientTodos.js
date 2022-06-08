import { useQuery, gql } from "@apollo/client";
import { List, Paper } from "@mui/material";
import TodoItem from "../components/TodoItem";

export const TodosQuery = gql`
  query TodosQuery {
      todos(
        options:
        {
          paginate: {
            limit: 5,
            page: 1
          }
        }
        ) {
        data {
          id
          title
          completed
        }
      }
    }
  `;

const Todos = () => {
  const { data, loading, error } = useQuery(TodosQuery);

  if (loading) {
    return (
      <h2>
        <a href="#loading" id="loading"></a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const todos = data.todos.data;

  return (
    <>
      {todos.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {todos.map((todo, idx) => (
              <TodoItem
                {...todo}
                key={todo.id}
                title={
                  <a href={`todos/${todo.id}`} aria-hidden="true" id="todo-id">
                    {todo.title}
                  </a>
                }
                completed={todo.completed}
                divider={idx !== todos.length - 1}
                checked={todo.completed}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  )
};

export default Todos;
