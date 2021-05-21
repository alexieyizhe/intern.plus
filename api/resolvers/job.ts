import firebase from "firebase-admin";

import { db } from "../db";

const transformJobData = (doc) => {
  console.log(doc.id, doc.data() === undefined);

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

export const jobsQueryResolver = (parent, args, context, info) => {
  const { search, limit, after } = args;

  const query = after
    ? db
        .collection("jobs")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(after)
        .limit(limit)
    : db
        .collection("jobs")
        .orderBy(firebase.firestore.FieldPath.documentId())
        .limit(limit);

  return query.get().then((qSnap) => ({
    count: qSnap.size,
    lastCursor: qSnap.docs[qSnap.docs.length - 1].id,
    items: qSnap.docs.map((doc) => transformJobData(doc)),
  }));
};

export const jobsResolver = (parent, args, context, info) => ({
  count: parent.jobCount,
  lastCursor: parent.jobRefs[parent.jobRefs.length - 1].id,
  items: parent.jobRefs.map((ref) =>
    ref.get().then((dSnap) => transformJobData(dSnap))
  ),
});

export const jobResolver = (parent, args, context, info) => {
  const { id } = args;
  if (id) {
    return db
      .collection("jobs")
      .doc(id)
      .get()
      .then((dSnap) => transformJobData(dSnap));
  } else if (parent?.jobRef) {
    return parent.jobRef.get().then((dSnap) => transformJobData(dSnap));
  } else {
    throw new Error("No identifier or reference provided for job field");
  }
};
