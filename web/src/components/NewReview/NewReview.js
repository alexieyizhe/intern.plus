import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ReviewForm from 'src/components/ReviewForm'

import { QUERY } from 'src/components/ReviewsCell'

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
    }
  }
`

const NewReview = () => {
  const [createReview, { loading, error }] = useMutation(
    CREATE_REVIEW_MUTATION,
    {
      onCompleted: () => {
        toast.success('Review created')
        navigate(routes.reviews())
      },
    }
  )

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      companyId: parseInt(input.companyId),
      jobId: parseInt(input.jobId),
    })
    createReview({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Review</h2>
      </header>
      <div className="rw-segment-main">
        <ReviewForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewReview
