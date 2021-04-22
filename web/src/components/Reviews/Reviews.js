import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/ReviewsCell'

const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReviewMutation($id: Int!) {
    deleteReview(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const ReviewsList = ({ reviews }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Review deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete review ' + id + '?')) {
      deleteReview({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Body</th>
            <th>Tags</th>
            <th>Author email</th>
            <th>Salary</th>
            <th>Salary currency</th>
            <th>Overall rating</th>
            <th>Learning mentorship rating</th>
            <th>Meaningful work rating</th>
            <th>Work life balance rating</th>
            <th>Is verified</th>
            <th>Is legacy</th>
            <th>Company id</th>
            <th>Job id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{truncate(review.id)}</td>
              <td>{timeTag(review.createdAt)}</td>
              <td>{timeTag(review.updatedAt)}</td>
              <td>{truncate(review.body)}</td>
              <td>{truncate(review.tags)}</td>
              <td>{truncate(review.authorEmail)}</td>
              <td>{truncate(review.salary)}</td>
              <td>{truncate(review.salaryCurrency)}</td>
              <td>{truncate(review.overallRating)}</td>
              <td>{truncate(review.learningMentorshipRating)}</td>
              <td>{truncate(review.meaningfulWorkRating)}</td>
              <td>{truncate(review.workLifeBalanceRating)}</td>
              <td>{checkboxInputTag(review.isVerified)}</td>
              <td>{checkboxInputTag(review.isLegacy)}</td>
              <td>{truncate(review.companyId)}</td>
              <td>{truncate(review.jobId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.review({ id: review.id })}
                    title={'Show review ' + review.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editReview({ id: review.id })}
                    title={'Edit review ' + review.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete review ' + review.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(review.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReviewsList
