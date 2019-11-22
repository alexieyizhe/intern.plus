/**
 * This file was generated using 8base CLI.
 * 
 * To learn more about writing custom task functions, visit
 * the 8base documentation at:
 * 
 * https://docs.8base.com/8base-console/custom-functions/tasks
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    task:
 *      ...
 * 
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local task -p src/tasks/task/mocks/request.json
 */

type TaskResult = {
  data: {
    result: string,
  },
};

export default async (event: any, ctx: any) : Promise<TaskResult> => {
  return {
    data: {
      result: `Task recieved: ${event.data.foo}`
    },
  };
};
