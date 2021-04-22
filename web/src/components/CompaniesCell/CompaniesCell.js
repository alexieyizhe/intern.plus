import { Link, routes } from '@redwoodjs/router'

import Companies from 'src/components/Companies'

export const QUERY = gql`
  query COMPANIES {
    companies {
      id
      createdAt
      updatedAt
      slug
      name
      description
      websiteUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No companies yet. '}
      <Link to={routes.newCompany()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ companies }) => {
  return <Companies companies={companies} />
}
