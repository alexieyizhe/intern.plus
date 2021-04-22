import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import CompanyForm from 'src/components/CompanyForm'

import { QUERY } from 'src/components/CompaniesCell'

const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompanyMutation($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
    }
  }
`

const NewCompany = () => {
  const [createCompany, { loading, error }] = useMutation(
    CREATE_COMPANY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Company created')
        navigate(routes.companies())
      },
    }
  )

  const onSave = (input) => {
    createCompany({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Company</h2>
      </header>
      <div className="rw-segment-main">
        <CompanyForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCompany
