import { gql } from "@apollo/client";
import client from "../apollo-client";
import TodoItem from "../components/TodoItem"
import { List, Paper } from "@mui/material";

const Todos = ({ todos }) => {
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
                  <a href={`todos/${todo.id}`}aria-hidden="true" id="todo-id">
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
}

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
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
    `,
  });

  return {
    props: {
      todos: data.todos.data,
    },
  };
}

export default Todos;
