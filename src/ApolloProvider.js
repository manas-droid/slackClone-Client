import App from './App';

const {ApolloClient , InMemoryCache, ApolloProvider , createHttpLink} = require('@apollo/client');


const httpLink = createHttpLink({
    uri : 'http://localhost:5000/graphql'
    })
    

const client = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache()
  });


  export default (

    <ApolloProvider client={client}>
           <App/> 
    </ApolloProvider>
  );

