import { db } from 'src/lib/db'

export const jobs = () => {
  return db.job.findMany()
}

export const job = ({ id }) => {
  return db.job.findUnique({
    where: { id },
  })
}

export const createJob = ({ input }) => {
  return db.job.create({
    data: input,
  })
}

export const updateJob = ({ id, input }) => {
  return db.job.update({
    data: input,
    where: { id },
  })
}

export const deleteJob = ({ id }) => {
  return db.job.delete({
    where: { id },
  })
}

export const Job = {
  company: (_obj, { root }) =>
    db.job.findUnique({ where: { id: root.id } }).company(),
  reviews: (_obj, { root }) =>
    db.job.findUnique({ where: { id: root.id } }).reviews(),
}
