import { db } from "../db";

export const companiesQueryResolver = (parent, args, context, info) => {
  const { search, paginate } = args;

  return db
    .collection("companies")
    .limit(2)
    .get()
    .then((qSnap) => ({
      count: qSnap.size,
      items: qSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    }));
};

export const companyResolver = (parent, args, context, info) => {
  const { id } = args;
  if (id) {
    return db
      .collection("companies")
      .doc(id)
      .get()
      .then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }));
  } else if (parent?.companyRef) {
    return parent.companyRef
      .get()
      .then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }));
  } else {
    throw new Error("No identifier or reference provided for company field");
  }
};
