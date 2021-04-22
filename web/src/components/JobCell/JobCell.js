import Job from 'src/components/Job'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Job not found</div>

export const Success = ({ job }) => {
  return <Job job={job} />
}
