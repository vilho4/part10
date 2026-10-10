import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onRepositoryPress }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress?.(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  const navigate = useNavigate()

  const onRepositoryPress = (id) => {
    navigate(`/repository/${id}`)
  }

  return (
    <RepositoryListContainer repositories={repositories} onRepositoryPress={onRepositoryPress} />
  )
}

export default RepositoryList
