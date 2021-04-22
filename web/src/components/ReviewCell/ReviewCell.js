import Review from 'src/components/Review'

export const QUERY = gql`
  query FIND_REVIEW_BY_ID($id: Int!) {
    review: review(id: $id) {
      id
      createdAt
      updatedAt
      body
      tags
      authorEmail
      salary
      salaryCurrency
      overallRating
      learningMentorshipRating
      meaningfulWorkRating
      workLifeBalanceRating
      isVerified
      isLegacy
      companyId
      jobId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Review not found</div>

export const Success = ({ review }) => {
  return <Review review={review} />
}
