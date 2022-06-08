import React from 'react'
import { gql } from '@apollo/client'
import client from '../../apollo-client'
import { Paper } from '@mui/material'

const SingleTodo = (props) => {
  return (
    <Paper
      style={{padding: "1rem", margin: "1rem" }}
      elevation={2}
      key={props.todo.id}
    >
      <h3>{props.todo.title}</h3>
    </Paper>
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

  return {
    paths,
    fallback: false
  }
}

export default SingleTodo;
