import styled from "styled-components";

import {
  HEADER_HEIGHT,
  MOBILE_MENU_MEDIA_QUERY,
} from "src/components/PageHeader";
import { FOOTER_HEIGHT } from "src/components/PageFooter";

/*******************************************************************
 *                            **Styles**                           *
 *******************************************************************/
const PageContainer = styled.main`
  position: relative;
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  max-width: ${({ theme }) => theme.maxWidth.page}px;
  width: 100%;

  margin: auto;
  margin-top: ${HEADER_HEIGHT}px;
  padding: ${({ theme }) =>
    `${theme.padding.pageVertical}px ${theme.padding.pageHorizontal}px`};

  ${({ theme }) => theme.mediaQueries[MOBILE_MENU_MEDIA_QUERY]`
    padding: 0 ${theme.padding.pageHorizontalMobile}px;
  `}
`;

export default PageContainer;
