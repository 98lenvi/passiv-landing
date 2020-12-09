export default {
                type: 'object',
                name: 'value',
                title: 'Invested amount and expected returns',
                description: 'Enter Invested amounts for which the pages should be created. Using @{{investedAmount}} in the body or title will replace it with entered value, applies same for expectedReturn as well',
                fields: [
                  {
                    title: 'Invested Amount',
                    name: 'investedAmount',
                    type: 'number'
                  },
                  {
                    title: 'Expected Return',
                    name: 'expectedReturn',
                    type: 'number',
                  }
                ]
              }
