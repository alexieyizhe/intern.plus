import firebase from "firebase-admin";

import { db } from "../db";

const transformReviewData = (doc: any) => {
  const { createdAt, updatedAt, ...rest } = doc.data();

  return {
    id: doc.id,
    createdAt: createdAt.toDate(),
    updatedAt: updatedAt.toDate(),
    ...rest,
  };
};

export const reviewsLandingQueryResolver = (parent: any, args: any, context: any, info: any) => {
  const { limit } = args;
  const query = db
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .limit(limit);

  return query.get().then((qSnap) => ({
    count: qSnap.size,
    lastCursor: qSnap.docs[qSnap.docs.length - 1]?.id ?? null,
    hasMore: false,
    items: qSnap.docs.map((doc) => transformReviewData(doc)),
  }));
};

export const reviewsQueryResolver = (parent: any, args: any, context: any, info: any) => {
  const { search, limit, after } = args;

  const query = after
    ? db
        .collection("reviews")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(after)
        .limit(limit)
    : db
        .collection("reviews")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(limit);

  return query.get().then((qSnap) => ({
    count: qSnap.size,
    lastCursor: qSnap.docs[qSnap.docs.length - 1].id,
    items: qSnap.docs.map((doc) => transformReviewData(doc)),
  }));
};

export const reviewsResolver = (parent: any, args: any, context: any, info: any) => ({
  count: parent.reviewCount,
  lastCursor: parent.reviewRefs[parent.reviewRefs.length - 1].id,
  items: parent.reviewRefs.map((ref: any) =>
    ref.get().then((dSnap: any) => transformReviewData(dSnap))
  ),
});

export const reviewResolver = (parent: any, args: any, context: any, info: any) => {
  const { id } = args;
  if (id) {
    return db
      .collection("reviews")
      .doc(id)
      .get()
      .then((dSnap) => transformReviewData(dSnap));
  } else if (parent?.reviewRef) {
    return parent.reviewRef.get().then((dSnap: any) => transformReviewData(dSnap));
  } else {
    throw new Error("No identifier or reference provided for review field");
  }
};
