import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const ReviewsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.reviews()} className="rw-link">
            Reviews
          </Link>
        </h1>
        <Link to={routes.newReview()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Review
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ReviewsLayout
