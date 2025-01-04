import { gql } from '@apollo/client';

export const GET_BLOG_POSTS = gql`
  query Query {
    posts(
      filter: {
        extraData: {
          containsKey: "BlogTitleSlug"
        }
        posterPublicKey: {
          equalTo: "BC1YLgvhbxCR181wxuEAzm8rR8uVfdYnuBQXtTchJSzJmZGG2mGigJL"
        }
        timestamp: { greaterThan: "2024-12-30T06:01:14.056" }
      }
      orderBy: [TIMESTAMP_DESC]
    ) {
      nodes {
        postHash
        timestamp
        imageUrls
        body
        extraData
      }
    }
  }
`;

export const GET_BLOG_POST = gql`
  query GetBlogPost($postHash: String!) {
    post(postHash: $postHash) {
      postHash
      timestamp
      imageUrls
      body
      extraData
    }
  }
`;
