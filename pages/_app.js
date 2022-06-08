import { ApolloProvider } from '@apollo/client'
import TodoAppBar from '../components/TodoAppBar'
import client from '../apollo-client'
import '../styles/globals.css'

const TodoApp = ({ Component, pageProps }) => {
  return (
    <div className="TodoApp">
      <ApolloProvider client={client}>
        <TodoAppBar />
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}

export default TodoApp
