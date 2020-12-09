import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ModelPortfolio from "../components/model-portfolio";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query howToInvestTemplateQuery($id: String!) {
    post: sanityHowToInvestTransformed(id: { eq: $id }) {
      id
      publishedAt
      title
      slug {
        current
      }
      body
    }
  }
`;

const howToInvestTemplate = (props) => {
    const { data, errors } = props;
    const post = data && data.post;
    return (
        <Layout>
            {errors && <SEO title="GraphQL Error" />}
            {post && <SEO title={post.title || "Untitled"} />}

            {errors && (
                <Container>
                    <GraphQLErrorList errors={errors} />
                </Container>
            )}
            {post && <ModelPortfolio {...post} />}
        </Layout>
    );
};


export default howToInvestTemplate;
