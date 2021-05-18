import { IResolvers } from "apollo-server-micro";

import { db } from "../db";

const resolvers: IResolvers = {
  Query: {
    companies: (root, args, context, info) =>
      db
        .collection("companies")
        .limit(2)
        .get()
        .then((qSnap) =>
          qSnap.docs.map((doc) => {
            console.log(doc.id);
            return doc.data();
          })
        ),

    // company: (root, args, context, info) => data.companies[0],
  },
};

export default resolvers;
