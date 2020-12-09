import { format } from 'date-fns'

export default {
    name: 'howToInvest',
    type: 'document',
    title: 'How to Invest $X For the Long-Term',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            description: 'Titles should be catchy, descriptive, and not too long'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'Some frontends will require a slug to be set to be able to show the post',
            options: {
              source: 'title',
              maxLength: 96,
              slugify: input =>
                input
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .slice(0, 200)
            }
        },
        {
            title: 'Values',
            name: 'values',
            type: 'array',
            description: 'Enter Invested amounts for which the pages should be created. Using @{{investedAmount}} in the body or title will replace it with entered value, applies same for expectedReturn as well',
            of: [{
                type: 'value',
                name: 'value',
                title: 'Invested'
              }]
          },
        {
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published at',
            description: 'This can be used to schedule post for publishing'
        },
        {
            name: 'authors',
            title: 'Authors',
            type: 'array',
            of: [
                {
                    type: 'authorReference'
                }
            ]
        },
        {
            name: 'body',
            title: 'Body',
            type: 'markdown',
            options: {
              minRows: 20
            }
          }
    ],
}
