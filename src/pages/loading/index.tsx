import React from "react";
import styled from "styled-components";

import Spinner from "src/components/Spinner";

export interface LoadingPageProps
  extends React.ComponentPropsWithoutRef<"div"> {
  height?: number | string;
}

const Container = styled.div<LoadingPageProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ height = "100vh" }) =>
    typeof height === "number" ? `${height}px` : height};
`;

const LoadingPage: React.FC<LoadingPageProps> = (props) => (
  <Container {...props}>
    <Spinner />
  </Container>
);

export default LoadingPage;
