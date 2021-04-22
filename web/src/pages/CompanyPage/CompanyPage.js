import CompaniesLayout from 'src/layouts/CompaniesLayout'
import CompanyCell from 'src/components/CompanyCell'

const CompanyPage = ({ id }) => {
  return (
    <CompaniesLayout>
      <CompanyCell id={id} />
    </CompaniesLayout>
  )
}

export default CompanyPage
