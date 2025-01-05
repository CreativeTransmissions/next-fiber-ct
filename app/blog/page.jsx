import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { client } from '@/services/graphql/client'
import { GET_BLOG_POSTS } from '@/services/graphql/queries'
import BlogPostsList from './components/BlogPostsList'

export const revalidate = 300 // 5 minutes

export async function generateMetadata() {
  return {
    title: 'Blog | Thoughts on Technology and Development',
    description: 'Insights and articles about technology, development, and more.',
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

export default async function Page() {
  const initialPosts = await fetchPosts();
  
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async (useCache = true) => {
      try {
        const { data } = await client.query({
          query: GET_BLOG_POSTS,
          fetchPolicy: useCache ? 'cache-first' : 'network-only',
        });

        const transformedPosts = transformPosts(data.posts.nodes);

        if (!useCache) {
          // Only update if we have new posts
          setPosts(prevPosts => {
            const newPostHashes = new Set(transformedPosts.map(p => p.id));
            const oldPostHashes = new Set(prevPosts.map(p => p.id));

            // Check if we have any new posts
            const hasNewPosts = transformedPosts.some(post => !oldPostHashes.has(post.id));

            if (hasNewPosts) {
              // Merge old and new posts, remove duplicates, sort by date
              return [...prevPosts, ...transformedPosts]
                .filter((post, index, self) =>
                  index === self.findIndex((p) => p.id === post.id)
                )
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            return prevPosts;
          });
        } else {
          // Initial load from cache
          setPosts(transformedPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    // Then check for new posts
    fetchPosts(false);

  }, [])

  return (
    <div className='container mx-auto px-4 max-w-6xl'>
      <div className='mx-auto max-w-2xl w-full py-12'>
        <h1 className='text-4xl mb-12'>Blog</h1>
        <p className='mb-8 text-2xl leading-normal'>Thoughts on Technology and Development</p>

        <Suspense fallback={<div>Loading posts...</div>}>
          <BlogPostsList initialPosts={posts} />
        </Suspense>
      </div>
    </div>
  )
}
