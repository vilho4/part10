import { FlatList, View, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client/react'

import { ME } from '../graphql/queries'
import ReviewItem from './ReviewItem'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

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
      renderItem={({ item }) => <ReviewItem review={item} showRepositoryName />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<Text>No reviews yet</Text>}
    />
  )
}

export default MyReviews
