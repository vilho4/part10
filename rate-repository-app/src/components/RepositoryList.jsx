import { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: 'white',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onRepositoryPress, listHeader }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={listHeader}
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
  const [selectedOrder, setSelectedOrder] = useState('latest')

  const orderBy = selectedOrder === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE'
  const orderDirection = selectedOrder === 'lowest' ? 'ASC' : 'DESC'

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
  })

  const navigate = useNavigate()

  const onRepositoryPress = (id) => {
    navigate(`/repository/${id}`)
  }

  const listHeader = (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(value) => setSelectedOrder(value)}
      style={styles.picker}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  )

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={onRepositoryPress}
      listHeader={listHeader}
    />
  )
}

export default RepositoryList
