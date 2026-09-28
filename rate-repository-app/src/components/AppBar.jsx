import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from './theme'

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
  console.log('appbar rendered')

  console.log('appbar rendered twice')
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row' }}>
        <Pressable>
          <Text style={styles.text}>Repositories</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
export default AppBar
