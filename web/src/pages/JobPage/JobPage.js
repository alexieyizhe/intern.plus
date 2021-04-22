import JobsLayout from 'src/layouts/JobsLayout'
import JobCell from 'src/components/JobCell'

const JobPage = ({ id }) => {
  return (
    <JobsLayout>
      <JobCell id={id} />
    </JobsLayout>
  )
}

export default JobPage
