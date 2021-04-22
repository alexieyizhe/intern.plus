import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/CompaniesCell'

const DELETE_COMPANY_MUTATION = gql`
  mutation DeleteCompanyMutation($id: Int!) {
    deleteCompany(id: $id) {
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

const Company = ({ company }) => {
  const [deleteCompany] = useMutation(DELETE_COMPANY_MUTATION, {
    onCompleted: () => {
      toast.success('Company deleted')
      navigate(routes.companies())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete company ' + id + '?')) {
      deleteCompany({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Company {company.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{company.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(company.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(company.updatedAt)}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{company.slug}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{company.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{company.description}</td>
            </tr>
            <tr>
              <th>Website url</th>
              <td>{company.websiteUrl}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCompany({ id: company.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(company.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Company
