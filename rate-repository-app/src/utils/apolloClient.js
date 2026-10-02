import { Platform } from 'react-native'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const uri = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000'

const httpLink = new HttpLink({
  uri,
})

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
