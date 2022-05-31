import styles from '../styles/Home.module.css'
import { gql } from '@apollo/client';
import client from '../apollo-client';

const Todos = (props) => {
  return (
    <ul>
      {props.todos.map((todo) => (
        <div key={todo.id} className={styles.card}>
          <h3>
            <a href={`todos/${todo.id}`} aria-hidden="true" id="todo-id">
            {todo.title}
            </a>
          </h3>
          <p>
            {todo.completed.toString()}
          </p>
        </div>
      ))}
    </ul>
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
      todos: data.todos.data,
    },
  };
}

export default Todos;
