import { db } from "../db";

export const reviewsQueryResolver = (parent, args, context, info) => {
  const { search, paginate } = args;

  return db
    .collection("reviews")
    .limit(2)
    .get()
    .then((qSnap) => ({
      count: qSnap.size,
      items: qSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    }));
};

export const reviewsResolver = (parent, args, context, info) => {
  console.log("reviewListResolver");
  return {
    count: parent.reviewCount,
    items: parent.reviewRefs.map((ref) =>
      ref.get().then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }))
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
      .then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }));
  } else if (parent?.reviewRef) {
    return parent.reviewRef
      .get()
      .then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }));
  } else {
    throw new Error("No identifier or reference provided for review field");
  }
};
