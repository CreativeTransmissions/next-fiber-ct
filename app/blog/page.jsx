import { Suspense } from 'react'
import { client } from '@/services/graphql/client'
import { GET_BLOG_POSTS } from '@/services/graphql/queries'
import BlogPostsList from './components/BlogPostsList'
import { DOMAIN } from '@/config'

export const revalidate = 300 // 5 minutes

// Server-side fetch function
async function fetchPosts() {
  try {
    const { data } = await client.query({
      query: GET_BLOG_POSTS,
      context: {
        fetchOptions: {
          next: { revalidate: 300 }
        }
      }
    });

    return transformPosts(data.posts.nodes);
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return [];
  }
}

const transformPosts = (posts) => {
  return posts.map(post => {
    const extraData = post.extraData || {};
    return {
      id: post.postHash,
      title: extraData.Title || '',
      slug: extraData.BlogTitleSlug?.toLowerCase().replace(/\s+/g, '-') || '',
      excerpt: post.body.split('View this post at https://desocialworld')[0],
      date: new Date(post.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      author: "Andrew",
      readTime: "5 min read",
      imageUrl: post.imageUrls?.[0] || null
    };
  });
};

export async function generateMetadata() {
  const posts = await fetchPosts();
  const latestPost = posts[0];

  return {
    title: 'Blog | Thoughts on Technology and Development',
    description: 'Insights and articles about technology, development, and more.',
    openGraph: {
      title: 'Blog | Thoughts on Technology and Development',
      description: 'Insights and articles about technology, development, and more.',
      type: 'website',
      url: `${DOMAIN}/blog`,
      images: latestPost?.imageUrl ? [
        {
          url: latestPost.imageUrl,
          width: 1200,
          height: 630,
          alt: 'Latest blog post preview'
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Thoughts on Technology and Development',
      description: 'Insights and articles about technology, development, and more.',
      images: latestPost?.imageUrl ? [latestPost.imageUrl] : [],
    },
    alternates: {
      canonical: `${DOMAIN}/blog`
    }
  }
}

export function generateViewport() {
  return {
    themeColor: 'white'
  }
}

export async function generateScripts() {
  const posts = await fetchPosts();
  
  return [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog | Thoughts on Technology and Development',
      description: 'Insights and articles about technology, development, and more.',
      url: `${DOMAIN}/blog`,
      author: {
        '@type': 'Person',
        name: 'Andrew'
      },
      blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: new Date(post.date).toISOString(),
        image: post.imageUrl ? [post.imageUrl] : [],
        url: `${DOMAIN}/blog/${post.slug}`,
        author: {
          '@type': 'Person',
          name: 'Andrew'
        }
      }))
    })
  }];
}

export default async function Page() {
  const initialPosts = await fetchPosts();
  
  return (
    <div className='container mx-auto px-4 max-w-6xl'>
      <div className='mx-auto max-w-2xl w-full py-12'>
        <h1 className='text-4xl mb-12'>Blog</h1>
        <p className='mb-8 text-2xl leading-normal'>Thoughts on Technology and Development</p>

        <Suspense fallback={<div>Loading posts...</div>}>
          <BlogPostsList initialPosts={initialPosts} />
        </Suspense>
      </div>
    </div>
  )
}
