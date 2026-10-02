import { Platform } from 'react-native'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const uri =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_APOLLO_URI_ANDROID
    : process.env.EXPO_PUBLIC_APOLLO_URI_WEB

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
