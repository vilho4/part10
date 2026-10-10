import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 5 },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage

    if (!canFetchMore) {
      return
    }

    // console.log('Fetching more reviews')

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    })
  }

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore: handleFetchMore,
  }
}

export default useRepository
