import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import AboveFold from '../components/home/above-fold'
import Brokerage from '../components/home/brokerage'
import Features from '../components/home/features'
import Platforms from '../components/home/platforms'
import Security from '../components/home/security'
import Testimonials from '../components/home/testimonials'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
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
          postType
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

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  const categories = postNodes
    .reduce( (acc,{postType}) => acc.some(_=>_===postType) ? acc : [...acc, postType],[])

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <AboveFold/>
      <Platforms/>
      <Features/>
      <Testimonials/>
      <Container>
      {categories.map( category => {
        const posts = postNodes.filter( post => post.postType === category)
        const title = category ? category.replace(/-/g," ") : 'Blog';
        const href = category ? `/${category}` : '/blog';
        if(posts.length > 0)
          return(
            <BlogPostPreviewList
              title={title}
              nodes={posts}
              browseMoreHref={href}
            />
          )
      })
      }
      </Container>
      <Security/>
    </Layout>
  )
}

export default IndexPage
