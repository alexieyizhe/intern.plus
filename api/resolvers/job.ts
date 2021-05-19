import { db } from "../db";

export const jobsQueryResolver = (parent, args, context, info) => {
  const { search, paginate } = args;

  return db
    .collection("jobs")
    .limit(2)
    .get()
    .then((qSnap) => ({
      count: qSnap.size,
      items: qSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    }));
};

export const jobsResolver = (parent, args, context, info) => {
  console.log("jobListResolver");

  return {
    count: parent.jobCount,
    items: parent.jobRefs.map((ref) =>
      ref.get().then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }))
    ),
  };
};

export const jobResolver = (parent, args, context, info) => {
  const { id } = args;
  if (id) {
    return db
      .collection("jobs")
      .doc(id)
      .get()
      .then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }));
  } else if (parent?.jobRef) {
    return parent.jobRef
      .get()
      .then((dSnap) => ({ id: dSnap.id, ...dSnap.data() }));
  } else {
    throw new Error("No identifier or reference provided for job field");
  }
};
