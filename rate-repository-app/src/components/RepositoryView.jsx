import { View, Text } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'

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

  return (
    <View>
      <RepositoryItem item={repository} showGitHubButton />
    </View>
  )
}

export default RepositoryView
