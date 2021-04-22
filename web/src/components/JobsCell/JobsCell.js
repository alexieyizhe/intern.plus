import { Link, routes } from '@redwoodjs/router'

import Jobs from 'src/components/Jobs'

export const QUERY = gql`
  query JOBS {
    jobs {
      id
      createdAt
      updatedAt
      slug
      name
      companyId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No jobs yet. '}
      <Link to={routes.newJob()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ jobs }) => {
  return <Jobs jobs={jobs} />
}
