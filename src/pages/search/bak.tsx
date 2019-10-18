// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import styled from "styled-components";
// import { useQuery } from "@apollo/react-hooks";
// import { Helmet } from "react-helmet";

// import { GetCompaniesSearch } from "src/types/generated/GetCompaniesSearch";
// import { GetJobsSearch } from "src/types/generated/GetJobsSearch";

// import {
//   GET_ALL_SEARCH,
//   GET_COMPANIES_SEARCH,
//   GET_JOBS_SEARCH,
//   GET_REVIEWS_SEARCH,
// } from "./graphql/queries";
// import { buildSearchResultCardsList } from "./graphql/utils";

// import { useScrollTopOnMount } from "src/utils/hooks/useScrollTopOnMount";
// import { useSearchParams } from "src/utils/hooks/useSearchParams";
// import { SearchType, RESULTS_PER_PAGE } from "src/utils/constants";
// import pageCopy from "./copy";

// import {
//   ResultsDisplay,
//   SearchField,
//   Text,
//   PageContainer,
// } from "src/components";
// import { IGenericCardItem } from "src/types";

// /*******************************************************************
//  *                  **Utility functions/constants**                *
//  *******************************************************************/
// /**
//  * Creates markup for the title in the tab bar.
//  */
// const getTitleMarkup = (query?: string) =>
//   query ? `Search | ${query}` : `Tugboat | Search`;

// /**
//  * Creates markup for the heading when no search is performed yet.
//  */
// const getDefaultHeading = (type?: SearchType) =>
//   type ? (
//     <>
//       <span className="grey">
//         {`${pageCopy.heading.typeInitialHeading}`}&nbsp;
//       </span>

//       <span>{type}</span>
//     </>
//   ) : (
//     <span>{pageCopy.heading.defaultInitialHeading}</span>
//   );

// /**
//  * Creates markup for the heading based on all search parameters.
//  */
// const useHeadingMarkup = () => {
//   const { searchQuery, searchType } = useSearchParams();

//   if (!searchQuery) return getDefaultHeading(searchType);

//   let prefix = "";
//   let start: string = pageCopy.heading.searchedHeading;

//   // query exists
//   switch (searchType) {
//     case SearchType.COMPANIES:
//       prefix = "Company ";
//       break;

//     case SearchType.JOBS:
//       prefix = "Job ";
//       break;

//     case SearchType.REVIEWS:
//       prefix = "Reviews ";
//       break;
//   }

//   if (prefix) start = start.toLowerCase();

//   return (
//     <>
//       <span className="grey">{`${prefix}${start} '`}</span>
//       <span>{searchQuery}</span>
//       <span className="grey">'</span>
//     </>
//   );
// };

// /**
//  * Gets the correct graphQL query based on the type of search
//  * @param type type of search being performed
//  */
// const getQuery = (type?: SearchType) => {
//   switch (type) {
//     case "companies":
//       return GET_COMPANIES_SEARCH;

//     case "jobs":
//       return GET_JOBS_SEARCH;

//     case "reviews":
//       return GET_REVIEWS_SEARCH;

//     default:
//       return GET_ALL_SEARCH;
//   }
// };

// /*******************************************************************
//  *                             **Styles**                           *
//  *******************************************************************/
// export const Heading = styled(Text)`
//   display: inline-block;
//   margin-bottom: 10px;

//   & .grey {
//     color: ${({ theme }) => theme.color.greyDark};
//   }
// `;

// /*******************************************************************
//  *                           **Component**                         *
//  *******************************************************************/
// const GenericSearchPage: React.FC = () => {
//   useScrollTopOnMount();

//   const {
//     searchQuery,
//     searchType,

//     setSearchQuery,
//     // setSearchType, TODO: add ability to toggle type filter
//   } = useSearchParams();

//   const isInitialSearch = useMemo(
//     // tracks if user has not yet searched for the first time
//     () => searchQuery === undefined,
//     [searchQuery]
//   );

