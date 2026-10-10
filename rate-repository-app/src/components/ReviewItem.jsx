import { View, StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'
import formatDate from '../utils/formatDate'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rating: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  reviewText: {
    flexWrap: 'wrap',
  },
})

const ReviewItem = ({ review, showRepositoryName = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.username}>
          {showRepositoryName ? review.repository.fullName : review.user.username}
        </Text>
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
