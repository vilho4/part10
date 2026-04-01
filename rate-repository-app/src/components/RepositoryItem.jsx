import { View, Text, StyleSheet, Image } from 'react-native'
import theme from './theme'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },

  topRow: {
    flexDirection: 'row',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },

  textContainer: {
    marginLeft: 15,
    flex: 1,
  },

  fullName: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },

  description: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },

  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 5,
    alignSelf: 'flex-start',
    borderRadius: 4,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },

  statItem: {
    alignItems: 'center',
  },
})

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k' // merkkijonoksi
  }
  return count
}

const RepositoryItem = ({ item }) => {
  // console.log('repositoryItem', item)
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />

        <View style={styles.textContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text>{formatCount(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text>{formatCount(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
