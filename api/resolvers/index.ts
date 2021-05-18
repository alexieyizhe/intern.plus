import * as data from "../seed/data.json";

const resolvers = {
  Query: {
    companies: (root, args, context, info) => {
      console.log(root, args, context, info);
      return data.companies.slice(0, 5);
    },

    company: (root, args, context, info) => {
      console.log(root, args, context, info);
      return null;
    },
  },
};

export default resolvers;
