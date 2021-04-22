import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/JobsCell'

const DELETE_JOB_MUTATION = gql`
  mutation DeleteJobMutation($id: Int!) {
    deleteJob(id: $id) {
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

const JobsList = ({ jobs }) => {
  const [deleteJob] = useMutation(DELETE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete job ' + id + '?')) {
      deleteJob({ variables: { id } })
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
            <th>Slug</th>
            <th>Name</th>
            <th>Company id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{truncate(job.id)}</td>
              <td>{timeTag(job.createdAt)}</td>
              <td>{timeTag(job.updatedAt)}</td>
              <td>{truncate(job.slug)}</td>
              <td>{truncate(job.name)}</td>
              <td>{truncate(job.companyId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.job({ id: job.id })}
                    title={'Show job ' + job.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJob({ id: job.id })}
                    title={'Edit job ' + job.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete job ' + job.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(job.id)}
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

export default JobsList
