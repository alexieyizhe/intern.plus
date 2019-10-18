import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { RouteName } from "src/utils/constants";
import { PageContainer } from "src/components";

const NotFoundPage = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldRedirect(true), 2500);
    return () => clearTimeout(timer);
  });

  if (shouldRedirect) return <Redirect to={RouteName.LANDING} />;

  return (
    <PageContainer>
      Error: This page doesnt exist! You'll be taken to the home page soon
    </PageContainer>
  );
};

export default NotFoundPage;
