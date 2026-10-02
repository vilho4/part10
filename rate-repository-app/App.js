import { ApolloProvider } from '@apollo/client/react'
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import createApolloClient from './src/utils/apolloClient'

const apolloClient = createApolloClient()

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}
