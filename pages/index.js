import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";

const TodoList = (props) => {
  return (
    <div>
      {props.todos.map((todo) => (
        <div key={todo.id} className={styles.card}>
          <h3>
            <a href="#todo-title" aria-hidden="true" id="todo-title">
            </a>
            {todo.title}
          </h3>
          <p>
            {todo.completed.toString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
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
      todos: data.todos.data.slice(0, 5),
    },
  };
}

export default TodoList;
