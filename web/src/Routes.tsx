// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/admin/reviews/new" page={NewReviewPage} name="newReview" />
      <Route path="/admin/reviews/{id:Int}/edit" page={EditReviewPage} name="editReview" />
      <Route path="/admin/reviews/{id:Int}" page={ReviewPage} name="review" />
      <Route path="/admin/reviews" page={ReviewsPage} name="reviews" />
      <Route path="/admin/companies/new" page={NewCompanyPage} name="newCompany" />
      <Route path="/admin/companies/{id:Int}/edit" page={EditCompanyPage} name="editCompany" />
      <Route path="/admin/companies/{id:Int}" page={CompanyPage} name="company" />
      <Route path="/admin/companies" page={CompaniesPage} name="companies" />
      <Route path="/admin/jobs/new" page={NewJobPage} name="newJob" />
      <Route path="/admin/jobs/{id:Int}/edit" page={EditJobPage} name="editJob" />
      <Route path="/admin/jobs/{id:Int}" page={JobPage} name="job" />
      <Route path="/admin/jobs" page={JobsPage} name="jobs" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
