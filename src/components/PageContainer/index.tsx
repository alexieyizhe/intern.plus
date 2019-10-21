import styled from "styled-components";

import {
  HEADER_HEIGHT,
  HEADER_PADDING,
  HEADER_PADDING_MOBILE,
  MOBILE_MENU_MEDIA_QUERY,
} from "src/components/PageHeader";
import { FOOTER_HEIGHT } from "src/components/PageFooter";

const PageContainer = styled.main`
  position: relative;
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  max-width: 1000px;
  width: 100%;

  margin: auto;
  margin-top: ${HEADER_HEIGHT}px;
  padding: 10px ${HEADER_PADDING}px;

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    padding: 10px ${HEADER_PADDING_MOBILE}px;
  `}
`;

export default PageContainer;
