import { db } from "../db";

const transformCompanyData = (doc) => {
  const { scoreTotals, createdAt, updatedAt, reviewCount, ...rest } =
    doc.data();
  const scoreAverages = Object.entries(scoreTotals).reduce(
    (acc, [scoreName, scoreValue]) => {
      acc[scoreName] = scoreValue / reviewCount;
      return acc;
    },
    {}
  );

  return {
    id: doc.id,
    scoreAverages,
    reviewCount,
    createdAt: createdAt.toDate(),
    updatedAt: updatedAt.toDate(),
    ...rest,
  };
};

export const companiesQueryResolver = (parent, args, context, info) => {
  const { search, limit, after } = args;

  return db
    .collection("companies")
    .limit(limit)
    .get()
    .then((qSnap) => ({
      count: qSnap.size,
      items: qSnap.docs.map((doc) => transformCompanyData(doc)),
    }));
};

export const companyResolver = (parent, args, context, info) => {
  const { id } = args;
  if (id) {
    return db
      .collection("companies")
      .doc(id)
      .get()
      .then((dSnap) => transformCompanyData(dSnap));
  } else if (parent?.companyRef) {
    return parent.companyRef.get().then((dSnap) => transformCompanyData(dSnap));
  } else {
    throw new Error("No identifier or reference provided for company field");
  }
};