//   /**
//    * **GET COMPANIES**
//    */
//   const [isEndOfCompanyResults, setIsEndOfCompanyResults] = useState(false);
//   const {
//     loading: companiesLoading,
//     error: companiesError,
//     data: companiesData,
//     fetchMore: fetchMoreCompanies,
//   } = useQuery<GetCompaniesSearch>(GET_COMPANIES_SEARCH, {
//     variables: {
//       query: searchQuery,
//       offset: 0,
//       limit: RESULTS_PER_PAGE,
//     },
//     skip: isInitialSearch, // do not make an API call if search query is empty (on initial load)
//   });
//   const loadMoreCompanies = useCallback(
//     () =>
//       fetchMoreCompanies({
//         variables: {
//           offset: companiesData ? companiesData.companiesList.items.length : 0,
//         },
//         updateQuery: (prevData, { fetchMoreResult: newData }) => {
//           console.log(prevData, newData);
//           if (!newData) {
//             return prevData;
//           }

//           if (newData && newData && newData.companiesList.items.length === 0) {
//             setIsEndOfCompanyResults(true);
//           }
//           return {
//             companiesList: {
//               __typename: prevData.companiesList.__typename,
//               items: [
//                 ...prevData.companiesList.items,
//                 ...newData.companiesList.items,
//               ],
//             },
//           };
//         },
//       }),
//     [companiesData, fetchMoreCompanies]
//   );

//   /**
//    * **JOBS**
//    */
//   const [isEndOfJobResults, setIsEndOfJobResults] = useState(false);
//   const {
//     loading: jobsLoading,
//     error: jobsError,
//     data: jobsData,
//     fetchMore: fetchMoreJobs,
//   } = useQuery<GetJobsSearch>(GET_JOBS_SEARCH, {
//     variables: {
//       query: searchQuery,
//       offset: 0,
//       limit: RESULTS_PER_PAGE,
//     },
//     skip: isInitialSearch, // do not make an API call if search query is empty (on initial load)
//   });

//   const loadMoreJobs = useCallback(
//     () =>
//       fetchMoreJobs({
//         variables: {
//           offset: jobsData ? jobsData.jobsList.items.length : 0,
//         },
//         updateQuery: (prevData, { fetchMoreResult: newData }) => {
//           console.log(
//             prevData,
//             newData,
//             jobsData ? jobsData.jobsList.items.length : 0
//           );
//           if (!newData) {
//             return prevData;
//           }

//           if (newData && newData.jobsList.items.length === 0) {
//             setIsEndOfJobResults(true);
//           }
//           return {
//             jobsList: {
//               __typename: prevData.jobsList.__typename,
//               items: [...prevData.jobsList.items, ...newData.jobsList.items],
//             },
//           };
//         },
//       }),
//     [fetchMoreJobs, jobsData]
//   );

//   /**
//    * **COLLECT**
//    */
//   const loading = useMemo(() => companiesLoading || jobsLoading, [
//     companiesLoading,
//     jobsLoading,
//   ]);
//   const error = useMemo(() => companiesError || jobsError, [
//     companiesError,
//     jobsError,
//   ]);
//   const isEndOfResults = useMemo(() => {
//     const noMoreCompanies =
//       companiesData &&
//       companiesData.companiesList.items.length < RESULTS_PER_PAGE;
//     const noMoreJobs =
//       jobsData && jobsData.jobsList.items.length < RESULTS_PER_PAGE;

//     return (
//       (noMoreCompanies && noMoreJobs) ||
//       (isEndOfCompanyResults && isEndOfJobResults)
//     );
//   }, [companiesData, isEndOfCompanyResults, isEndOfJobResults, jobsData]);
//   console.log(isEndOfResults);
//   const searchResults = useMemo(
//     () => buildSearchResultCardsList(companiesData, jobsData),
//     [companiesData, jobsData]
//   );

//   const loadMoreResults = useCallback(() => {
//     loadMoreCompanies();
//     loadMoreJobs();
//   }, [loadMoreCompanies, loadMoreJobs]);

//   /**
//    * Get heading markup/text based on query params.
//    */
//   const headingMarkup = useHeadingMarkup();

//   return (
//     <>
//       <Helmet>
//         <title>{getTitleMarkup(searchQuery)}</title>
//       </Helmet>
//       <PageContainer>
//         <Heading variant="heading1">{headingMarkup}</Heading>

//         <SearchField
//           onTriggerSearch={(searchVal: string) => setSearchQuery(searchVal)}
//         />

//         <ResultsDisplay
//           searched={!isInitialSearch}
//           loading={loading}
//           error={error !== undefined}
//           noMoreResults={isEndOfResults}
//           searchResults={searchResults}
//           onResultsEndReached={loadMoreResults}
//         />
//       </PageContainer>
//     </>
//   );
// };

// export default GenericSearchPage;
export default 1;
