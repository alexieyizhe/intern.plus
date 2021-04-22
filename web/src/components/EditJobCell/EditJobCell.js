import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import JobForm from 'src/components/JobForm'

export const QUERY = gql`
  query FIND_JOB_BY_ID($id: Int!) {
    job: job(id: $id) {
      id
      createdAt
      updatedAt
      slug
      name
      companyId
    }
  }
`
const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJobMutation($id: Int!, $input: UpdateJobInput!) {
    updateJob(id: $id, input: $input) {
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

export const Success = ({ job }) => {
  const [updateJob, { loading, error }] = useMutation(UPDATE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job updated')
      navigate(routes.jobs())
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      companyId: parseInt(input.companyId),
    })
    updateJob({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Job {job.id}</h2>
      </header>
      <div className="rw-segment-main">
        <JobForm job={job} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
