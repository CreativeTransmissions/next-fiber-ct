import { client } from '@/services/graphql/client'
import { GET_BLOG_POSTS } from '@/services/graphql/queries'
import BlogPostContent from './BlogPostContent'
import { DOMAIN } from '../../config'

export const revalidate = 300

export async function generateMetadata({ params }) {
  try {
    const { data } = await client.query({
      query: GET_BLOG_POSTS,
      context: {
        fetchOptions: {
          next: { revalidate: 300 }
        }
      }
    });

    const post = data.posts.nodes.find(post => 
      post.extraData?.BlogTitleSlug?.toLowerCase().replace(/\s+/g, '-') === params.slug
    );

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      }
    }

    const title = post.extraData?.Title || 'Blog Post';
    const description = post.body.split('View this post at https://desocialworld')[0].slice(0, 200) + '...';
    const imageUrl = post.imageUrls?.[0];
    const publishDate = new Date(post.timestamp).toISOString();

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${DOMAIN}/blog/${params.slug}`,
        publishedTime: publishDate,
        authors: ['Andrew'],
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
      alternates: {
        canonical: `${DOMAIN}/blog/${params.slug}`
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post',
      description: 'An interesting article about technology and development.'
    }
  }
}

export function generateViewport() {
  return {
    themeColor: 'white'
  }
}

export async function generateScripts({ params }) {
  try {
    const { data } = await client.query({
      query: GET_BLOG_POSTS,
      context: {
        fetchOptions: {
          next: { revalidate: 300 }
        }
      }
    });

    const post = data.posts.nodes.find(post => 
      post.extraData?.BlogTitleSlug?.toLowerCase().replace(/\s+/g, '-') === params.slug
    );

    if (!post) return [];

    const title = post.extraData?.Title || 'Blog Post';
    const description = post.body.split('View this post at https://desocialworld')[0].slice(0, 200) + '...';
    const imageUrl = post.imageUrls?.[0];
    const publishDate = new Date(post.timestamp).toISOString();

    return [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url: `${DOMAIN}/blog/${params.slug}`,
        image: imageUrl ? [imageUrl] : [],
        datePublished: publishDate,
        author: [{
          '@type': 'Person',
          name: 'Andrew'
        }]
      })
    }];
  } catch (error) {
    console.error('Error generating JSON-LD:', error);
    return [];
  }
}

export default function BlogPost({ params }) {
  return <BlogPostContent params={params} />
}
