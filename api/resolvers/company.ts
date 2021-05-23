import firebase from "firebase-admin";

import { db } from "../db";

const transformCompanyData = (doc: any) => {
  const { scoreTotals, logoRef, createdAt, updatedAt, reviewCount, ...rest } =
    doc.data();
  const scoreAverages = Object.entries(scoreTotals).reduce(
    (acc: any, [scoreName, scoreValue]: any) => {
      acc[scoreName] = scoreValue / reviewCount;
      return acc;
    },
    {}
  );

  return {
    id: doc.id,
    scoreAverages,
    logo: logoRef,
    reviewCount,
    createdAt: createdAt.toDate(),
    updatedAt: updatedAt.toDate(),
    ...rest,
  };
};

export const companiesLandingQueryResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const query = db
    .collection("companies")
    .orderBy("reviewCount", "desc")
    .limit(5);

  return query.get().then((qSnap) => ({
    count: qSnap.size,
    lastCursor: qSnap.docs[qSnap.docs.length - 1].id,
    hasMore: false,
    items: Promise.all(qSnap.docs.map((doc) => transformCompanyData(doc))),
  }));
};

export const companiesQueryResolver = (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { limit, after } = args;
  const query = after
    ? db
        .collection("companies")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(after)
        .limit(limit)
    : db
        .collection("companies")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(limit);

  return query.get().then((qSnap) => ({
    count: qSnap.size,
    lastCursor: qSnap.docs[qSnap.docs.length - 1].id,
    hasMore: qSnap.size === limit,
    items: qSnap.docs.map((doc) => transformCompanyData(doc)),
  }));
};

export const companyResolver = (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { id } = args;
  if (id) {
    return db
      .collection("companies")
      .doc(id)
      .get()
      .then((dSnap) => transformCompanyData(dSnap));
  } else if (parent?.companyRef) {
    return parent.companyRef
      .get()
      .then((dSnap: any) => transformCompanyData(dSnap));
  } else {
    throw new Error("No identifier or reference provided for company field");
  }
};
