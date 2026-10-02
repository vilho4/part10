import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  //   console.log('loading:', loading)
  //   console.log('error:', error)
  //   console.log('data:', data)

  const repositories = data ? data.repositories : undefined

  return { repositories }
}

export default useRepositories
