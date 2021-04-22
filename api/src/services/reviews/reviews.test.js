import {
  reviews,
  review,
  createReview,
  updateReview,
  deleteReview,
} from './reviews'

describe('reviews', () => {
  scenario('returns all reviews', async (scenario) => {
    const result = await reviews()

    expect(result.length).toEqual(Object.keys(scenario.review).length)
  })

  scenario('returns a single review', async (scenario) => {
    const result = await review({ id: scenario.review.one.id })

    expect(result).toEqual(scenario.review.one)
  })

  scenario('creates a review', async (scenario) => {
    const result = await createReview({
      input: {
        updatedAt: '2021-04-22T20:27:27Z',
        tags: 'String',
        authorEmail: 'String',
        salary: 6893781,
        salaryCurrency: 'String',
        overallRating: 1625547,
        companyId: 'scenario.review.two.companyId',
        jobId: 'scenario.review.two.jobId',
      },
    })

    expect(result.updatedAt).toEqual('2021-04-22T20:27:27Z')
    expect(result.tags).toEqual('String')
    expect(result.authorEmail).toEqual('String')
    expect(result.salary).toEqual(6893781)
    expect(result.salaryCurrency).toEqual('String')
    expect(result.overallRating).toEqual(1625547)
    expect(result.isVerified).toEqual()
    expect(result.isLegacy).toEqual()
    expect(result.companyId).toEqual('scenario.review.two.companyId')
    expect(result.jobId).toEqual('scenario.review.two.jobId')
  })

  scenario('updates a review', async (scenario) => {
    const original = await review({ id: scenario.review.one.id })
    const result = await updateReview({
      id: original.id,
      input: { updatedAt: '2021-04-23T20:27:27Z' },
    })

    expect(result.updatedAt).toEqual('2021-04-23T20:27:27Z')
  })

  scenario('deletes a review', async (scenario) => {
    const original = await deleteReview({ id: scenario.review.one.id })
    const result = await review({ id: original.id })

    expect(result).toEqual(null)
  })
})
