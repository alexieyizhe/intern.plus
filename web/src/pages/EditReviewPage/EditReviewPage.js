import ReviewsLayout from 'src/layouts/ReviewsLayout'
import EditReviewCell from 'src/components/EditReviewCell'

const EditReviewPage = ({ id }) => {
  return (
    <ReviewsLayout>
      <EditReviewCell id={id} />
    </ReviewsLayout>
  )
}

export default EditReviewPage
