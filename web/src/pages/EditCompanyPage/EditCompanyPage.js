import CompaniesLayout from 'src/layouts/CompaniesLayout'
import EditCompanyCell from 'src/components/EditCompanyCell'

const EditCompanyPage = ({ id }) => {
  return (
    <CompaniesLayout>
      <EditCompanyCell id={id} />
    </CompaniesLayout>
  )
}

export default EditCompanyPage
