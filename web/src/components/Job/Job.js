import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/JobsCell'

const DELETE_JOB_MUTATION = gql`
  mutation DeleteJobMutation($id: Int!) {
    deleteJob(id: $id) {
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

const Job = ({ job }) => {
  const [deleteJob] = useMutation(DELETE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job deleted')
      navigate(routes.jobs())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete job ' + id + '?')) {
      deleteJob({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Job {job.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{job.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(job.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(job.updatedAt)}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{job.slug}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{job.name}</td>
            </tr>
            <tr>
              <th>Company id</th>
              <td>{job.companyId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJob({ id: job.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(job.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Job
