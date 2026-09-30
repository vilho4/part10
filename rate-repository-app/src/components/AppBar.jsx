import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { Link } from 'react-router-native'

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row' }}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>

        <Link to="/sign-in">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  )
}
export default AppBar
