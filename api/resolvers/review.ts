import firebase from "firebase-admin";

import { db } from "../db";

const transformReviewData = (doc) => {
  const { createdAt, updatedAt, ...rest } = doc.data();

  return {
    id: doc.id,
    createdAt: createdAt.toDate(),
    updatedAt: updatedAt.toDate(),
    ...rest,
  };
};

export const reviewsLandingQueryResolver = (parent, args, context, info) => {
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

export const reviewsQueryResolver = (parent, args, context, info) => {
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

export const reviewsResolver = (parent, args, context, info) => ({
  count: parent.reviewCount,
  lastCursor: parent.reviewRefs[parent.reviewRefs.length - 1].id,
  items: parent.reviewRefs.map((ref) =>
    ref.get().then((dSnap) => transformReviewData(dSnap))
  ),
});

export const reviewResolver = (parent, args, context, info) => {
  const { id } = args;
  if (id) {
    return db
      .collection("reviews")
      .doc(id)
      .get()
      .then((dSnap) => transformReviewData(dSnap));
  } else if (parent?.reviewRef) {
    return parent.reviewRef.get().then((dSnap) => transformReviewData(dSnap));
  } else {
    throw new Error("No identifier or reference provided for review field");
  }
};
