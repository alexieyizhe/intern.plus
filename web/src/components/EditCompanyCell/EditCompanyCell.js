import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import CompanyForm from 'src/components/CompanyForm'

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
const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompanyMutation($id: Int!, $input: UpdateCompanyInput!) {
    updateCompany(id: $id, input: $input) {
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

export const Success = ({ company }) => {
  const [updateCompany, { loading, error }] = useMutation(
    UPDATE_COMPANY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Company updated')
        navigate(routes.companies())
      },
    }
  )

  const onSave = (input, id) => {
    updateCompany({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Company {company.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CompanyForm
          company={company}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
