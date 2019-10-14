import styled from "styled-components";

import { HEADER_HEIGHT } from "src/components/PageHeader";
import { FOOTER_HEIGHT } from "src/components/PageFooter";

const PageContainer = styled.div`
  position: relative;
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  max-width: 1000px;
  width: 100%;

  margin: auto;
  margin-top: ${HEADER_HEIGHT}px;
  padding: 10px 100px;

  ${({ theme }) => theme.mediaQueries.tablet`
    padding: 10px 80px;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    padding: 10px 40px;
  `}
`;

export default PageContainer;
