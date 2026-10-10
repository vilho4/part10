import { FlatList, View, StyleSheet, Pressable, Alert, Platform } from 'react-native'
import { useQuery } from '@apollo/client/react'
import { useNavigate } from 'react-router-native'

import { ME } from '../graphql/queries'
import ReviewItem from './ReviewItem'
import Text from './Text'
import theme from '../theme'
import useDeleteReview from '../hooks/useDeleteReview'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: theme.colors.white,
  },
  actions: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const [deleteReview] = useDeleteReview()
  const navigate = useNavigate()

  const handleDelete = (id) => {
    const confirmDelete = async () => {
      try {
        const deleted = await deleteReview(id)

        if (deleted) {
          await refetch()
        }
      } catch (error) {
        console.error('Failed to delete review:', error)
      }
    }

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this review?')) {
        confirmDelete()
      }
    } else {
      Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ])
    }
  }

  if (loading && !data) {
    return <Text>Loading reviews...</Text>
  }

  if (error) {
    return <Text>Failed to load reviews</Text>
  }

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) ?? []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <View style={styles.reviewContainer}>
          <ReviewItem review={item} showRepositoryName />

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.viewButton]}
              onPress={() => navigate(`/repository/${item.repository.id}`)}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<Text>No reviews yet</Text>}
    />
  )
}

export default MyReviews
