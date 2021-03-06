import React from 'react'
import {graphql} from 'gatsby'
import {mapEdgesToNodes} from '../lib/helpers'
import MoneyGeekPostPreviewGrid from '../components/moneygeek-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  query BlogMoneyGeekPageQuery {
    posts: allSanityPostMoneyGeek(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const BlogMoneyGeekPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      <SEO title='The MoneyGeek Blog | Written by Jin Choi' />
      <Container>
        <h1 className={responsiveTitle1}>Money Geek</h1>
        {postNodes && postNodes.length > 0 && <MoneyGeekPostPreviewGrid nodes={postNodes} />}
      </Container>
    </Layout>
  )
}

export default BlogMoneyGeekPage
