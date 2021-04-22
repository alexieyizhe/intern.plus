import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ReviewForm from 'src/components/ReviewForm'

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
const UPDATE_REVIEW_MUTATION = gql`
  mutation UpdateReviewMutation($id: Int!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
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

export const Success = ({ review }) => {
  const [updateReview, { loading, error }] = useMutation(
    UPDATE_REVIEW_MUTATION,
    {
      onCompleted: () => {
        toast.success('Review updated')
        navigate(routes.reviews())
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      companyId: parseInt(input.companyId),
      jobId: parseInt(input.jobId),
    })
    updateReview({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Review {review.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReviewForm
          review={review}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
