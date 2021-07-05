const path = require(`path`);
exports.createPages = ({ graphql, actions }) => {

  const { createPage } = actions
  return new Promise(async resolve => {

    const result = await graphql(`
        {
          allAirtable(
            filter: { table: { eq: "Furniture" } }
            sort: { fields: rowIndex }
          ) {
            edges {
              node {
                data {
                  Slug
                }
              }
            }
          }
      }
    `)
    result.data.allAirtable.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.data.Slug}`,
        component: path.resolve(`./src/templates/product.tsx`),
        context: {
          slug: node.data.Slug,
        },
      })
    });
    resolve()
  })
}