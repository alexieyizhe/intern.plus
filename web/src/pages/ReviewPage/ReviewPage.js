import ReviewsLayout from 'src/layouts/ReviewsLayout'
import ReviewCell from 'src/components/ReviewCell'

const ReviewPage = ({ id }) => {
  return (
    <ReviewsLayout>
      <ReviewCell id={id} />
    </ReviewsLayout>
  )
}

export default ReviewPage
