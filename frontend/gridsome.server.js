// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {

  const marked = require('marked');

  api.loadSource(({ addSchemaResolvers, addSchemaTypes, schema }) => {
    addSchemaTypes([
      schema.createObjectType({
        name: 'ChecklistSection',
        interfaces: ['Node'],
        fields: {
          id: 'ID!',
          order: 'Int',
          title: 'String',
          intro: 'String'
        }
      })
    ]),
    addSchemaResolvers({
      DdChecklistSection: {
        intro: {
          type: 'String',
          args: {
            markdown: 'Boolean'
          },
          resolve(obj, args) {
            if (args.markdown) {
              return marked(obj.intro || '')
            }
            return obj.intro
          }
        }
      }
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
