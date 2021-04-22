import { jobs, job, createJob, updateJob, deleteJob } from './jobs'

describe('jobs', () => {
  scenario('returns all jobs', async (scenario) => {
    const result = await jobs()

    expect(result.length).toEqual(Object.keys(scenario.job).length)
  })

  scenario('returns a single job', async (scenario) => {
    const result = await job({ id: scenario.job.one.id })

    expect(result).toEqual(scenario.job.one)
  })

  scenario('creates a job', async (scenario) => {
    const result = await createJob({
      input: {
        updatedAt: '2021-04-22T20:26:13Z',
        slug: 'String',
        name: 'String',
        companyId: 'scenario.job.two.companyId',
      },
    })

    expect(result.updatedAt).toEqual('2021-04-22T20:26:13Z')
    expect(result.slug).toEqual('String')
    expect(result.name).toEqual('String')
    expect(result.companyId).toEqual('scenario.job.two.companyId')
  })

  scenario('updates a job', async (scenario) => {
    const original = await job({ id: scenario.job.one.id })
    const result = await updateJob({
      id: original.id,
      input: { updatedAt: '2021-04-23T20:26:13Z' },
    })

    expect(result.updatedAt).toEqual('2021-04-23T20:26:13Z')
  })

  scenario('deletes a job', async (scenario) => {
    const original = await deleteJob({ id: scenario.job.one.id })
    const result = await job({ id: original.id })

    expect(result).toEqual(null)
  })
})
