/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import LoadingPage, { LoadingPageProps } from "src/pages/loading";

/**
 * A HOC to wrap any lazy-loaded components with a loader
 * @param C the component being lazy loaded
 */
export const withLoadingPage =
  <T extends unknown>(C: any, loaderProps?: LoadingPageProps): React.FC<T> =>
  (props: T) =>
    (
      <Suspense fallback={<LoadingPage {...loaderProps} />}>
        <C {...props} />
      </Suspense>
    );
