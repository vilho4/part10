import { FlatList, View, StyleSheet, Text } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryView = () => {
  const { id } = useParams()

  const { repository, loading, error } = useRepository(id)

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Failed to load repository</Text>
  }

  if (!repository) {
    return <Text>Repository not found</Text>
  }

  const reviews = repository.reviews ? repository.reviews.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <RepositoryItem item={repository} showGitHubButton />
          <ItemSeparator />
        </View>
      }
    />
  )
}

export default RepositoryView
