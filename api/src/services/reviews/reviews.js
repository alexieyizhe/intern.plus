import { db } from 'src/lib/db'

export const reviews = () => {
  return db.review.findMany()
}

export const review = ({ id }) => {
  return db.review.findUnique({
    where: { id },
  })
}

export const createReview = ({ input }) => {
  return db.review.create({
    data: input,
  })
}

export const updateReview = ({ id, input }) => {
  return db.review.update({
    data: input,
    where: { id },
  })
}

export const deleteReview = ({ id }) => {
  return db.review.delete({
    where: { id },
  })
}

export const Review = {
  company: (_obj, { root }) =>
    db.review.findUnique({ where: { id: root.id } }).company(),
  job: (_obj, { root }) =>
    db.review.findUnique({ where: { id: root.id } }).job(),
}
