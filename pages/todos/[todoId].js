import React from "react"
import { gql } from "@apollo/client";
import client from '../../apollo-client';

const SingleTodo = (props) => {
  return (
    <div key={props.todo.id}>
      <h1>{props.todo.title}</h1>
      <p>{props.todo.completed.toString()}</p>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query SingleTodoQuery($id: ID!) {
        todo(id: $id) {
          id
          title
          completed
        }
      }
    `,
    variables: {
      id: params.todoId,
    }
  });

  return {
    props: {
      todo: data.todo,
    },
  };
}

export const getStaticPaths = async () => {
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

  const paths = data.todos.data.map(todo => {
    return {
      params: {
        todoId: todo.id
      }
    }
  });

  console.log("PATHS", paths)

  return {
    paths,
    fallback: false
  }
}

export default SingleTodo;
