import App from './App';

const {ApolloClient, ApolloLink ,InMemoryCache, ApolloProvider , createHttpLink} = require('@apollo/client');
const { setContext } =  require('@apollo/client/link/context');

const httpLink = createHttpLink({
    uri : 'http://localhost:5000/graphql'
    });



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    headers: {
      ...headers,
      "x-token": token ? token : "",
      "x-refresh-token": token ? refreshToken : ""
    }
  }
});

const forwardWare =new ApolloLink((operation, forward) => {

  return forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    return response;
  }
});
});


const client = new ApolloClient({
    link:forwardWare.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache()
  });


  export default (

    <ApolloProvider client={client}>
           <App/> 
    </ApolloProvider>
  );

