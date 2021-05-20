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

export const reviewsQueryResolver = (parent, args, context, info) => {
  const { search, limit, after } = args;

  return db
    .collection("reviews")
    .limit(limit)
    .get()
    .then((qSnap) => ({
      count: qSnap.size,
      items: qSnap.docs.map((doc) => transformReviewData(doc)),
    }));
};

export const reviewsResolver = (parent, args, context, info) => {
  console.log("reviewListResolver");
  return {
    count: parent.reviewCount,
    items: parent.reviewRefs.map((ref) =>
      ref.get().then((dSnap) => transformReviewData(dSnap))
    ),
  };
};

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
