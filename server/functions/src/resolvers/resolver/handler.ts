/**
 * This file was generated using 8base CLI.
 * 
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 * 
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    resolver:
 *      ...
 * 
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local resolver -p src/resolvers/resolver/mocks/request.json
 */

type ResolverResult = {
  data: {
    result: string,
  },
};

export default async (event: any, ctx: any) : Promise<ResolverResult> => {
  return {
    data: {
      result: `Resolver recieved: ${event.data.foo}`,
    },
  };
};