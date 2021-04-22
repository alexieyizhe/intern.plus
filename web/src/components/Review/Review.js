import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/ReviewsCell'

const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReviewMutation($id: Int!) {
    deleteReview(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Review = ({ review }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Review deleted')
      navigate(routes.reviews())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete review ' + id + '?')) {
      deleteReview({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Review {review.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{review.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(review.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(review.updatedAt)}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{review.body}</td>
            </tr>
            <tr>
              <th>Tags</th>
              <td>{review.tags}</td>
            </tr>
            <tr>
              <th>Author email</th>
              <td>{review.authorEmail}</td>
            </tr>
            <tr>
              <th>Salary</th>
              <td>{review.salary}</td>
            </tr>
            <tr>
              <th>Salary currency</th>
              <td>{review.salaryCurrency}</td>
            </tr>
            <tr>
              <th>Overall rating</th>
              <td>{review.overallRating}</td>
            </tr>
            <tr>
              <th>Learning mentorship rating</th>
              <td>{review.learningMentorshipRating}</td>
            </tr>
            <tr>
              <th>Meaningful work rating</th>
              <td>{review.meaningfulWorkRating}</td>
            </tr>
            <tr>
              <th>Work life balance rating</th>
              <td>{review.workLifeBalanceRating}</td>
            </tr>
            <tr>
              <th>Is verified</th>
              <td>{checkboxInputTag(review.isVerified)}</td>
            </tr>
            <tr>
              <th>Is legacy</th>
              <td>{checkboxInputTag(review.isLegacy)}</td>
            </tr>
            <tr>
              <th>Company id</th>
              <td>{review.companyId}</td>
            </tr>
            <tr>
              <th>Job id</th>
              <td>{review.jobId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReview({ id: review.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(review.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Review
