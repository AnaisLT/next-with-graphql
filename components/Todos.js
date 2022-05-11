import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';

const TodosQuery = gql`
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
        <a href="#loading" aria-hidden="true" class="aal_anchor" id="loading"></a>
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
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.card}>
          <h3>
            <a href="#todo-title" aria-hidden="true" id="todo-title"></a>
            {todo.title}
          </h3>
          <p>
            {todo.completed.toString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Todos;
