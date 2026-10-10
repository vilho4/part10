import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables = {}) => {
  const { data } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const repositories = data ? data.repositories : undefined

  return { repositories }
}

export default useRepositories
