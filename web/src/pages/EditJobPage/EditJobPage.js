import JobsLayout from 'src/layouts/JobsLayout'
import EditJobCell from 'src/components/EditJobCell'

const EditJobPage = ({ id }) => {
  return (
    <JobsLayout>
      <EditJobCell id={id} />
    </JobsLayout>
  )
}

export default EditJobPage
