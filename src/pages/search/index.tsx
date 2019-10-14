import React, { useState } from "react";
import styled from "styled-components";

import pageCopy from "./copy";

import {
  PageContainer as BasePageContainer,
  Search,
  Text,
} from "src/components";
import ResultsDisplay from "./components/ResultsDisplay";

const PageContainer = styled(BasePageContainer)`
  & > .search-input {
    width: 100%;
  }
`;

const SearchPage = () => {
  const [heading, setHeading] = useState(pageCopy.defaultHeading);

  return (
    <PageContainer>
      <Text variant="heading1" as="div">
        {heading}
      </Text>

      <Search className="search-input" onSearchStart={() => {}} />

      <ResultsDisplay />
    </PageContainer>
  );
};

export default SearchPage;
