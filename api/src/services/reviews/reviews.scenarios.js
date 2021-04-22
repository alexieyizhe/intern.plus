export const standard = defineScenario({
  review: {
    one: {
      updatedAt: '2021-04-22T20:27:27Z',
      tags: 'String',
      authorEmail: 'String',
      salary: 959613,
      salaryCurrency: 'String',
      overallRating: 1455772,
      company: {
        create: {
          updatedAt: '2021-04-22T20:27:27Z',
          slug: 'String2782366',
          name: 'String',
        },
      },

      job: {
        create: {
          updatedAt: '2021-04-22T20:27:27Z',
          slug: 'String',
          name: 'String',
          company: {
            create: {
              updatedAt: '2021-04-22T20:27:27Z',
              slug: 'String9750596',
              name: 'String',
            },
          },
        },
      },
    },

    two: {
      updatedAt: '2021-04-22T20:27:27Z',
      tags: 'String',
      authorEmail: 'String',
      salary: 619665,
      salaryCurrency: 'String',
      overallRating: 345602,
      company: {
        create: {
          updatedAt: '2021-04-22T20:27:27Z',
          slug: 'String7752249',
          name: 'String',
        },
      },

      job: {
        create: {
          updatedAt: '2021-04-22T20:27:27Z',
          slug: 'String',
          name: 'String',
          company: {
            create: {
              updatedAt: '2021-04-22T20:27:27Z',
              slug: 'String4348348',
              name: 'String',
            },
          },
        },
      },
    },
  },
})
