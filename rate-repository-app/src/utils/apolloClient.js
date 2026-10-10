import { Platform } from 'react-native'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'

const uri =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_APOLLO_URI_ANDROID
    : process.env.EXPO_PUBLIC_APOLLO_URI_WEB

const httpLink = new HttpLink({
  uri,
})

const createApolloClient = (authStorage) => {
  const authLink = new SetContextLink(async ({ headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      }
    } catch (e) {
      console.log(e)

      return {
        headers,
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Repository: {
          fields: {
            reviews: relayStylePagination(),
          },
        },
      },
    }),
  })
}

export default createApolloClient
