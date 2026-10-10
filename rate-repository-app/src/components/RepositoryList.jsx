import { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    margin: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onRepositoryPress, listHeader }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []
  const [selectedOrder, setSelectedOrder] = useState('latest')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

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
  const [searchKeyword, setSearchKeyword] = useState('')

  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  const orderBy = selectedOrder === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE'
  const orderDirection = selectedOrder === 'lowest' ? 'ASC' : 'DESC'

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  })

  const navigate = useNavigate()

  const onRepositoryPress = (id) => {
    navigate(`/repository/${id}`)
  }

  const listHeader = (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        autoCapitalize="none"
      />

      <Picker
        selectedValue={selectedOrder}
        onValueChange={(value) => setSelectedOrder(value)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
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
