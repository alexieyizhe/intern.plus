import Company from 'src/components/Company'

export const QUERY = gql`
  query FIND_COMPANY_BY_ID($id: Int!) {
    company: company(id: $id) {
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

export const Empty = () => <div>Company not found</div>

export const Success = ({ company }) => {
  return <Company company={company} />
}
