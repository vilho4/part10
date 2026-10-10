import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { Link } from 'react-router-native'
import { useQuery } from '@apollo/client/react'
import { ME } from '../graphql/queries'
import { useNavigate } from 'react-router-native'
import useSignOut from '../hooks/useSignOut'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    padding: 10,
    flexDirection: 'row',
  },
  ScrollView: {
    backgroundColor: theme.colors.appBar,
  },
  text: {
    color: theme.colors.white,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
})

const AppBar = () => {
  const { data, loading } = useQuery(ME)
  const isSignedIn = Boolean(data?.me)

  const signOut = useSignOut()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log('Sign out successful!')
      navigate('/')
    } catch (e) {
      console.error('Sign out failed:', e)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row' }}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {!loading &&
          (isSignedIn ? (
            <Pressable onPress={handleSignOut}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
          ) : (
            <Link to="/sign-in">
              <Text style={styles.text}>Sign In</Text>
            </Link>
          ))}
      </ScrollView>
    </View>
  )
}

export default AppBar
